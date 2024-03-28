"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
function and(value1, value2) {
    return Boolean(value1 && value2);
}
handlebars_1.default.registerHelper('and', and);
exports.default = and;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2hhbmRsZWJhcnMvaGVscGVycy9hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBb0M7QUFFcEMsU0FBUyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU07SUFDekIsT0FBTyxPQUFPLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCxvQkFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFFdEMsa0JBQWUsR0FBRyxDQUFDIn0=