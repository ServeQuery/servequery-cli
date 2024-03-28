const agent = require('superagent');
const ProgressBar = require('progress');
const { promisify } = require('util');
const Context = require('@servequery/context');
const jobDeserializer = require('../deserializers/job');
const setTimeoutAsync = promisify(setTimeout);
function JobStateChecker(message, oclifExit) {
    const { assertPresent, authenticator, env, logger } = Context.inject();
    assertPresent({ authenticator, env, logger });
    const bar = new ProgressBar(`${message} [:bar] :percent `, { total: 100 });
    bar.update(0);
    this.check = async (jobId) => {
        try {
            const jobResponse = await agent
                .get(`${env.SERVEQUERY_SERVER_URL}/api/jobs/${jobId}`)
                .set('Authorization', `Bearer ${authenticator.getAuthToken()}`)
                .then(response => jobDeserializer.deserialize(response.body));
            if (jobResponse && jobResponse.state) {
                let isBarComplete = false;
                if (jobResponse.progress) {
                    bar.update(jobResponse.progress / 100);
                    isBarComplete = bar.complete;
                }
                if (jobResponse.state !== 'inactive' && jobResponse.state !== 'active') {
                    if (jobResponse.state === 'complete' && !isBarComplete) {
                        bar.update(1);
                    }
                    return jobResponse.state !== 'failed';
                }
            }
        }
        catch (error) {
            if (!error.status) {
                throw error;
            }
            logger.error(`HTTP ${error.status}: ${error.message}`);
            oclifExit(100);
        }
        await setTimeoutAsync(1000);
        return this.check(jobId);
    };
}
module.exports = JobStateChecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9iLXN0YXRlLWNoZWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvam9iLXN0YXRlLWNoZWNrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4QyxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRWhELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRXhELE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUU5QyxTQUFTLGVBQWUsQ0FBQyxPQUFPLEVBQUUsU0FBUztJQUN6QyxNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZFLGFBQWEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUU5QyxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFHLE9BQU8sbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUMsS0FBSyxFQUFDLEVBQUU7UUFDekIsSUFBSTtZQUNGLE1BQU0sV0FBVyxHQUFHLE1BQU0sS0FBSztpQkFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixhQUFhLEtBQUssRUFBRSxDQUFDO2lCQUNqRCxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsYUFBYSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7aUJBQzlELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFaEUsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtnQkFDcEMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7b0JBQ3hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDdkMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7aUJBQzlCO2dCQUNELElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxVQUFVLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7b0JBQ3RFLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxVQUFVLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2Y7b0JBQ0QsT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQztpQkFDdkM7YUFDRjtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDakIsTUFBTSxLQUFLLENBQUM7YUFDYjtZQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQjtRQUVELE1BQU0sZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMifQ==