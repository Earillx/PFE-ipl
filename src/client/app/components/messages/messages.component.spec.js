"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var messages_component_1 = require("./messages.component");
xdescribe('MessagesComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [messages_component_1.MessagesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(messages_component_1.MessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    xit('should create', function () {
        expect(component).toBeTruthy();
    });
});
