import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcelButton } from './excel-button';

describe('ExcelButton', () => {
  let component: ExcelButton;
  let fixture: ComponentFixture<ExcelButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ExcelButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
