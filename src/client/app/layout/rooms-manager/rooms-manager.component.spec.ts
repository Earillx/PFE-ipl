import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomsManagerComponent} from './rooms-manager.component';

describe('RoomsManagerComponent', () => {
    let component: RoomsManagerComponent;
    let fixture: ComponentFixture<RoomsManagerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoomsManagerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomsManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
