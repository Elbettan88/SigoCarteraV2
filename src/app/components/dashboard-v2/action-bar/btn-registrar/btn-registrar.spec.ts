import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnRegistrar } from './btn-registrar';

describe('BtnRegistrar', () => {
  let component: BtnRegistrar;
  let fixture: ComponentFixture<BtnRegistrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnRegistrar],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnRegistrar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
