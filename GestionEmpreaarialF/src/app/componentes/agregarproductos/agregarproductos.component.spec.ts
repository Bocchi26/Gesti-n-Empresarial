import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarproductosComponent } from './agregarproductos.component';

describe('AgregarproductosComponent', () => {
  let component: AgregarproductosComponent;
  let fixture: ComponentFixture<AgregarproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarproductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
