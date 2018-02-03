"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var hero_search_component_1 = require("./hero-search.component");
xdescribe('HeroSearchComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [hero_search_component_1.HeroSearchComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(hero_search_component_1.HeroSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    xit('should create', function () {
        expect(component).toBeTruthy();
    });
});
