(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _flight_planner_flight_planner_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flight-planner/flight-planner.component */ "./src/app/flight-planner/flight-planner.component.ts");
/* harmony import */ var _inventory_inventory_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inventory/inventory.component */ "./src/app/inventory/inventory.component.ts");
/* harmony import */ var _map_editor_map_editor_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./map-editor/map-editor.component */ "./src/app/map-editor/map-editor.component.ts");







var routes = [
    { path: '', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"] },
    { path: 'drone-simulator', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"] },
    { path: 'flight-planner', component: _flight_planner_flight_planner_component__WEBPACK_IMPORTED_MODULE_4__["FlightPlannerComponent"] },
    { path: 'map-editor', component: _map_editor_map_editor_component__WEBPACK_IMPORTED_MODULE_6__["MapEditorComponent"] },
    { path: 'inventory', component: _inventory_inventory_component__WEBPACK_IMPORTED_MODULE_5__["InventoryComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow\">\r\n  <a class=\"navbar-brand col-sm-3 col-md-2 mr-0\" href=\"/\">{{title}}</a>\r\n</nav>\r\n<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n    <nav class=\"col-md-2 d-none d-md-block bg-light sidebar\">\r\n      <div class=\"sidebar-sticky\">\r\n        <ul class=\"nav flex-column\">\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" routerLink=\"/\" [ngClass]=\"{ 'active':activeTab==='dashboard'}\">\r\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-sliders\"><line x1=\"4\" y1=\"21\" x2=\"4\" y2=\"14\"></line><line x1=\"4\" y1=\"10\" x2=\"4\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"3\"></line><line x1=\"20\" y1=\"21\" x2=\"20\" y2=\"16\"></line><line x1=\"20\" y1=\"12\" x2=\"20\" y2=\"3\"></line><line x1=\"1\" y1=\"14\" x2=\"7\" y2=\"14\"></line><line x1=\"9\" y1=\"8\" x2=\"15\" y2=\"8\"></line><line x1=\"17\" y1=\"16\" x2=\"23\" y2=\"16\"></line></svg>\r\n              Dashboard\r\n            </a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" routerLink=\"/flight-planner\" [ngClass]=\"{ 'active':activeTab==='flight-planner'}\">\r\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-compass\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polygon points=\"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76\"/></svg>\r\n              Flight Planner\r\n            </a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" routerLink=\"/inventory\" [ngClass]=\"{ 'active':activeTab==='inventory'}\">\r\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-package\"><path d=\"M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z\"/><polyline points=\"2.32 6.16 12 11 21.68 6.16\"/><line x1=\"12\" y1=\"22.76\" x2=\"12\" y2=\"11\"/><line x1=\"7\" y1=\"3.5\" x2=\"17\" y2=\"8.5\"/></svg>\r\n              Inventory\r\n            </a>\r\n          </li>\r\n        </ul>\r\n        <h6 class=\"sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted\">\r\n          <span>Flight Paths</span>\r\n          <a class=\"d-flex align-items-center text-muted\" href=\"#\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-plus-circle\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line></svg>\r\n          </a>\r\n        </h6>\r\n        <ul class=\"nav flex-column mb-2\">\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" href=\"#\">\r\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-navigation\"><polygon points=\"3 11 22 2 13 21 11 13 3 11\"/></svg>\r\n              Test Flight 1\r\n            </a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" href=\"#\">\r\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-navigation\"><polygon points=\"3 11 22 2 13 21 11 13 3 11\"/></svg>\r\n              Test Flight 2\r\n            </a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </nav>\r\n    <main role=\"main\" class=\"col-md-9 ml-sm-auto col-lg-10 px-4\">\r\n        <router-outlet></router-outlet>\r\n    </main>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared.service */ "./src/app/shared.service.ts");
/* harmony import */ var _drone_simulator_presenter_drone_simulator_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drone-simulator/presenter/drone-simulator.service */ "./src/app/drone-simulator/presenter/drone-simulator.service.ts");




var AppComponent = /** @class */ (function () {
    function AppComponent(service, simulator) {
        var _this = this;
        this.service = service;
        this.simulator = simulator;
        this.title = 'Drone Control Center';
        this.simulator.load()
            .then(function () {
            simulator.onSimulatorLoadedEvent.emit(true);
        });
        service.onNavigateEvent.subscribe(function (activeTab) {
            _this.activeTab = activeTab;
        });
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_service__WEBPACK_IMPORTED_MODULE_2__["SharedService"], _drone_simulator_presenter_drone_simulator_service__WEBPACK_IMPORTED_MODULE_3__["DroneSimulatorService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _drone_simulator_view_drone_simulator_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./drone-simulator/view/drone-simulator.component */ "./src/app/drone-simulator/view/drone-simulator.component.ts");
/* harmony import */ var _flight_planner_flight_planner_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./flight-planner/flight-planner.component */ "./src/app/flight-planner/flight-planner.component.ts");
/* harmony import */ var _map_editor_map_editor_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./map-editor/map-editor.component */ "./src/app/map-editor/map-editor.component.ts");
/* harmony import */ var _inventory_inventory_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./inventory/inventory.component */ "./src/app/inventory/inventory.component.ts");













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_8__["DashboardComponent"],
                _drone_simulator_view_drone_simulator_component__WEBPACK_IMPORTED_MODULE_9__["DroneSimulatorComponent"],
                _flight_planner_flight_planner_component__WEBPACK_IMPORTED_MODULE_10__["FlightPlannerComponent"],
                _map_editor_map_editor_component__WEBPACK_IMPORTED_MODULE_11__["MapEditorComponent"],
                _inventory_inventory_component__WEBPACK_IMPORTED_MODULE_12__["InventoryComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".controls {\r\n  borderleft: 1px dashed #333;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMkJBQTJCO0FBQzdCIiwiZmlsZSI6InNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRyb2xzIHtcclxuICBib3JkZXJsZWZ0OiAxcHggZGFzaGVkICMzMzM7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom\">\r\n  <h1>Dashboard</h1>\r\n</div>\r\n<div class=\"row\">\r\n  <main class=\"col-md\">\r\n    <app-drone-simulator></app-drone-simulator>\r\n  </main>\r\n  <aside *ngIf=\"simulator.initialized\" class=\"col-md controls\">\r\n    <h2>Drone Controls</h2>\r\n    <hr>\r\n    <div class=\"card-deck\">\r\n      <div class=\"card bg-light mb-3\" style=\"max-width: 540px;\">\r\n        <div class=\"card-header\"></div>\r\n        <div class=\"card-body\">\r\n          <h5 class=\"card-title\">Drone Information</h5>\r\n          <p class=\"card-text\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\r\n                 stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n                 class=\"feather feather-battery-charging\">\r\n              <path d=\"M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19\"></path>\r\n              <line x1=\"23\" y1=\"13\" x2=\"23\" y2=\"11\"></line>\r\n              <polyline points=\"11 6 7 12 13 12 9 18\"></polyline>\r\n            </svg>\r\n            Battery: 100%\r\n          </p>\r\n          <p class=\"card-text\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\r\n                 stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n                 class=\"feather feather-map-pin\">\r\n              <path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path>\r\n              <circle cx=\"12\" cy=\"10\" r=\"3\"></circle>\r\n            </svg>\r\n            Position: [{{simulator.drone.x}}, {{simulator.drone.y}}]\r\n          </p>\r\n          <p class=\"card-text\">\r\n            <small class=\"text-muted\">Last updated 1 second ago</small>\r\n          </p>\r\n        </div>\r\n      </div>\r\n      <div class=\"card bg-light mb-3\" style=\"max-width: 540px;\">\r\n        <div class=\"card-header\"></div>\r\n        <div class=\"card-body\">\r\n          <h5 class=\"card-title\">Map Editing</h5>\r\n          <div class=\"card-text\">\r\n            Select drawable:\r\n          </div>\r\n          <div class=\"btn-group\" ngbDropdown role=\"group\" aria-label=\"map-selection\">\r\n            <button *ngIf=\"simulator.loaded\" type=\"button\" class=\"btn btn-sm btn-outline-secondary dropdown-toggle\"\r\n                    ngbDropdownToggle>\r\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\r\n                   stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n                   class=\"feather feather-codepen\">\r\n                <polygon points=\"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2\"></polygon>\r\n                <line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"15.5\"></line>\r\n                <polyline points=\"22 8.5 12 15.5 2 8.5\"></polyline>\r\n                <polyline points=\"2 15.5 12 8.5 22 15.5\"></polyline>\r\n                <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"8.5\"></line>\r\n              </svg>\r\n              {{simulator.selectedDrawable}}\r\n            </button>\r\n            <div class=\"dropdown-menu\" ngbDropdownMenu>\r\n              <button type=\"button\" class=\"dropdown-item\" (click)=\"simulator.selectDrawable('waypoint')\">\r\n                Waypoints\r\n              </button>\r\n              <button type=\"button\" class=\"dropdown-item\" (click)=\"simulator.selectDrawable('obstacle')\">\r\n                Obstacles\r\n              </button>\r\n              <button type=\"button\" class=\"dropdown-item\" (click)=\"simulator.selectDrawable('product')\">\r\n                Products\r\n              </button>\r\n            </div>\r\n          </div>\r\n          <div class=\"card-text\">\r\n            <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" (click)=\"simulator.duplicateMap()\">\r\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\r\n                   stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n                   class=\"feather feather-download\">\r\n                <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path>\r\n                <polyline points=\"7 10 12 15 17 10\"></polyline>\r\n                <line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"></line>\r\n              </svg>\r\n              Export Map\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </aside>\r\n</div>\r\n<hr>\r\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared.service */ "./src/app/shared.service.ts");
/* harmony import */ var _drone_simulator_presenter_drone_simulator_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../drone-simulator/presenter/drone-simulator.service */ "./src/app/drone-simulator/presenter/drone-simulator.service.ts");




var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(sharedService, simulator) {
        this.sharedService = sharedService;
        this.simulator = simulator;
        sharedService.onNavigateEvent.emit('dashboard');
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/dashboard/dashboard.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_service__WEBPACK_IMPORTED_MODULE_2__["SharedService"], _drone_simulator_presenter_drone_simulator_service__WEBPACK_IMPORTED_MODULE_3__["DroneSimulatorService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/data.service.ts":
/*!*********************************!*\
  !*** ./src/app/data.service.ts ***!
  \*********************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.getNewMap = function () {
        return this.http.get('../assets/data/new_map.json').toPromise();
    };
    DataService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/drone-simulator/model/drawable.js":
/*!***************************************************!*\
  !*** ./src/app/drone-simulator/model/drawable.js ***!
  \***************************************************/
/*! exports provided: Drawable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drawable", function() { return Drawable; });
class Drawable {
  constructor(x, y, tileSize) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
  }

  draw(context) {
    throw new Error('Abstract method not implemented here.');
  }

  intersects(other) {
    return !(
      this.x + 1 <= other.x ||
      this.y + 1 <= other.y ||
      this.x >= other.x + 1 ||
      this.y >= other.y + 1
    );
  }
}


/***/ }),

/***/ "./src/app/drone-simulator/model/drone.js":
/*!************************************************!*\
  !*** ./src/app/drone-simulator/model/drone.js ***!
  \************************************************/
/*! exports provided: Drone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drone", function() { return Drone; });
/* harmony import */ var _image_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image.js */ "./src/app/drone-simulator/model/image.js");


class Drone extends _image_js__WEBPACK_IMPORTED_MODULE_0__["DrawableImage"] {
  constructor(x, y, tileSize, gridSize, imageLoader) {
    super(x, y, tileSize, imageLoader.loadedImages['drone']);
    this.gridSize = gridSize;
    this.dx = 0;
    this.dy = 0;
  }

  draw(context) {
    context.drawImage(this.loadedImage, this.x * this.tileSize - (this.tileSize / 2), this.y * this.tileSize - (this.tileSize / 2), this.tileSize * 2, this.tileSize * 2);
  }

  fly(flightpath) {
    // TODO
  }

  move(direction) {
    switch (direction) {
      case 'north':
        if (this.y < this.gridSize.height - 1) {
          this.dx = 0;
          this.dy = 1;
          this.flyDiff();
        }
        break;
      case 'south':
        if (this.y > 0) {
          this.dx = 0;
          this.dy = -1;
          this.flyDiff();
        }
        break;
      case 'east':
        if (this.x < this.gridSize.width - 1) {
          this.dx = 1;
          this.dy = 0;
          this.flyDiff();
        }
        break;
      case 'west':
        if (this.x > 0) {
          this.dx = -1;
          this.dy = 0;
          this.flyDiff();
        }
        break;
    }
  }

  moveTo(x, y) {
    if (x > 0 && y > 0 && y < this.gridSize.height - 1 && x < this.gridSize.width - 1) {
      this.x = x;
      this.y = y;
    }
  }

  flyDiff() {
    this.x += this.dx;
    this.y += this.dy;
  }

  reset() {
    this.x = 1;
    this.y = 1;
  }
}


/***/ }),

/***/ "./src/app/drone-simulator/model/flightpath.js":
/*!*****************************************************!*\
  !*** ./src/app/drone-simulator/model/flightpath.js ***!
  \*****************************************************/
/*! exports provided: FlightPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlightPath", function() { return FlightPath; });
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ "./src/app/drone-simulator/model/tile.js");


class FlightPath {
  constructor(tileSize, mapId, takeoff, landing) {
    this.mapId = mapId;
    this.tileSize = tileSize;
    this.waypoints = [];
    this.optimalPath = [];
    this.takeoff = takeoff;
    this.landing = landing;
  }

  addWaypoint(x, y) {
    let waypoint = new _tile__WEBPACK_IMPORTED_MODULE_0__["Tile"](x, y, this.tileSize, '#699868');
    this.waypoints.push(waypoint);
    console.log('Waypoint added: [X: ' + x + ', Y: ' + y + ']');
  }

  removeWaypoint(x, y) {
    for (let i = this.waypoints.length - 1; i >= 0; i--) {
      if (this.waypoints[i].x === x && this.waypoints[i].y === y) {
        this.waypoints.splice(i, 1);
      }
    }
    console.log('Waypoint removed: [X: ' + x + ', Y: ' + y + ']');
  }

  setOptimalPath(optimalPath) {
    this.optimalPath = [];
    for (let i = 0; i < optimalPath.length; i++) {
      let tile = new _tile__WEBPACK_IMPORTED_MODULE_0__["Tile"](optimalPath[i].x, optimalPath[i].y, this.tileSize, '#4286f4');
      this.optimalPath[i] = tile;
    }
  }

  toJSON() {
    let flightpath = {
      mapId: 0,
      waypoints: []
    };
    flightpath.mapId = this.mapId;
    flightpath.waypoints.push(this.takeoff);
    this.waypoints.forEach(waypoint => flightpath.waypoints.push({x: waypoint.x, y: waypoint.y}));
    flightpath.waypoints.push(this.landing);
    return flightpath;
  }

  draw(context) {
    this.optimalPath.forEach((t) => t.draw(context));
    this.waypoints.forEach((w) => w.draw(context));
  }
}


/***/ }),

/***/ "./src/app/drone-simulator/model/grid.js":
/*!***********************************************!*\
  !*** ./src/app/drone-simulator/model/grid.js ***!
  \***********************************************/
/*! exports provided: Grid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
/* harmony import */ var _tile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile.js */ "./src/app/drone-simulator/model/tile.js");


