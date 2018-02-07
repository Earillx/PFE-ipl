import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MachineToolsComponent} from './machine-tools.component';

describe('MachineToolsComponent', () => {
    let component: MachineToolsComponent;
    let fixture: ComponentFixture<MachineToolsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MachineToolsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MachineToolsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
