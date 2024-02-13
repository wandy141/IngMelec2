import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadreComponent } from './cuadre.component';

describe('CuadreComponent', () => {
  let component: CuadreComponent;
  let fixture: ComponentFixture<CuadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