class Grid {
  constructor(gridSize, tileSize) {
    this.gridSize = gridSize;
    this.tiles = [...Array(gridSize.width)].map(() => Array(gridSize.height));
    for (let x = 0; x < gridSize.width; x++) {
      for (let y = 0; y < gridSize.height; y++) {
        this.tiles[x][y] = new _tile_js__WEBPACK_IMPORTED_MODULE_0__["Tile"](x, y, tileSize);
      }
    }
  }

  draw(context) {
    for (let x = 0; x < this.gridSize.width; x++) {
      for (let y = 0; y < this.gridSize.height; y++) {
        this.tiles[x][y].draw(context);
      }
    }
  }
}


/***/ }),

/***/ "./src/app/drone-simulator/model/image.js":
/*!************************************************!*\
  !*** ./src/app/drone-simulator/model/image.js ***!
  \************************************************/
/*! exports provided: DrawableImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawableImage", function() { return DrawableImage; });
/* harmony import */ var _drawable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawable.js */ "./src/app/drone-simulator/model/drawable.js");


class DrawableImage extends _drawable_js__WEBPACK_IMPORTED_MODULE_0__["Drawable"] {
  constructor(x, y, tileSize, loadedImage) {
    super(x, y, tileSize);
    this.loadedImage = loadedImage;
  }

