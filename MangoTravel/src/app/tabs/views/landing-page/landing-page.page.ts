import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicSlides, NavController } from '@ionic/angular';
import { first } from 'rxjs';
import { MapService } from 'src/app/services/map.service';
import { SearchPageService } from 'src/app/services/search-page.service';
import { environment } from 'src/environments/environment';
import Swiper from 'swiper';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { DatePipe } from '@angular/common';
import { Browser } from '@capacitor/browser';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  SwiperModules = [IonicSlides];
  swiper: Swiper;
  recentTrips: Array<any>;
  showSkeleton: boolean = true;
  userLocation: any;
  deviceID: any;
  userLat: any;
  userLng: any;
  checkedAddres: boolean = false;
  constructor(
    public tripService: SearchPageService,
    private mapService: MapService,
    private navCtrl: NavController
  ) {
    navigator.geolocation.watchPosition((val) => {
      console.log('watch', val.coords.latitude, val.coords.longitude);
      this.userLat = val.coords.latitude;
      this.userLng = val.coords.longitude;
      if (!this.checkedAddres) {
        this.getUserCurrentLocation();
      }
    });

    Preferences.get({ key: environment.mangoTravelStorageKey.device_id }).then(
      (val) => {
        this.deviceID = val.value;
      }
    );
  }

  ngOnInit() {}
  getUserAddressFromCordinates() {}

  ionViewWillEnter() {
    this.showSkeleton = true;

    this.getTrips();
    this.mapService.setActiveIndex(null);
  }

  test(ev) {
    console.log('ditir', ev);
  }

  getTrips() {
    let positions: Array<any> = [];
    this.tripService
      .getAllTrips(this.deviceID)
      .pipe(first())
      .subscribe({
        next: (value) => {
          this.recentTrips = value;
          this.recentTrips.forEach((el: any) => {
            if (el.position) {
              positions.unshift(el.position);
            }
          });
          this.mapService.setCordinates(positions);

          this.showSkeleton = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  getUserCurrentLocation() {
    this.tripService
      .successFunction(this.userLat, this.userLng)
      .pipe(first())
      .subscribe({
        next: (value) => {
          this.userLocation = value;
          console.log(value);
          this.checkedAddres = true;
          console.log(value.results[0].formatted_address.split(',')[1]);
          console.log(value.results[0].formatted_address.split(',')[2]);
          let city = value.results[0].formatted_address.split(',')[1];
          city = city.substring(1);
          let country = value.results[0].formatted_address.split(',')[2];
          country = country.substring(1);
          this.userLocation = {
            city: city,
            country: country,
          };
          console.log(this.userLocation);
        },
      });
  }
  goToTripDetails(details, image) {
    let newDetails: Array<any> = [];
    details.forEach((element) => {
      newDetails.push(element.text);
    });
    this.tripService.fillTripDetails(newDetails);
    this.tripService.setTripImage(image);
    this.navCtrl.navigateForward('tabs/trip-details', { replaceUrl: true });
  }

  getActiveIndex() {
    this.mapService.setActiveIndex(
      this.swiperRef?.nativeElement.swiper.activeIndex
    );
  }
}
