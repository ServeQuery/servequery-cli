const path = require('path');
const Context = require('@servequery/context');
const staticPlan = plan => plan.addModule('path', path);
let staticContext;
const init = () => {
    if (!staticContext) {
        staticContext = Context.execute(staticPlan);
    }
    return staticContext;
};
module.exports = {
    init,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRleHQvc3RhdGljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVoRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXhELElBQUksYUFBYSxDQUFDO0FBRWxCLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtJQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2xCLGFBQWEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzdDO0lBQ0QsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLElBQUk7Q0FDTCxDQUFDIn0=