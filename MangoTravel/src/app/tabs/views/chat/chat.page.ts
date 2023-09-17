import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';
import { first } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  margin: number = 0;
  chatMessages: Array<any> = [];
  userMessage: any;
  disableInput: boolean = false;

  constructor(private chatService: ChatService) {
    Preferences.get({ key: environment.mangoTravelStorageKey.chat }).then(
      (val) => {
        console.log(val);
        if (val.value?.length > 0) {
          this.chatMessages = JSON.parse(val.value);
        } else {
          this.fillChatWithWelcomeMessage();
        }
      }
    );
  }

  async fillChatWithWelcomeMessage() {
    this.chatMessages = [];
    this.chatMessages.push({
      chats: [
        {
          message: 'Welcome To MangoTravel! Please ask a question.',
          senderId: -1,
        },
      ],
    });

    Preferences.set({
      key: environment.mangoTravelStorageKey.chat,
      value: JSON.stringify(this.chatMessages),
    });
  }
  ionViewWillEnter() {
    this.content.scrollToBottom(500);
  }

  ngOnInit() {}
  submitChat() {
    this.disableInput = true;
    this.chatMessages.push({
      chats: [
        {
          message: this.userMessage,
          senderId: 1,
        },
      ],
    });
    Preferences.set({
      key: environment.mangoTravelStorageKey.chat,
      value: JSON.stringify(this.chatMessages),
    });

    this.chatService
      .chatAI(this.userMessage)
      .pipe(first())
      .subscribe({
        next: (value) => {
          console.log(value);
          this.chatMessages.push({
            chats: [
              {
                message: value.message,
                senderId: -1,
              },
            ],
          });
          Preferences.set({
            key: environment.mangoTravelStorageKey.chat,
            value: JSON.stringify(this.chatMessages),
          });
          this.content.scrollToBottom(500);
        },
      });
    this.userMessage = '';
    this.disableInput = false;
  }
}
