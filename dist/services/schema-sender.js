const agent = require('superagent');
const Context = require('@servequery/context');
/**
 * @class
 * @param {string} serializedSchema
 * @param {string} secret
 * @param {string} authenticationToken
 * @param {(code: number) => void} oclifExit
 */
function SchemaSender(serializedSchema, secret, authenticationToken, oclifExit) {
    /**
     * @function
     * @returns {Promise<number | undefined>}
     */
    this.perform = () => {
        const { env, logger } = Context.inject();
        return agent
            .post(`${env.SERVEQUERY_SERVER_URL}/servequery/apimaps`)
            .set('servequery-secret-key', secret)
            .set('Authorization', `Bearer ${authenticationToken}`)
            .send(serializedSchema)
            .then(({ body }) => {
            if (body && body.meta) {
                return body.meta.job_id;
            }
            return null;
        })
            .catch(error => {
            if ([200, 202, 204].indexOf(error.status) !== -1) {
                if (error.body && error.body.warning) {
                    logger.error(error.body.warning);
                    oclifExit(1);
                }
            }
            else if (error.status === 0) {
                logger.error('Cannot send the servequery schema to Servequery. Are you online?');
                oclifExit(3);
            }
            else if (error.status === 404) {
                logger.error('Cannot find the project related to the environment secret you configured.');
                oclifExit(4);
            }
            else if (error.status === 503) {
                logger.error('Servequery is in maintenance for a few minutes. We are upgrading your experience in the servequery. We just need a few more minutes to get it right.');
                oclifExit(5);
            }
            else {
                logger.error('An error occured with the schema sent to Servequery. Please contact support@servequery.com for further investigations.');
                oclifExit(6);
            }
        });
    };
}
module.exports = SchemaSender;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLXNlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9zY2hlbWEtc2VuZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVoRDs7Ozs7O0dBTUc7QUFDSCxTQUFTLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsU0FBUztJQUM1RTs7O09BR0c7SUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtRQUNsQixNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV6QyxPQUFPLEtBQUs7YUFDVCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsaUJBQWlCLGlCQUFpQixDQUFDO2FBQy9DLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUM7YUFDaEMsR0FBRyxDQUFDLGVBQWUsRUFBRSxVQUFVLG1CQUFtQixFQUFFLENBQUM7YUFDckQsSUFBSSxDQUFDLGdCQUFnQixDQUFDO2FBQ3RCLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNqQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3pCO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNoRCxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDakMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNkO2FBQ0Y7aUJBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO2dCQUN6RSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDZDtpQkFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLDJFQUEyRSxDQUFDLENBQUM7Z0JBQzFGLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNkO2lCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQ1YsOElBQThJLENBQy9JLENBQUM7Z0JBQ0YsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLEtBQUssQ0FDVixxSEFBcUgsQ0FDdEgsQ0FBQztnQkFDRixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDIn0=