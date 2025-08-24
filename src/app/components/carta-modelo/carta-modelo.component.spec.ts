import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaModeloComponent } from './carta-modelo.component';

describe('CartaModeloComponent', () => {
  let component: CartaModeloComponent;
  let fixture: ComponentFixture<CartaModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
