import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomLoaderComponent} from './room-loader.component';

describe('RoomLoaderComponent', () => {
    let component: RoomLoaderComponent;
    let fixture: ComponentFixture<RoomLoaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoomLoaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
