import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiondepedidosComponent } from './gestiondepedidos.component';

describe('GestiondepedidosComponent', () => {
  let component: GestiondepedidosComponent;
  let fixture: ComponentFixture<GestiondepedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestiondepedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestiondepedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
