import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormAbonar } from './form-abonar';

describe('FormAbonar', () => {
  let component: FormAbonar;
  let fixture: ComponentFixture<FormAbonar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAbonar],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAbonar);
    component = fixture.componentInstance;

    // Forzar el ciclo de detección de cambios para estabilizar las directivas NgModel
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