  draw(context) {
      context.drawImage(this.loadedImage, this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
  }

  intersects(other) {
    return this.intersects(other);
  }
}


/***/ }),

/***/ "./src/app/drone-simulator/model/map.js":
/*!**********************************************!*\
  !*** ./src/app/drone-simulator/model/map.js ***!
  \**********************************************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return Map; });
/* harmony import */ var _grid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid.js */ "./src/app/drone-simulator/model/grid.js");
/* harmony import */ var _flightpath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flightpath.js */ "./src/app/drone-simulator/model/flightpath.js");
/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product.js */ "./src/app/drone-simulator/model/product.js");
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tile */ "./src/app/drone-simulator/model/tile.js");





class Map {

  constructor(gridSize, tileSize, imageLoader) {
    this.name = '';
    this.id = 0;
    this.gridSize = gridSize;
    this.tileSize = tileSize;
    this.grid = new _grid_js__WEBPACK_IMPORTED_MODULE_0__["Grid"](gridSize, tileSize);
    this.obstacles = [];
    this.products = [];
    this.flightpath = undefined;
    this.imageLoader = imageLoader;
  }

  reset() {
    this.id = 0;
    this.name = '';
    this.flightpath = undefined;
    this.obstacles = [];
    this.products = [];
  }

  loadMap(map) {
    this.id = map._id;
    this.name = map.name;
    this.flightpath = new _flightpath_js__WEBPACK_IMPORTED_MODULE_1__["FlightPath"](this.tileSize, this.id, {x: 1, y: 1}, {x: 1, y: 1});
    map.obstacles.forEach(o => this.addObstacle(o.x, o.y));
    map.products.forEach(p => this.addProduct(p.name, p.quantity, p.position.x, p.position.y));
  }

