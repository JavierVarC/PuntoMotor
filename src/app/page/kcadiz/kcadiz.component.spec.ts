import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KcadizComponent } from './kcadiz.component';

describe('KcadizComponent', () => {
  let component: KcadizComponent;
  let fixture: ComponentFixture<KcadizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KcadizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KcadizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
