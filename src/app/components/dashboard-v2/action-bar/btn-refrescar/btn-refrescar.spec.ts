import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnRefrescar } from './btn-refrescar';

describe('BtnRefrescar', () => {
  let component: BtnRefrescar;
  let fixture: ComponentFixture<BtnRefrescar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnRefrescar],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnRefrescar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
