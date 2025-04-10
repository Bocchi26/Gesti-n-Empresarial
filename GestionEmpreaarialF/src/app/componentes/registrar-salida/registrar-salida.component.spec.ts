import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSalidaComponent } from './registrar-salida.component';

describe('RegistrarSalidaComponent', () => {
  let component: RegistrarSalidaComponent;
  let fixture: ComponentFixture<RegistrarSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarSalidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
