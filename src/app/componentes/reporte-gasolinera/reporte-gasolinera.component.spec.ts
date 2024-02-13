import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGasolineraComponent } from './reporte-gasolinera.component';

describe('ReporteGasolineraComponent', () => {
  let component: ReporteGasolineraComponent;
  let fixture: ComponentFixture<ReporteGasolineraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteGasolineraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteGasolineraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
