"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Strings {
    constructor({ assertPresent, lodash }) {
        this.RESERVED_WORDS = [
            'abstract',
            'await',
            'boolean',
            'break',
            'byte',
            'case',
            'catch',
            'char',
            'class',
            'const',
            'continue',
            'debugger',
            'default',
            'delete',
            'do',
            'double',
            'else',
            'enum',
            'export',
            'extends',
            'false',
            'final',
            'finally',
            'float',
            'for',
            'function',
            'goto',
            'if',
            'implements',
            'import',
            'in',
            'instanceof',
            'int',
            'interface',
            'let',
            'long',
            'module',
            'native',
            'new',
            'null',
            'package',
            'private',
            'protected',
            'public',
            'return',
            'short',
            'static',
            'super',
            'switch',
            'synchronized',
            'this',
            'throw',
            'throws',
            'transient',
            'true',
            'try',
            'typeof',
            'undefined',
            'var',
            'void',
            'volatile',
            'while',
            'with',
            'yield',
        ];
        assertPresent({ lodash });
        this.lodash = lodash;
    }
    isReservedWord(input) {
        return this.RESERVED_WORDS.includes(this.lodash.toLower(input));
    }
    pascalCase(input) {
        return this.lodash.chain(input).camelCase().upperFirst().value();
    }
    transformToSafeString(input) {
        if (/^[\d]/g.exec(input)) {
            return `model${input}`;
        }
        // NOTICE: add dash to get proper snake/pascal case
        if (this.isReservedWord(input)) {
            return `model${this.lodash.upperFirst(input)}`;
        }
        return input;
    }
    transformToCamelCaseSafeString(input) {
        return this.lodash.camelCase(this.transformToSafeString(input));
    }
}
exports.default = Strings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zdHJpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBcUIsT0FBTztJQXNFMUIsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUU7UUFyRXBCLG1CQUFjLEdBQUc7WUFDaEMsVUFBVTtZQUNWLE9BQU87WUFDUCxTQUFTO1lBQ1QsT0FBTztZQUNQLE1BQU07WUFDTixNQUFNO1lBQ04sT0FBTztZQUNQLE1BQU07WUFDTixPQUFPO1lBQ1AsT0FBTztZQUNQLFVBQVU7WUFDVixVQUFVO1lBQ1YsU0FBUztZQUNULFFBQVE7WUFDUixJQUFJO1lBQ0osUUFBUTtZQUNSLE1BQU07WUFDTixNQUFNO1lBQ04sUUFBUTtZQUNSLFNBQVM7WUFDVCxPQUFPO1lBQ1AsT0FBTztZQUNQLFNBQVM7WUFDVCxPQUFPO1lBQ1AsS0FBSztZQUNMLFVBQVU7WUFDVixNQUFNO1lBQ04sSUFBSTtZQUNKLFlBQVk7WUFDWixRQUFRO1lBQ1IsSUFBSTtZQUNKLFlBQVk7WUFDWixLQUFLO1lBQ0wsV0FBVztZQUNYLEtBQUs7WUFDTCxNQUFNO1lBQ04sUUFBUTtZQUNSLFFBQVE7WUFDUixLQUFLO1lBQ0wsTUFBTTtZQUNOLFNBQVM7WUFDVCxTQUFTO1lBQ1QsV0FBVztZQUNYLFFBQVE7WUFDUixRQUFRO1lBQ1IsT0FBTztZQUNQLFFBQVE7WUFDUixPQUFPO1lBQ1AsUUFBUTtZQUNSLGNBQWM7WUFDZCxNQUFNO1lBQ04sT0FBTztZQUNQLFFBQVE7WUFDUixXQUFXO1lBQ1gsTUFBTTtZQUNOLEtBQUs7WUFDTCxRQUFRO1lBQ1IsV0FBVztZQUNYLEtBQUs7WUFDTCxNQUFNO1lBQ04sVUFBVTtZQUNWLE9BQU87WUFDUCxNQUFNO1lBQ04sT0FBTztTQUNSLENBQUM7UUFLQSxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxjQUFjLENBQUMsS0FBSztRQUMxQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuRSxDQUFDO0lBRUQscUJBQXFCLENBQUMsS0FBSztRQUN6QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxRQUFRLEtBQUssRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsbURBQW1EO1FBQ25ELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM5QixPQUFPLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNoRDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELDhCQUE4QixDQUFDLEtBQUs7UUFDbEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0NBQ0Y7QUFuR0QsMEJBbUdDIn0=