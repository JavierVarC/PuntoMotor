import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaAccesorioComponent } from './carta-accesorio.component';

describe('CartaAccesorioComponent', () => {
  let component: CartaAccesorioComponent;
  let fixture: ComponentFixture<CartaAccesorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaAccesorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaAccesorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
