import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedesSocialesSectionComponent } from './redes-sociales-section.component';

describe('RedesSocialesSectionComponent', () => {
  let component: RedesSocialesSectionComponent;
  let fixture: ComponentFixture<RedesSocialesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedesSocialesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedesSocialesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
