import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoFacturas } from './historico-facturas';

describe('HistoricoFacturas', () => {
  let component: HistoricoFacturas;
  let fixture: ComponentFixture<HistoricoFacturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoFacturas],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoFacturas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
