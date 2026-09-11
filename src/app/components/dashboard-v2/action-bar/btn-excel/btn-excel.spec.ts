import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnExcel } from './btn-excel';

describe('BtnExcel', () => {
  let component: BtnExcel;
  let fixture: ComponentFixture<BtnExcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnExcel],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnExcel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
