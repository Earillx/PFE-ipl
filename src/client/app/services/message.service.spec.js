"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var message_service_1 = require("./message.service");
xdescribe('MessageService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [message_service_1.MessageService]
        });
    });
    xit('should be created', testing_1.inject([message_service_1.MessageService], function (service) {
        expect(service).toBeTruthy();
    }));
});