  toJSON(name) {
    let map = {
      _id: this.id,
      sizeX: this.gridSize.width,
      sizeY: this.gridSize.height,
      name: name,
      obstacles: [],
      products: []
    };
    this.obstacles.forEach((o) => map.obstacles.push({x: o.x, y: o.y}));
    this.products.forEach((p) => map.products.push({
        name: p.name,
        quantity: p.quantity,
        position: {x: p.x, y: p.y}
      })
    );
    return map;
  }

  addProduct(name, quantity, x, y) {
    let p = new _product_js__WEBPACK_IMPORTED_MODULE_2__["Product"](x, y, this.tileSize, this.imageLoader.loadedImages['box']);
    p.name = name;
    p.quantity = quantity;
    this.products.push(p);
  }

  removeProduct(x, y) {
    for (let i = this.products.length - 1; i >= 0; i--) {
      if (this.products[i].x === x && this.products[i].y === y) {
        this.products.splice(i, 1);
      }
    }
  }

  addObstacle(x, y) {
    this.obstacles.push(new _tile__WEBPACK_IMPORTED_MODULE_3__["Tile"](x, y, this.tileSize, '#a80a0a'));
  }

  removeObstacle(x, y) {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      if (this.obstacles[i].x === x && this.obstacles[i].y === y) {
        this.obstacles.splice(i, 1);
      }
    }
  }

  toggleWaypoint(x, y) {
    if (this.contains('product', x, y)) {
      if (!this.contains('waypoint', x, y)) {
        this.flightpath.addWaypoint(x, y);
      } else {
        this.flightpath.removeWaypoint(x, y);
      }
    }
  }

  toggleObstacle(x, y) {
    if (!this.contains('product', x, y)) {
      if (!this.contains('obstacle', x, y)) {
        this.addObstacle(x, y);
      } else {
        this.removeObstacle(x, y);
      }
    }
  }

  toggleProduct(x, y) {
    if (!this.contains('obstacle', x, y)) {
      if (!this.contains('product', x, y)) {
        this.addProduct('Manually added', 1, x, y);
      } else {
        this.removeProduct(x, y);
      }
    }
  }

  draw(context) {
    this.grid.draw(context);
    this.flightpath.draw(context);
    this.obstacles.forEach((o) => o.draw(context));
    this.products.forEach((i) => i.draw(context));
  }

  contains(type, x, y) {
    if (type === 'obstacle') {
      return this.obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
    } else if (type === 'product') {
      return this.products.some(item => item.x === x && item.y === y);
    } else if (type === 'waypoint') {
      return this.flightpath.waypoints.some(waypoint => waypoint.x === x && waypoint.y === y);
    }
  }
}


/***/ }),

/***/ "./src/app/drone-simulator/model/product.js":
/*!**************************************************!*\
  !*** ./src/app/drone-simulator/model/product.js ***!
  \**************************************************/
/*! exports provided: Product */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Product", function() { return Product; });
/* harmony import */ var _image_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image.js */ "./src/app/drone-simulator/model/image.js");


class Product extends _image_js__WEBPACK_IMPORTED_MODULE_0__["DrawableImage"] {
  constructor(x, y, tileSize, loadedImage) {
    super(x, y, tileSize, loadedImage);
    this.name = '';
    this.quantity = 0;
  }
}


/***/ }),

/***/ "./src/app/drone-simulator/model/tile.js":
/*!***********************************************!*\
  !*** ./src/app/drone-simulator/model/tile.js ***!
  \***********************************************/
/*! exports provided: Tile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tile", function() { return Tile; });
/* harmony import */ var _drawable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawable.js */ "./src/app/drone-simulator/model/drawable.js");


class Tile extends _drawable_js__WEBPACK_IMPORTED_MODULE_0__["Drawable"] {
  constructor(x, y, tileSize, color = '#686868') {
    super(x, y, tileSize);
    this.color = color;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
    context.strokeRect(this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
  }
}


/***/ }),

/***/ "./src/app/drone-simulator/presenter/drone-simulator.service.ts":
/*!**********************************************************************!*\
  !*** ./src/app/drone-simulator/presenter/drone-simulator.service.ts ***!
  \**********************************************************************/
/*! exports provided: DroneSimulatorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DroneSimulatorService", function() { return DroneSimulatorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/map */ "./src/app/drone-simulator/model/map.js");
/* harmony import */ var _model_drone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/drone */ "./src/app/drone-simulator/model/drone.js");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../http.service */ "./src/app/http.service.ts");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data.service */ "./src/app/data.service.ts");
/* harmony import */ var _utils_imageloader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/imageloader */ "./src/app/drone-simulator/utils/imageloader.js");







