import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapCordinates: BehaviorSubject<any> = new BehaviorSubject(null);
  activeIndex: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {}

  setCordinates(tripDetails: any) {
    console.log(tripDetails);
    this.mapCordinates.next(tripDetails);
  }
  getCordinates() {
    return this.mapCordinates.asObservable();
  }
  setActiveIndex(tripDetails: any) {
    this.activeIndex.next(tripDetails);
  }
  getActiveIndex() {
    return this.activeIndex.asObservable();
  }
}
