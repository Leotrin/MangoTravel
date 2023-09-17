import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  selectedIndex: number = 0;
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToTab(tabName, index) {
    this.selectedIndex = index;
    this.navCtrl.navigateForward(`tabs/${tabName}`);
  }
}
