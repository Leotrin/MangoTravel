import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-trip-buttons',
  templateUrl: './trip-buttons.component.html',
  styleUrls: ['./trip-buttons.component.scss'],
})
export class TripButtonsComponent implements OnInit {
  @Input() activeIndex: number;
  @Input() userLocation: any;
  @Input() recentTrips: any;
  constructor(private datePipe: DatePipe, private iab: InAppBrowser) {}

  ngOnInit() {
    console.log(this.activeIndex, this.userLocation, this.recentTrips);
  }
  findFlight() {
    let dataTrip = this.recentTrips[this.activeIndex ?? 0];
    console.log(dataTrip);
    let city = dataTrip.where.split(',')[0].split('-')[0];
    city = city.trim();
    let country;
    if (dataTrip.where.includes('-')) {
      country = dataTrip.where.split('-')[1];
      country = country.substring(1);
      country = country.split(' ').join('-');
    } else {
      country = dataTrip.where.split(',')[1].replace(' ', '');
    }
    if (country == 'UK') {
      country = 'united-kingdom';
    }
    let fromDate = this.datePipe.transform(dataTrip.from_date, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(dataTrip.to_date, 'yyyy-MM-dd');
    console.log('fromDate', fromDate);
    console.log('ToDate', toDate);
    if (this.userLocation.country == 'North Macedonia') {
      this.userLocation.country =
        this.userLocation.country.split(' ')[1].toLowerCase() +
        '-' +
        'fyrom'.toLowerCase();
      this.userLocation.city = 'skopje';
    }
    city = city.replace('ü', 'u');
    let link = `https://www.kiwi.com/en/search/results/${
      this.userLocation.city
    }-${this.userLocation.country}-/${city.toLowerCase()}-${country
      .toLowerCase()
      .replace(' ', '')}/${fromDate}/${toDate}`;
    console.log(link);
    // window.open(link);
    const browser = this.iab.create(link);
    browser.show();
    // Browser.open({
    //   windowName: 'MangoTravel',
    //   url: link,
    // });
  }
  findStay() {
    let dataTrip = this.recentTrips[this.activeIndex ?? 0];
    let city = dataTrip.where.split(',')[0].split('-')[0];
    let fromDate = this.datePipe.transform(dataTrip.from_date, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(dataTrip.to_date, 'yyyy-MM-dd');

    let bookingLink = `https://www.booking.com/searchresults.en-gb.html?ss=${city}&sb=1&src_elem=sb&src=index&checkin=${fromDate}&checkout=${toDate}&group_adults=${dataTrip.people}&no_rooms=1&group_children=0&sb_travel_purpose=leisure`;
    Browser.open({
      windowName: 'MangoTravel',
      url: bookingLink,
    });
  }
}
//https://www.booking.com/searchresults.en-gb.html?ss=Oerlikon&sb=1&src_elem=sb&src=index&checkin=2023-09-14&checkout=2023-09-16&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure
