import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RecentSearchesPage } from './profile.page.';

describe('RecentSearchesPage', () => {
  let component: RecentSearchesPage;
  let fixture: ComponentFixture<RecentSearchesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecentSearchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
