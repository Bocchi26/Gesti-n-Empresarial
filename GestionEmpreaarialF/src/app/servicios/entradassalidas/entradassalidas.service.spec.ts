import { TestBed } from '@angular/core/testing';

import { EntradassalidasService } from './entradassalidas.service';

describe('EntradassalidasService', () => {
  let service: EntradassalidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradassalidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
