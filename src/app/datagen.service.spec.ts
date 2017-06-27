import { TestBed, inject } from '@angular/core/testing';

import { DatagenService } from './datagen.service';

describe('DatagenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatagenService]
    });
  });

  it('should ...', inject([DatagenService], (service: DatagenService) => {
    expect(service).toBeTruthy();
  }));
});
