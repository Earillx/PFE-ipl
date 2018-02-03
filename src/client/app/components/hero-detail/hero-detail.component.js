"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HeroDetailComponent = (function () {
    function HeroDetailComponent(route, heroService, location) {
        this.route = route;
        this.heroService = heroService;
        this.location = location;
    }
    HeroDetailComponent.prototype.ngOnInit = function () {
        this.getHero();
    };
    HeroDetailComponent.prototype.getHero = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.heroService.getHero(id)
            .subscribe(function (hero) { return _this.hero = hero; });
    };
    HeroDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    HeroDetailComponent.prototype.save = function () {
        var _this = this;
        this.heroService.updateHero(this.hero)
            .subscribe(function () { return _this.goBack(); });
    };
    __decorate([
        core_1.Input()
    ], HeroDetailComponent.prototype, "hero", void 0);
    HeroDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-hero-detail',
            templateUrl: './hero-detail.component.html',
            styleUrls: ['./hero-detail.component.css']
        })
    ], HeroDetailComponent);
    return HeroDetailComponent;
}());
exports.HeroDetailComponent = HeroDetailComponent;
