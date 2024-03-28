"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
function wrapSpecialCharacters(value) {
    return /\s|-|@|\*|^(\d)|:/.test(value) ? `'${value}'` : value;
}
handlebars_1.default.registerHelper('wsc', wrapSpecialCharacters);
exports.default = wrapSpecialCharacters;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcC1zcGVjaWFsLWNoYXJhY3RlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvaGFuZGxlYmFycy9oZWxwZXJzL3dyYXAtc3BlY2lhbC1jaGFyYWN0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW9DO0FBRXBDLFNBQVMscUJBQXFCLENBQUMsS0FBSztJQUNsQyxPQUFPLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2hFLENBQUM7QUFFRCxvQkFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUscUJBQXFCLENBQUMsQ0FBQztBQUV4RCxrQkFBZSxxQkFBcUIsQ0FBQyJ9