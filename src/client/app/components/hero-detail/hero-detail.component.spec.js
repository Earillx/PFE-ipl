"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var hero_detail_component_1 = require("./hero-detail.component");
xdescribe('HeroDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [hero_detail_component_1.HeroDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(hero_detail_component_1.HeroDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    xit('should create', function () {
        expect(component).toBeTruthy();
    });
});
