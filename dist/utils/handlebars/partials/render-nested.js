const Handlebars = require('handlebars');
Handlebars.registerPartial('renderNested', `
{{~#if (isArray type)}}
[{{>renderNested type=type.[0] level=level}}]
{{~else if (isObject type)}}
{
{{#each type}}
{{#if (eq @key '_id')}}
{{#if (eq this 'ambiguous')}}
{{indent (sum ../level 1) '//'}} {{@key}}: false, Ambiguous usage of _ids, we could not detect if subDocuments use _id or not.
{{else if (eq this false)}}
{{indent (sum ../level 1) @key}}: {{this}},
{{/if}}
{{else}}
{{indent (sum ../level 1) (wsc @key)}}: {{>renderNested type=this level=(sum ../level 1)}},
{{/if}}
{{/each}}
{{indent level '}'}}
{{else}}
{{type}}
{{~/if}}
`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW5lc3RlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlscy9oYW5kbGViYXJzL3BhcnRpYWxzL3JlbmRlci1uZXN0ZWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXpDLFVBQVUsQ0FBQyxlQUFlLENBQ3hCLGNBQWMsRUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvQkQsQ0FDQSxDQUFDIn0=