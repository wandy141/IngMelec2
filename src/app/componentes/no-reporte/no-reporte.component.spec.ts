import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoReporteComponent } from './no-reporte.component';

describe('NoReporteComponent', () => {
  let component: NoReporteComponent;
  let fixture: ComponentFixture<NoReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoReporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
