import {inject, TestBed} from '@angular/core/testing';

import {MockProblemsService} from './mock-problems.service';

describe('MockProblemsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MockProblemsService]
        });
    });

    it('should be created', inject([MockProblemsService], (service: MockProblemsService) => {
        expect(service).toBeTruthy();
    }));
});
