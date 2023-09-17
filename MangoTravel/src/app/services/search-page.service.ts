import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { HttpApiClientService } from './http-client-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class SearchPageService {
  tripDetails: BehaviorSubject<any> = new BehaviorSubject(null);
  tripImage: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private httpClient: HttpApiClientService,
    private http: HttpClient
  ) {
    this.getDeviceID();
  }
  getDeviceID() {}
  createNewSearch(payLoad: any): Observable<any> {
    return this.httpClient.post<any>('createNewTrip', payLoad, true);
  }
  getAllTrips(deviceID): Observable<any> {
    return this.httpClient.post<any>(`getAllTrips`, { device_id: deviceID });
  }
  getTripById(tripID): Observable<any> {
    return this.httpClient.get<any>(`getTripDetails${tripID}`);
  }
  fillTripDetails(tripDetails: any) {
    this.tripDetails.next(tripDetails);
  }
  getFillTripDetails() {
    return this.tripDetails.asObservable();
  }
  setTripImage(tripDetails: any) {
    this.tripImage.next(tripDetails);
  }
  getTripImage() {
    return this.tripImage.asObservable();
  }
  getImageFromURL(imageURL) {
    return `${environment.baseLink}/images/${imageURL}`;
  }
  successFunction(userLat, userLng): Observable<any> {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=41.1231,20.8016&sensor=true&key=AIzaSyCDhkmmTIw-udufjBDVvfoZU1iTsWO2OE4`,
        {}
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