var DroneSimulatorService = /** @class */ (function () {
    function DroneSimulatorService(data, http) {
        var _this = this;
        this.data = data;
        this.http = http;
        this.tileSize = 20;
        this.selectedMap = 0;
        this.selectedDrawable = 'waypoint';
        this.alertEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onSimulatorLoadedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        console.log('Starting simulator service...');
        this.onSimulatorLoadedEvent.subscribe(function (loaded) {
            if (loaded) {
                console.log('Simulator finished loading data.');
                _this.loaded = true;
            }
        });
        this.imageLoader = new _utils_imageloader__WEBPACK_IMPORTED_MODULE_6__["ImageLoader"]();
        this.simulationRunner = undefined;
    }
    DroneSimulatorService.prototype.registerEventListeners = function () {
        var _this = this;
        window.addEventListener('keydown', function (event) {
            _this.keyhandler(event);
        });
        window.addEventListener('mousedown', function (event) {
            _this.clickhandler(event);
        });
        window.addEventListener('mousemove', function (event) {
            _this.mousehandler(event);
        });
    };
    DroneSimulatorService.prototype.keyhandler = function (e) {
    };
    DroneSimulatorService.prototype.clickhandler = function (e) {
        var pos = this.mousePos(e);
        if (pos.x >= 0 && pos.y >= 0 && pos.x <= this.canvas.width && pos.y <= this.canvas.height) {
            var x = Math.floor(pos.x / this.tileSize);
            var y = Math.floor(pos.y / this.tileSize);
            if (this.selectedDrawable === 'waypoint') {
                this.map.toggleWaypoint(x, y);
            }
            else if (this.selectedDrawable === 'obstacle') {
                this.map.toggleObstacle(x, y);
            }
            else if (this.selectedDrawable === 'product') {
                this.map.toggleProduct(x, y);
            }
        }
        this.render();
    };
    DroneSimulatorService.prototype.mousehandler = function (e) {
        var pos = this.mousePos(e);
        if (pos.x >= 0 && pos.y >= 0 && pos.x <= this.canvas.width && pos.y <= this.canvas.height) {
            this.mouseX = Math.floor(pos.x / this.tileSize);
            this.mouseY = Math.floor(pos.y / this.tileSize);
        }
    };
    DroneSimulatorService.prototype.mousePos = function (e) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
            y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
        };
    };
    DroneSimulatorService.prototype.reset = function () {
        if (this.simulationRunner) {
            window.clearInterval(this.simulationRunner);
            this.simulationRunner = undefined;
            this.alertEvent.emit('Simulation stopped.');
        }
        this.drone.reset();
        this.map.reset();
        this.map.loadMap(this.maps[this.selectedMap]);
        this.render();
    };
    DroneSimulatorService.prototype.init = function () {
        this.canvas = document.getElementById('simulator');
        var gridSize = { width: this.canvas.width / this.tileSize, height: this.canvas.height / this.tileSize };
        this.map = new _model_map__WEBPACK_IMPORTED_MODULE_2__["Map"](gridSize, this.tileSize, this.imageLoader);
        this.drone = new _model_drone__WEBPACK_IMPORTED_MODULE_3__["Drone"](1, 1, this.tileSize, gridSize, this.imageLoader);
        this.map.loadMap(this.maps[this.selectedMap]);
        if (!this.eventListenersRegistered) {
            this.registerEventListeners();
            this.eventListenersRegistered = true;
        }
        this.initialized = true;
        this.render();
    };
    DroneSimulatorService.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('Loading simulator data...');
            _this.imageLoader.loadImages()
                .then(function () {
                _this.http.getAllMaps()
                    .then(function (result) {
                    _this.maps = result;
                    if (_this.maps.length === 0) {
                        _this.alertEvent.emit('No maps found in database, initializing new map...');
                        _this.data.getNewMap()
                            .then(function (res) {
                            _this.http.addMap(res)
                                .then(function () {
                                _this.alertEvent.emit('New map added.');
                                _this.http.getAllMaps()
                                    .then(function (newMaps) {
                                    _this.maps = newMaps;
                                    resolve();
                                })
                                    .catch(function (err) {
                                    console.log(err);
                                });
                            })
                                .catch(function (error) {
                                _this.alertEvent.emit('Error adding new maps.');
                                console.log(error);
                            });
                        })
                            .catch(function (error) {
                            _this.alertEvent.emit('Error loading new map from JSON.');
                            console.log(error);
                        });
                    }
                    else {
                        resolve();
                    }
                })
                    .catch(function (error) {
                    _this.alertEvent.emit('Error loading maps from database.');
                    console.log(error);
                    reject();
                });
            })
                .catch(function (error) {
                _this.alertEvent.emit('Error loading images.');
                console.log(error);
                reject();
            });
        });
    };
    DroneSimulatorService.prototype.start = function () {
        var _this = this;
        if (this.map.flightpath.optimalPath && this.simulationRunner === undefined) {
            this.alertEvent.emit('Starting simulation...');
            var currentWaypoint_1 = 0;
            this.simulationRunner = setInterval(function () {
                if (currentWaypoint_1 < _this.map.flightpath.optimalPath.length) {
                    _this.drone.moveTo(_this.map.flightpath.optimalPath[currentWaypoint_1].x, _this.map.flightpath.optimalPath[currentWaypoint_1].y);
                    _this.render();
                    currentWaypoint_1++;
                }
                else {
                    window.clearInterval(_this.simulationRunner);
                    _this.simulationRunner = undefined;
                    _this.alertEvent.emit('Simulation finished.');
                }
            }, 100);
        }
        else {
            this.alertEvent.emit('No optimal flightpath calculated.');
        }
    };
    DroneSimulatorService.prototype.render = function () {
        var context = this.canvas.getContext('2d');
        this.map.draw(context);
        this.drone.draw(context);
    };
    DroneSimulatorService.prototype.selectMap = function (id) {
        this.selectedMap = id;
        this.reset();
    };
    DroneSimulatorService.prototype.selectDrawable = function (drawable) {
        this.selectedDrawable = drawable;
    };
    DroneSimulatorService.prototype.calculateOptimalFlightPath = function () {
        var _this = this;
        var flightpath = this.map.flightpath.toJSON();
        console.log('Sending waypoints to back-end:', flightpath);
        this.updateMap().then(function () {
            _this.http.fetchOptimalFlightpath(flightpath).then(function (optimal) {
                console.log('Received optimal flightpath from server: ', optimal);
                _this.alertEvent.emit('Optimal flightplath successfully calculated.');
                _this.map.flightpath.setOptimalPath(optimal);
                _this.render();
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    DroneSimulatorService.prototype.duplicateMap = function () {
        var _this = this;
        console.log('Exporting map...');
        this.http.addMap(this.map.toJSON('Exported Map')).then(function () {
            _this.http.getAllMaps()
                .then(function (result) {
                _this.maps = result;
                _this.selectedMap = _this.maps.length - 1;
            })
                .catch(function (err) {
                console.log(err);
            });
        });
    };
    DroneSimulatorService.prototype.updateMap = function () {
        var _this = this;
        return new Promise((function (resolve, reject) {
            _this.http.updateMap(_this.map.toJSON(_this.map.name)).then(function () {
                _this.http.getAllMaps()
                    .then(function (result) {
                    _this.maps = result;
                    resolve();
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        }));
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DroneSimulatorService.prototype, "alertEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DroneSimulatorService.prototype, "onSimulatorLoadedEvent", void 0);
    DroneSimulatorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"], _http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"]])
    ], DroneSimulatorService);
    return DroneSimulatorService;
}());



/***/ }),

/***/ "./src/app/drone-simulator/utils/imageloader.js":
/*!******************************************************!*\
  !*** ./src/app/drone-simulator/utils/imageloader.js ***!
  \******************************************************/
/*! exports provided: ImageLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageLoader", function() { return ImageLoader; });
class ImageLoader {

  constructor() {
    this.images = ['drone', 'box', 'landing', 'takeoff'];
    this.loadedImages = {};
  }

  loadImages() {
    return new Promise((resolve, reject) => {
      let imagePromises = this.images.map((filename) => {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.src = 'assets/images/simulator/' + filename + '.png';
          img.addEventListener('load', () => {
            this.loadedImages[filename] = img;
            resolve(filename, img);
          });
          img.addEventListener('error', (error) => {
            reject(error);
          });
        });
      });
      Promise.all(imagePromises).then(() => {
        resolve();
      });
    });
  }
}


/***/ }),

