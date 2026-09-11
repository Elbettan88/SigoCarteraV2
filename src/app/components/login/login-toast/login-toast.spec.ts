import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginToast } from './login-toast';

describe('LoginToast', () => {
  let component: LoginToast;
  let fixture: ComponentFixture<LoginToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginToast],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginToast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
