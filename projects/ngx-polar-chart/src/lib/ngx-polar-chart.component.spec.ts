import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPolarChartComponent } from './ngx-polar-chart.component';

describe('NgxPolarChartComponent', () => {
  let component: NgxPolarChartComponent;
  let fixture: ComponentFixture<NgxPolarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPolarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxPolarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
