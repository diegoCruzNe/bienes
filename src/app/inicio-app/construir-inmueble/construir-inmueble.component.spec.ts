import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstruirInmuebleComponent } from './construir-inmueble.component';

describe('ConstruirInmuebleComponent', () => {
  let component: ConstruirInmuebleComponent;
  let fixture: ComponentFixture<ConstruirInmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstruirInmuebleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstruirInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
