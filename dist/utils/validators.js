"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDbName = exports.validateAppHostname = exports.validatePort = void 0;
function validatePort(port) {
    if (!/^\d+$/.test(port)) {
        return 'The port must be a number.';
    }
    const parsedPort = parseInt(port, 10);
    if (parsedPort > 0 && parsedPort < 65536) {
        return true;
    }
    return 'This is not a valid port.';
}
exports.validatePort = validatePort;
function validateAppHostname(hostname) {
    if (hostname) {
        return true;
    }
    return 'Please specify the application hostname.';
}
exports.validateAppHostname = validateAppHostname;
function validateDbName(dbName) {
    if (dbName) {
        return true;
    }
    return 'Please specify the database name.';
}
exports.validateDbName = validateDbName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy92YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFlBQVksQ0FBQyxJQUFZO0lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZCLE9BQU8sNEJBQTRCLENBQUM7S0FDckM7SUFFRCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLElBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxVQUFVLEdBQUcsS0FBSyxFQUFFO1FBQ3hDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLDJCQUEyQixDQUFDO0FBQ3JDLENBQUM7QUFWRCxvQ0FVQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLFFBQWdCO0lBQ2xELElBQUksUUFBUSxFQUFFO1FBQ1osT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sMENBQTBDLENBQUM7QUFDcEQsQ0FBQztBQUxELGtEQUtDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLE1BQWM7SUFDM0MsSUFBSSxNQUFNLEVBQUU7UUFDVixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxtQ0FBbUMsQ0FBQztBQUM3QyxDQUFDO0FBTEQsd0NBS0MifQ==