import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { UserService } from './services/user.service';
import { first } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

import { register } from 'swiper/element/bundle';
import { environment } from 'src/environments/environment';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  deviceID: any;
  constructor(private userService: UserService) {
    this.getDeviceID();
  }
  async getDeviceID() {
    let info;
    await Device.getId().then((deviceID) => {
      if (deviceID) {
        this.deviceID = deviceID.identifier;
        Preferences.set({
          key: environment.mangoTravelStorageKey.device_id,
          value: deviceID.identifier,
        });
      }
      this.getUserValue();
    });

    console.log(info);
  }
  getUserValue() {
    this.userService
      .getUser({ device_id: this.deviceID })
      .pipe(first())
      .subscribe({
        next: (value) => {
          console.log(value);
          if (value.status) {
            Preferences.set({
              key: environment.mangoTravelStorageKey.user,
              value: JSON.stringify(value.data),
            });
            localStorage.setItem('user', JSON.stringify(value.data));
          }
        },
      });
  }
}