/***/ "./src/app/drone-simulator/view/drone-simulator.component.css":
/*!********************************************************************!*\
  !*** ./src/app/drone-simulator/view/drone-simulator.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#canvas {\r\n  border: 3px solid black;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZHJvbmUtc2ltdWxhdG9yL3ZpZXcvZHJvbmUtc2ltdWxhdG9yLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx1QkFBdUI7QUFDekIiLCJmaWxlIjoic3JjL2FwcC9kcm9uZS1zaW11bGF0b3Ivdmlldy9kcm9uZS1zaW11bGF0b3IuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjYW52YXMge1xyXG4gIGJvcmRlcjogM3B4IHNvbGlkIGJsYWNrO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/drone-simulator/view/drone-simulator.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/drone-simulator/view/drone-simulator.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2>Drone Simulator</h2>\r\n<hr>\r\n<div>\r\n  <div *ngIf=\"simulator.initialized\" class=\"btn-toolbar mb-2 mb-md-2\" >\r\n    <div class=\"btn-group mr-2\">\r\n      <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" (click)=\"simulator.calculateOptimalFlightPath()\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\r\n             stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n             class=\"feather feather-loader\">\r\n          <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"6\"></line>\r\n          <line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"22\"></line>\r\n          <line x1=\"4.93\" y1=\"4.93\" x2=\"7.76\" y2=\"7.76\"></line>\r\n          <line x1=\"16.24\" y1=\"16.24\" x2=\"19.07\" y2=\"19.07\"></line>\r\n          <line x1=\"2\" y1=\"12\" x2=\"6\" y2=\"12\"></line>\r\n          <line x1=\"18\" y1=\"12\" x2=\"22\" y2=\"12\"></line>\r\n          <line x1=\"4.93\" y1=\"19.07\" x2=\"7.76\" y2=\"16.24\"></line>\r\n          <line x1=\"16.24\" y1=\"7.76\" x2=\"19.07\" y2=\"4.93\"></line>\r\n        </svg>\r\n        Calculate Optimal Flightpath\r\n      </button>\r\n    </div>\r\n    <div class=\"btn-group mr-2\">\r\n      <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" (click)=\"simulator.start()\" [disabled]=\"simulator.map.flightpath.optimalPath.length === 0\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\r\n             stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n             class=\"feather feather-play\">\r\n          <polygon points=\"5 3 19 12 5 21 5 3\"></polygon>\r\n        </svg>\r\n        Fly Drone\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" (click)=\"simulator.reset(); this.alerts = [];\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\r\n             stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n             class=\"feather feather-x\">\r\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/>\r\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/>\r\n        </svg>\r\n        Reset\r\n      </button>\r\n    </div>\r\n    <div class=\"btn-group\" ngbDropdown role=\"group\" aria-label=\"map-selection\" placement=\"bottom-right\">\r\n      <button *ngIf=\"simulator.loaded\" type=\"button\" class=\"btn btn-sm btn-outline-secondary dropdown-toggle\" ngbDropdownToggle>\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\r\n             stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n             class=\"feather feather-map\">\r\n          <polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/>\r\n          <line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/>\r\n          <line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/>\r\n        </svg>\r\n        {{simulator.maps[simulator.selectedMap].name}} - #{{simulator.maps[simulator.selectedMap]._id}}\r\n      </button>\r\n      <div class=\"dropdown-menu\" ngbDropdownMenu>\r\n        <button *ngFor=\"let map of simulator.maps; index as i\" class=\"dropdown-item\" (click)=\"simulator.selectMap(i)\">\r\n          {{map.name}} - #{{map._id}}\r\n        </button>\r\n      </div>\r\n      <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" (click)=\"simulator.updateMap()\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-save\"><path d=\"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z\"></path><polyline points=\"17 21 17 13 7 13 7 21\"></polyline><polyline points=\"7 3 7 8 15 8\"></polyline></svg>\r\n        Save\r\n      </button>\r\n    </div>\r\n\r\n\r\n  </div>\r\n  <canvas id=\"simulator\" width=\"800\" height=\"600\"></canvas>\r\n  <p>\r\n    mouseX: {{simulator.mouseX}}, mouseY: {{simulator.mouseY}}\r\n  </p>\r\n</div>\r\n\r\n<p *ngFor=\"let alert of alerts\">\r\n  <ngb-alert [type]=\"alert.type\" (close)=\"close(alert)\">{{ alert.message }}</ngb-alert>\r\n</p>\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/drone-simulator/view/drone-simulator.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/drone-simulator/view/drone-simulator.component.ts ***!
  \*******************************************************************/
/*! exports provided: DroneSimulatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DroneSimulatorComponent", function() { return DroneSimulatorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _presenter_drone_simulator_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presenter/drone-simulator.service */ "./src/app/drone-simulator/presenter/drone-simulator.service.ts");



