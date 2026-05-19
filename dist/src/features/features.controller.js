"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../common/guards/jwt.guard");
const plan_guard_1 = require("../common/guards/plan.guard");
const features_service_1 = require("./features.service");
let FeaturesController = class FeaturesController {
    featuresService;
    constructor(featuresService) {
        this.featuresService = featuresService;
    }
    feature1(req) {
        return this.featuresService.getFeature1(req.user.userId);
    }
    feature2(req) {
        return this.featuresService.getFeature2(req.user.userId);
    }
    feature3(req) {
        return this.featuresService.getFeature3(req.user.userId);
    }
};
exports.FeaturesController = FeaturesController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, new plan_guard_1.PlanGuard('BASIC')),
    (0, common_1.Get)('feature1'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FeaturesController.prototype, "feature1", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, new plan_guard_1.PlanGuard('STANDARD')),
    (0, common_1.Get)('feature2'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FeaturesController.prototype, "feature2", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, new plan_guard_1.PlanGuard('PREMIUM')),
    (0, common_1.Get)('feature3'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FeaturesController.prototype, "feature3", null);
exports.FeaturesController = FeaturesController = __decorate([
    (0, common_1.Controller)('features'),
    __metadata("design:paramtypes", [features_service_1.FeaturesService])
], FeaturesController);
//# sourceMappingURL=features.controller.js.map