import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DayInformationComponent } from 'src/app/components/day-information/day-information.component';
import { SearchPageService } from 'src/app/services/search-page.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
})
export class TripDetailsPage implements OnInit {
  tripDetails: any[] = [];
  subs: Subscription;
  formattedContentArray: SafeHtml[] = [];
  constructor(
    private sanitizer: DomSanitizer,
    private searchPageService: SearchPageService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    console.log(this.tripDetails);
  }
  ionViewWillEnter() {
    this.subs = this.searchPageService.getFillTripDetails().subscribe((val) => {
      this.tripDetails = val;
    });
    this.formatContent();
  }

  ionViewDidLeave() {
    this.subs.unsubscribe();
    console.log('leaved');

    this.searchPageService.fillTripDetails(null);
  }

  formatContent() {
    console.log(this.tripDetails);
    this.formattedContentArray = this.tripDetails.map((item) =>
      this.sanitizer.bypassSecurityTrustHtml(item)
    );
  }
  goToDashboard() {
    this.navCtrl.navigateForward('tabs/landing-page', { replaceUrl: true });
  }
  async openDayInformationModal(index) {
    const modal = await this.modalCtrl.create({
      cssClass: 'dayInformationModal',
      component: DayInformationComponent,
      componentProps: { index: index, data: this.formattedContentArray },
      backdropDismiss: true,
    });

    await modal.present();
  }
}
