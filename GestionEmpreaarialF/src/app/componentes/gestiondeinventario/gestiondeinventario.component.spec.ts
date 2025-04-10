import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiondeinventarioComponent } from './gestiondeinventario.component';

describe('GestiondeinventarioComponent', () => {
  let component: GestiondeinventarioComponent;
  let fixture: ComponentFixture<GestiondeinventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestiondeinventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestiondeinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
