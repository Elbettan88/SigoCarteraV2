import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormModificar } from './form-modificar';

describe('FormModificar', () => {
  let component: FormModificar;
  let fixture: ComponentFixture<FormModificar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModificar],
    }).compileComponents();

    fixture = TestBed.createComponent(FormModificar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
