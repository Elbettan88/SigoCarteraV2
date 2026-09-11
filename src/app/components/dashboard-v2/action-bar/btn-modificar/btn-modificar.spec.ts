import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnModificar } from './btn-modificar';

describe('BtnModificar', () => {
  let component: BtnModificar;
  let fixture: ComponentFixture<BtnModificar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnModificar],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnModificar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
