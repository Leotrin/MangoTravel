import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { MapService } from 'src/app/services/map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  apiLoaded: Observable<boolean>;
  activeIndex: any;
  cordinateSubscription: Subscription;
  activeIndexSubscription: Subscription;

  center: google.maps.LatLngLiteral = {
    lat: 48.856614,
    lng: 2.3522219,
  };
  zoom = 3;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  test: google.maps.MapOptions = {};
  markerPositions: google.maps.LatLngLiteral[] = [];
  mapOptions: google.maps.MapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    noClear: true,
    keyboardShortcuts: false,
    minZoom: 2,
  };

  // addMarker(event: google.maps.MapMouseEvent) {
  //   this.markerPositions.push(event.latLng.toJSON());
  //   console.log(event.latLng.toJSON());
  // }

  constructor(private mapService: MapService) {}
  ngOnDestroy() {
    this.cordinateSubscription.unsubscribe();
    this.activeIndexSubscription.unsubscribe();
  }
  ngOnInit() {
    this.cordinateSubscription = this.mapService
      .getCordinates()
      .subscribe((val) => {
        val.forEach((element) => {
          this.markerPositions.unshift(element);
        });
      });

    this.activeIndexSubscription = this.mapService
      .getActiveIndex()
      .subscribe((val1) => {
        let newCenter: google.maps.LatLngLiteral = {
          lat: 0,
          lng: 0,
        };
        this.activeIndex = val1;
        if (this.activeIndex != null) {
          this.zoom = 4;
          setTimeout(() => {
            newCenter.lat = this.markerPositions[this.activeIndex]?.lat;
            newCenter.lng = this.markerPositions[this.activeIndex]?.lng;
            this.center = newCenter;
            this.zoom = 7;
          }, 700);
        }
      });
  }
}
