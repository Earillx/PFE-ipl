import {inject, TestBed} from '@angular/core/testing';

import {MachinesProviderService} from './machines-provider.service';

describe('MachinesProviderService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MachinesProviderService]
        });
    });

    it('should be created', inject([MachinesProviderService], (service: MachinesProviderService) => {
        expect(service).toBeTruthy();
    }));
});