var DroneSimulatorComponent = /** @class */ (function () {
    function DroneSimulatorComponent(simulator) {
        var _this = this;
        this.simulator = simulator;
        this.alerts = [];
        var i = 0;
        simulator.alertEvent.subscribe(function (alertMessage) {
            _this.alerts.push({
                id: i++,
                type: 'warning',
                message: alertMessage
            });
        });
    }
    DroneSimulatorComponent.prototype.close = function (alert) {
        for (var i = this.alerts.length - 1; i >= 0; i--) {
            if (this.alerts[i].id === alert.id) {
                this.alerts.splice(i, 1);
            }
        }
    };
    DroneSimulatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.simulator.initialized = false;
        if (this.simulator.loaded) {
            this.simulator.init();
        }
        else {
            this.simulator.onSimulatorLoadedEvent.subscribe(function (loaded) {
                if (loaded) {
                    _this.simulator.init();
                }
            });
        }
    };
    DroneSimulatorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-drone-simulator',
            template: __webpack_require__(/*! ./drone-simulator.component.html */ "./src/app/drone-simulator/view/drone-simulator.component.html"),
            styles: [__webpack_require__(/*! ./drone-simulator.component.css */ "./src/app/drone-simulator/view/drone-simulator.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_presenter_drone_simulator_service__WEBPACK_IMPORTED_MODULE_2__["DroneSimulatorService"]])
    ], DroneSimulatorComponent);
    return DroneSimulatorComponent;
}());



/***/ }),

/***/ "./src/app/flight-planner/flight-planner.component.css":
/*!*************************************************************!*\
  !*** ./src/app/flight-planner/flight-planner.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZsaWdodC1wbGFubmVyL2ZsaWdodC1wbGFubmVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/flight-planner/flight-planner.component.html":
/*!**************************************************************!*\
  !*** ./src/app/flight-planner/flight-planner.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom\">\r\n  <h1 class=\"h1\">Flight Planner</h1>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/flight-planner/flight-planner.component.ts":
/*!************************************************************!*\
  !*** ./src/app/flight-planner/flight-planner.component.ts ***!
  \************************************************************/
/*! exports provided: FlightPlannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlightPlannerComponent", function() { return FlightPlannerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared.service */ "./src/app/shared.service.ts");



var FlightPlannerComponent = /** @class */ (function () {
    function FlightPlannerComponent(sharedService) {
        this.sharedService = sharedService;
        sharedService.onNavigateEvent.emit('flight-planner');
    }
    FlightPlannerComponent.prototype.ngOnInit = function () {
    };
    FlightPlannerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-flight-planner',
            template: __webpack_require__(/*! ./flight-planner.component.html */ "./src/app/flight-planner/flight-planner.component.html"),
            styles: [__webpack_require__(/*! ./flight-planner.component.css */ "./src/app/flight-planner/flight-planner.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_service__WEBPACK_IMPORTED_MODULE_2__["SharedService"]])
    ], FlightPlannerComponent);
    return FlightPlannerComponent;
}());



/***/ }),

/***/ "./src/app/http.service.ts":
/*!*********************************!*\
  !*** ./src/app/http.service.ts ***!
  \*********************************/
/*! exports provided: HttpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return HttpService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");




var HttpService = /** @class */ (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.getAllMaps = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseAPIUrl + 'api/maps').subscribe(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HttpService.prototype.getMap = function (mapId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseAPIUrl + 'api/maps/' + mapId).subscribe(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HttpService.prototype.addMap = function (map) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseAPIUrl + 'api/maps/', map).subscribe(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HttpService.prototype.updateMap = function (map) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(map);
            _this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseAPIUrl + 'api/maps/' + map._id, map).subscribe(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HttpService.prototype.fetchOptimalFlightpath = function (flightpath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseAPIUrl + 'api/flightpath/', flightpath).subscribe(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HttpService.prototype.getAllProducts = function (mapId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseAPIUrl + 'api/maps/' + mapId + '/products/').subscribe(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HttpService.prototype.deleteProduct = function (mapId, productId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseAPIUrl + 'api/maps/' + mapId + '/products/' + productId).subscribe(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HttpService.prototype.addProduct = function (mapId, product) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseAPIUrl + 'api/maps/' + mapId + '/products/', product).subscribe(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    HttpService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], HttpService);
    return HttpService;
}());



/***/ }),

/***/ "./src/app/inventory/inventory.component.css":
/*!***************************************************!*\
  !*** ./src/app/inventory/inventory.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ludmVudG9yeS9pbnZlbnRvcnkuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/inventory/inventory.component.html":
/*!****************************************************!*\
  !*** ./src/app/inventory/inventory.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom\">\r\n  <h1>Inventory</h1>\r\n</div>\r\n<div *ngIf=\"simulator.loaded\">\r\n  <h2>Add products</h2>\r\n  <form #productForm=\"ngForm\" (ngSubmit)=\"onSubmit(productForm.form);\">\r\n    <div class=\"form-group\">\r\n      <label for=\"name\">Name</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" #nameField=\"ngModel\" ngModel required>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"quantity\">Quantity</label>\r\n      <input id=\"quantity\" type=\"number\" min=\"0\" class=\"form-control\" name=\"quantity\" #quantityField=\"ngModel\" ngModel required>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"x\">X</label>\r\n      <input id=\"x\" type=\"number\" min=\"0\" class=\"form-control\" name=\"x\" #xField=\"ngModel\" ngModel required>\r\n      <label for=\"y\">Y</label>\r\n      <input id=\"y\" type=\"number\" min=\"0\" class=\"form-control\" name=\"y\" #yField=\"ngModel\" ngModel required>\r\n    </div>\r\n    <div class=\"form-group\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"mapId\">MapId</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"mapId\" name=\"mapId\" #mapField=\"ngModel\" ngModel [(ngModel)]=\"simulator.maps[simulator.selectedMap]._id\" required readonly>\r\n    </div>\r\n    <div style=\"text-align:right; width:100%; padding:0;\">\r\n      <button class=\"btn btn-success\" type=\"submit\">Submit</button>\r\n    </div>\r\n  </form>\r\n  <hr>\r\n  <div>\r\n    <h2>Products in {{simulator.maps[simulator.selectedMap].name}}</h2>\r\n    <table class=\"table table-striped\">\r\n      <thead>\r\n      <tr>\r\n        <th scope=\"col\">#</th>\r\n        <th scope=\"col\">Name</th>\r\n        <th scope=\"col\">Quantity</th>\r\n        <th scope=\"col\">X</th>\r\n        <th scope=\"col\">Y</th>\r\n        <th scope=\"col\"></th>\r\n      </tr>\r\n      </thead>\r\n      <tbody>\r\n      <tr *ngFor=\"let product of products; index as i\">\r\n        <th scope=\"row\">{{ i + 1 }}</th>\r\n        <td>{{product.name}}</td>\r\n        <td>{{product.quantity}}</td>\r\n        <td>{{product.position.x}}</td>\r\n        <td>{{product.position.y}}</td>\r\n        <td>\r\n          <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteProduct(product._id)\">X</button>\r\n        </td>\r\n      </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/inventory/inventory.component.ts":
/*!**************************************************!*\
  !*** ./src/app/inventory/inventory.component.ts ***!
  \**************************************************/
