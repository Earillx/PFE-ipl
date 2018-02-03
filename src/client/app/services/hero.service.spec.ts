import { TestBed, inject } from '@angular/core/testing';

import { HeroService } from './hero.service';

xdescribe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService]
    });
  });

  xit('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));
});
