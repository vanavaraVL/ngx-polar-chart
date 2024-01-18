import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxPolarChartGroupSeriesComponent} from './ngx-polar-chart-group-series.component';

describe('NgxPolarChartComponent', () => {
  let component: NgxPolarChartGroupSeriesComponent;
  let fixture: ComponentFixture<NgxPolarChartGroupSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxPolarChartGroupSeriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxPolarChartGroupSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
