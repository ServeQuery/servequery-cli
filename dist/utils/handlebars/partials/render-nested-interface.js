const Handlebars = require('handlebars');
Handlebars.registerPartial('renderNestedInterface', `
{{~#if (isArray type)}}
Array<{{>renderNestedInterface type=type.[0] level=level}}>
{{~else if (isObject type)}}
{
{{#each type}}
{{#if (and (eq @key '_id') (eq this false))}}
{{else}}
{{indent (sum ../level 1) (wsc @key)}}: {{>renderNestedInterface type=this level=(sum ../level 1)}};
{{/if}}
{{/each}}
{{indent level '}'}}
{{else}}
{{toInterfaceType type}}
{{~/if}}
`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW5lc3RlZC1pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvaGFuZGxlYmFycy9wYXJ0aWFscy9yZW5kZXItbmVzdGVkLWludGVyZmFjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFekMsVUFBVSxDQUFDLGVBQWUsQ0FDeEIsdUJBQXVCLEVBRXZCOzs7Ozs7Ozs7Ozs7Ozs7Q0FlRCxDQUNBLENBQUMifQ==