import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxPolarChartGroupDateComponent} from './ngx-polar-chart-group-date.component';

describe('NgxPolarChartComponent', () => {
  let component: NgxPolarChartGroupDateComponent;
  let fixture: ComponentFixture<NgxPolarChartGroupDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxPolarChartGroupDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxPolarChartGroupDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
