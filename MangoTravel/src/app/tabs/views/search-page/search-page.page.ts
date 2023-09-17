import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoadingController, NavController } from '@ionic/angular';
import { first } from 'rxjs';
import { CityService } from 'src/app/services/cityservice.service';
import { SearchPageService } from 'src/app/services/search-page.service';
import { Keyboard } from '@capacitor/keyboard';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

declare var google: any;

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {
  minSelectedDate: any = new Date();
  searchForm: FormGroup | any;
  searchInput: string = '';
  citiesList: Array<any> = [];
  apiResponseArray: any[] = [];
  formattedContentArray: SafeHtml[] = [];
  GoogleAutocomplete: any;
  loader: any;
  deviceID: any;
  hideFooter: boolean = false;
  constructor(
    public datePipe: DatePipe,
    private searchPageService: SearchPageService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private change: ChangeDetectorRef
  ) {
    Preferences.get({ key: environment.mangoTravelStorageKey.device_id }).then(
      (val) => {
        console.log(val);
        this.deviceID = val.value;
      }
    );
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();

    this.searchForm = new FormGroup({
      where: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      from_date: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      to_date: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      people: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)],
      }),
      device_id: new FormControl(this.deviceID, {}),
    });
  }
  ngOnInit() {
    this.datePipe.transform(this.minSelectedDate, 'yyy-MM-dd');
    this.searchForm['controls'].from_date.setValue(
      this.datePipe.transform(this.minSelectedDate, 'yyyy-MM-ddTHH:mm:ss')
    );
    this.searchForm['controls'].to_date.setValue(
      this.datePipe.transform(this.minSelectedDate, 'yyyy-MM-ddTHH:mm:ss')
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

  ionViewWillLeave() {
    Keyboard.removeAllListeners();
  }

  updatePeopleCount(event: any) {
    this.searchForm['controls'].people.setValue(parseInt(event.target.value));
  }

  get getLocale(): string {
    return 'en-EN';
  }
  saveSelectedCity(cityName: any) {
    console.log(cityName);
    this.searchForm['controls'].where.setValue(cityName);
    this.citiesList = [];
  }

  handleChange(ev: any) {
    let bounds = google.maps.LatLng();
    console.log('searching ');
    this.searchInput = ev.target.value.toLowerCase();
    if (this.searchInput.length >= 3) {
      const options = {
        input: this.searchInput,
      };

      this.GoogleAutocomplete.getPlacePredictions(
        options,

        (predictions: any, status: any) => {
          console.log(status);
          console.log(predictions);
          if (status == 'OK') {
            this.citiesList = predictions;
          }
        },
        console.log(this.citiesList)
      );
      console.log(bounds);
    } else if (this.searchInput.length == 0) {
      this.citiesList = [];
    }
  }

  getMinDate(event: any) {
    console.log(event);
    this.minSelectedDate = this.datePipe.transform(
      event.detail.value,
      'yyy-MM-dd'
    );
  }

  getTripDetails() {
    this.searchForm.controls['device_id'].setValue(this.deviceID);
    this.loadingCtrl
      .create({
        message: 'Please wait while we generate data for your stay.',

        spinner: 'dots',
        mode: 'ios',
        animated: true,
        backdropDismiss: false,
        showBackdrop: true,
        translucent: true,
        cssClass: 'loading-spinner-design',
      })
      .then((toast) => {
        this.loader = toast;
        this.loader.present();
      });
    console.log(this.searchForm.value);
    this.searchPageService

      .createNewSearch(this.searchForm.value)
      .pipe(first())
      .subscribe({
        next: (value) => {
          value.data.response.forEach((element: any) => {
            console.log(element);
            console.log(element.text);
            this.apiResponseArray.push(element.text);
            this.loader.dismiss();
          });
          this.searchPageService.fillTripDetails(this.apiResponseArray);
          this.searchPageService.setTripImage(value.data.image);

          this.goToTripDetails();
        },
        error: (err) => {
          console.log(err);
          this.loader.dismiss();
        },
      });
  }

  goToTripDetails() {
    this.navCtrl.navigateForward('tabs/trip-details', { replaceUrl: true });
  }
}
