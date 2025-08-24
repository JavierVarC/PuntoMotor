import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KsevillaComponent } from './ksevilla.component';

describe('KsevillaComponent', () => {
  let component: KsevillaComponent;
  let fixture: ComponentFixture<KsevillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KsevillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KsevillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
