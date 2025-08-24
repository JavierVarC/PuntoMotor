import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionesSectionComponent } from './ubicaciones-section.component';

describe('UbicacionesSectionComponent', () => {
  let component: UbicacionesSectionComponent;
  let fixture: ComponentFixture<UbicacionesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbicacionesSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UbicacionesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
