import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinCuadrarComponent } from './sin-cuadrar.component';

describe('SinCuadrarComponent', () => {
  let component: SinCuadrarComponent;
  let fixture: ComponentFixture<SinCuadrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinCuadrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinCuadrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