/*! exports provided: InventoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventoryComponent", function() { return InventoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared.service */ "./src/app/shared.service.ts");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../http.service */ "./src/app/http.service.ts");
/* harmony import */ var _drone_simulator_presenter_drone_simulator_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../drone-simulator/presenter/drone-simulator.service */ "./src/app/drone-simulator/presenter/drone-simulator.service.ts");





var InventoryComponent = /** @class */ (function () {
    function InventoryComponent(sharedService, http, simulator) {
        this.sharedService = sharedService;
        this.http = http;
        this.simulator = simulator;
        sharedService.onNavigateEvent.emit('inventory');
    }
    InventoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.simulator.loaded) {
            this.loadProducts();
        }
        else {
            this.simulator.onSimulatorLoadedEvent.subscribe(function (loaded) {
                if (loaded) {
                    _this.loadProducts();
                }
            });
        }
    };
    InventoryComponent.prototype.loadProducts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mapId = _this.simulator.maps[_this.simulator.selectedMap]._id;
            _this.http.getAllProducts(mapId)
                .then(function (res) {
                _this.products = res;
                resolve();
            })
                .catch(function (err) {
                console.log(err);
                reject(err);
            });
        });
    };
    InventoryComponent.prototype.deleteProduct = function (productId) {
        var _this = this;
        var mapId = this.simulator.maps[this.simulator.selectedMap]._id;
        this.http.deleteProduct(mapId, productId)
            .then(function (res) {
            _this.loadProducts()
                .then(function () {
                _this.http.getAllMaps()
                    .then(function (result) {
                    _this.simulator.maps = result;
                })
                    .catch(function (err) {
                    console.log(err);
                });
            })
                .catch(function (err) {
                console.log(err);
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    InventoryComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var mapId = this.simulator.maps[this.simulator.selectedMap]._id;
        var mapData = form.value;
        mapData.position = { x: form.value.x, y: form.value.y };
        this.http.addProduct(mapId, mapData)
            .then(function (res) {
            _this.loadProducts()
                .then(function () {
                _this.http.getAllMaps()
                    .then(function (result) {
                    _this.simulator.maps = result;
                })
                    .catch(function (err) {
                    console.log(err);
                });
            })
                .catch(function (err) {
                console.log(err);
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    InventoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-inventory',
            template: __webpack_require__(/*! ./inventory.component.html */ "./src/app/inventory/inventory.component.html"),
            styles: [__webpack_require__(/*! ./inventory.component.css */ "./src/app/inventory/inventory.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_service__WEBPACK_IMPORTED_MODULE_2__["SharedService"], _http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"], _drone_simulator_presenter_drone_simulator_service__WEBPACK_IMPORTED_MODULE_4__["DroneSimulatorService"]])
    ], InventoryComponent);
    return InventoryComponent;
}());



/***/ }),

/***/ "./src/app/map-editor/map-editor.component.css":
/*!*****************************************************!*\
  !*** ./src/app/map-editor/map-editor.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hcC1lZGl0b3IvbWFwLWVkaXRvci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/map-editor/map-editor.component.html":
/*!******************************************************!*\
  !*** ./src/app/map-editor/map-editor.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom\">\r\n  <h1>Map Editor</h1>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/map-editor/map-editor.component.ts":
/*!****************************************************!*\
  !*** ./src/app/map-editor/map-editor.component.ts ***!
  \****************************************************/
/*! exports provided: MapEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapEditorComponent", function() { return MapEditorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared.service */ "./src/app/shared.service.ts");



var MapEditorComponent = /** @class */ (function () {
    function MapEditorComponent(sharedService) {
        this.sharedService = sharedService;
        sharedService.onNavigateEvent.emit('map-editor');
    }
    MapEditorComponent.prototype.ngOnInit = function () {
    };
    MapEditorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-map-editor',
            template: __webpack_require__(/*! ./map-editor.component.html */ "./src/app/map-editor/map-editor.component.html"),
            styles: [__webpack_require__(/*! ./map-editor.component.css */ "./src/app/map-editor/map-editor.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_service__WEBPACK_IMPORTED_MODULE_2__["SharedService"]])
    ], MapEditorComponent);
    return MapEditorComponent;
}());



/***/ }),

/***/ "./src/app/shared.service.ts":
/*!***********************************!*\
  !*** ./src/app/shared.service.ts ***!
  \***********************************/
/*! exports provided: SharedService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedService", function() { return SharedService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SharedService = /** @class */ (function () {
    function SharedService() {
        this.onNavigateEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SharedService.prototype, "onNavigateEvent", void 0);
    SharedService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SharedService);
    return SharedService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    baseAPIUrl: 'http://localhost:3000/'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\woute\Dropbox\School\3de Bachelor\Semester 2\Bachelorproef\Git\drone1\project\web-ui\drone-control-center\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map