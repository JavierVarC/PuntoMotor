import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailModeloComponent } from './detail-modelo.component';

describe('DetailModeloComponent', () => {
  let component: DetailModeloComponent;
  let fixture: ComponentFixture<DetailModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
