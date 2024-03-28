"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Handlebars = __importStar(require("handlebars"));
const toInterfaceType = type => {
    switch (type) {
        case 'String':
            return 'string';
        case 'Number':
            return 'number';
        case 'Boolean':
            return 'boolean';
        case 'Date':
            return 'Date';
        case 'Mongoose.Schema.Types.ObjectId':
        case 'ambiguous':
            return 'Mongoose.Types.ObjectId';
        case '[Mongoose.Schema.Types.ObjectId]':
            return 'Array<Mongoose.Types.ObjectId>';
        default:
            return 'object';
    }
};
Handlebars.registerHelper('toInterfaceType', toInterfaceType);
exports.default = toInterfaceType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8taW50ZXJmYWNlLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvaGFuZGxlYmFycy9oZWxwZXJzL3RvLWludGVyZmFjZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBeUM7QUFFekMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEVBQUU7SUFDN0IsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLFFBQVE7WUFDWCxPQUFPLFFBQVEsQ0FBQztRQUNsQixLQUFLLFFBQVE7WUFDWCxPQUFPLFFBQVEsQ0FBQztRQUNsQixLQUFLLFNBQVM7WUFDWixPQUFPLFNBQVMsQ0FBQztRQUNuQixLQUFLLE1BQU07WUFDVCxPQUFPLE1BQU0sQ0FBQztRQUNoQixLQUFLLGdDQUFnQyxDQUFDO1FBQ3RDLEtBQUssV0FBVztZQUNkLE9BQU8seUJBQXlCLENBQUM7UUFDbkMsS0FBSyxrQ0FBa0M7WUFDckMsT0FBTyxnQ0FBZ0MsQ0FBQztRQUMxQztZQUNFLE9BQU8sUUFBUSxDQUFDO0tBQ25CO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsVUFBVSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUU5RCxrQkFBZSxlQUFlLENBQUMifQ==