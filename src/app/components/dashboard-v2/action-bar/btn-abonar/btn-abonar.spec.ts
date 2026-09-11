import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnAbonar } from './btn-abonar';

describe('BtnAbonar', () => {
  let component: BtnAbonar;
  let fixture: ComponentFixture<BtnAbonar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnAbonar],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnAbonar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
