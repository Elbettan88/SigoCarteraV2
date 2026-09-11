import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatrizCartera } from './matriz-cartera';

describe('MatrizCartera', () => {
  let component: MatrizCartera;
  let fixture: ComponentFixture<MatrizCartera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrizCartera],
    }).compileComponents();

    fixture = TestBed.createComponent(MatrizCartera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
