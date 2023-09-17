import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { NavController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class RecentSearchesPage implements OnInit {
  recentTrips: Array<any>;
  showSkeleton: boolean = true;
  profileForm: FormGroup;
  hideFooter: boolean = false;
  deviceId: any;
  userValue: any;
  constructor(
    private userService: UserService,
    private change: ChangeDetectorRef,
    private toastController: ToastController
  ) {
    this.profileForm = new FormGroup({
      name: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      }),

      phone: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      device_id: new FormControl('', {
        updateOn: 'change',
      }),
    });
  }

  async ngOnInit() {
    Preferences.get({ key: environment.mangoTravelStorageKey.device_id }).then(
      (val) => {
        console.log(val);
        this.deviceId = val.value;
      }
    );
    Preferences.get({ key: environment.mangoTravelStorageKey.user }).then(
      (val) => {
        console.log(val);
        if (val.value) {
          this.userValue = JSON.parse(val.value);
          this.fillValues();
        }
      }
    );

    Keyboard.addListener('keyboardWillShow', (keyboard) => {
      console.log('showKeyboard');
      this.hideFooter = true;
      this.change.detectChanges();
    });

    Keyboard.addListener('keyboardWillHide', () => {
      console.log('keyboard will hide');
      this.hideFooter = false;
      this.change.detectChanges();
    });
  }

  fillValues() {
    this.profileForm.controls['name'].setValue(this.userValue.name);
    this.profileForm.controls['email'].setValue(this.userValue.email);
    this.profileForm.controls['phone'].setValue(this.userValue.phone);
  }

  ionViewWillEnter() {
    this.showSkeleton = true;
  }

  submitUser() {
    console.log(this.profileForm.value);
    this.profileForm.controls['device_id'].setValue(this.deviceId);
    this.userService.createUser(this.profileForm.value).subscribe({
      next: (value) => {
        console.log(value);
        localStorage.setItem('user', JSON.stringify(value.data));
        if (value.message) {
          this.presentToast(value.message);
        }
      },
    });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }
}
