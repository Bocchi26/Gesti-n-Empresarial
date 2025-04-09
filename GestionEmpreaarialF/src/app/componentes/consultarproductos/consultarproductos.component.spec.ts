import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarproductosComponent } from './consultarproductos.component';

describe('ConsultarproductosComponent', () => {
  let component: ConsultarproductosComponent;
  let fixture: ComponentFixture<ConsultarproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarproductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
