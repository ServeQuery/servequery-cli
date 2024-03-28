const validate = require('validate-npm-package-name');
module.exports = function toValidPackageName(packageName) {
    function isValid(name) {
        const { validForNewPackages } = validate(name);
        return validForNewPackages;
    }
    if (!isValid(packageName)) {
        // NOTICE: Create an always valid package name (disallow almost everything)
        const validPackageName = packageName
            .toLowerCase()
            // Remove all non "a-z", "0-9", "-" characters with hyphen.
            .replace(/[^a-z0-9\\-]/g, '-')
            // Remove hyphen sequence (> 1).
            .replace(/-{2,}/g, '-')
            // Remove leading and trailing hyphen.
            .replace(/^-|-$/g, '');
        // NOTICE: Return 'servequery-cli-project' if sanitized package name is still not valid.
        return isValid(validPackageName) ? validPackageName : 'servequery-cli-project';
    }
    return packageName;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tdmFsaWQtcGFja2FnZS1uYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3RvLXZhbGlkLXBhY2thZ2UtbmFtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV0RCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsa0JBQWtCLENBQUMsV0FBVztJQUN0RCxTQUFTLE9BQU8sQ0FBQyxJQUFJO1FBQ25CLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3pCLDJFQUEyRTtRQUMzRSxNQUFNLGdCQUFnQixHQUFHLFdBQVc7YUFDakMsV0FBVyxFQUFFO1lBQ2QsMkRBQTJEO2FBQzFELE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDO1lBQzlCLGdDQUFnQzthQUMvQixPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQztZQUN2QixzQ0FBc0M7YUFDckMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV6QixvRkFBb0Y7UUFDcEYsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0tBQzVFO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyxDQUFDIn0=