import { Component, Input, OnInit } from '@angular/core';
import { SearchPageService } from 'src/app/services/search-page.service';

@Component({
  selector: 'app-day-information',
  templateUrl: './day-information.component.html',
  styleUrls: ['./day-information.component.scss'],
})
export class DayInformationComponent implements OnInit {
  @Input() index: number;
  data: any;
  tripImage: any;
  constructor(public searchPageService: SearchPageService) {}

  ngOnInit() {
    this.searchPageService.getTripImage().subscribe((val) => {
      this.tripImage = val;
    });
    console.log(this.index, this.data);
  }
  goBack() {
    if (this.index != 0) {
      this.index--;
    }
  }
  goForward() {
    if (this.index + 1 < this.data?.length) {
      this.index++;
    }
  }
}
