const fs = require('fs');
const path = require('path');
function DirectoryExistenceChecker(directory, basePath = undefined) {
    this.perform = () => {
        let directoryToCheck = directory;
        if (basePath)
            directoryToCheck = path.resolve(basePath, directory);
        try {
            fs.accessSync(directoryToCheck, fs.F_OK);
            return true;
        }
        catch (error) {
            return false;
        }
    };
}
module.exports = DirectoryExistenceChecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0b3J5LWV4aXN0ZW5jZS1jaGVja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2RpcmVjdG9yeS1leGlzdGVuY2UtY2hlY2tlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdCLFNBQVMseUJBQXlCLENBQUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxTQUFTO0lBQ2hFLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ2xCLElBQUksZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO1FBQ2pDLElBQUksUUFBUTtZQUFFLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25FLElBQUk7WUFDRixFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUMifQ==