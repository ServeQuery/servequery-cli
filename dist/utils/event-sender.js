class EventSender {
    constructor({ assertPresent, env, superagent }) {
        assertPresent({ env, superagent });
        this.env = env;
        this.superagent = superagent;
        this.applicationName = null;
        this.command = null;
        this.meta = null;
        this.sessionToken = null;
    }
    async notifyError(code = 'unknown_error', message = null, context = undefined) {
        if (!this.applicationName || !this.command) {
            return;
        }
        const attributes = {
            code,
            message,
            project_name: this.applicationName,
            command: this.command,
            context,
        };
        if (this.command !== 'schema:update') {
            attributes.project_id = this.meta.projectId || null;
            attributes.db_dialect = this.meta.dbDialect;
            attributes.agent = this.meta.agent;
            attributes.is_local = this.meta.isLocal;
        }
        try {
            if (this.sessionToken) {
                await this.superagent
                    .post(`${this.env.SERVEQUERY_SERVER_URL}/api/lumber/error`, {
                    data: {
                        type: 'events',
                        attributes,
                    },
                })
                    .set('Authorization', `Bearer ${this.sessionToken}`);
            }
            else {
                await this.superagent.post(`${this.env.SERVEQUERY_SERVER_URL}/api/lumber/error`, {
                    data: {
                        type: 'events',
                        attributes,
                    },
                });
            }
        }
        catch (e) {
            // NOTICE: We want silent error because this is just for reporting error
            //         and not not blocking if that does not work.
        }
    }
    async notifySuccess() {
        if (!this.applicationName ||
            !this.command ||
            !this.sessionToken ||
            !Object.keys(this.meta).length) {
            return;
        }
        try {
            await this.superagent
                .post(`${this.env.SERVEQUERY_SERVER_URL}/api/lumber/success`, {
                data: {
                    type: 'events',
                    attributes: {
                        command: this.command,
                        project_id: this.meta.projectId,
                        project_name: this.applicationName,
                        db_dialect: this.meta.dbDialect,
                        agent: this.meta.agent,
                        is_local: this.meta.isLocal,
                    },
                },
            })
                .set('Authorization', `Bearer ${this.sessionToken}`);
        }
        catch (e) {
            // NOTICE: We want silent error because this is just for reporting error
            //         and not not blocking if that does not work.
        }
    }
}
module.exports = EventSender;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtc2VuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2V2ZW50LXNlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFdBQVc7SUFDZixZQUFZLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7UUFDNUMsYUFBYSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUU3QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsZUFBZSxFQUFFLE9BQU8sR0FBRyxJQUFJLEVBQUUsT0FBTyxHQUFHLFNBQVM7UUFDM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzFDLE9BQU87U0FDUjtRQUVELE1BQU0sVUFBVSxHQUFHO1lBQ2pCLElBQUk7WUFDSixPQUFPO1lBQ1AsWUFBWSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ2xDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixPQUFPO1NBQ1IsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxlQUFlLEVBQUU7WUFDcEMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7WUFDcEQsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM1QyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDekM7UUFFRCxJQUFJO1lBQ0YsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixNQUFNLElBQUksQ0FBQyxVQUFVO3FCQUNsQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixtQkFBbUIsRUFBRTtvQkFDdEQsSUFBSSxFQUFFO3dCQUNKLElBQUksRUFBRSxRQUFRO3dCQUNkLFVBQVU7cUJBQ1g7aUJBQ0YsQ0FBQztxQkFDRCxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDeEQ7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLG1CQUFtQixFQUFFO29CQUMzRSxJQUFJLEVBQUU7d0JBQ0osSUFBSSxFQUFFLFFBQVE7d0JBQ2QsVUFBVTtxQkFDWDtpQkFDRixDQUFDLENBQUM7YUFDSjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVix3RUFBd0U7WUFDeEUsc0RBQXNEO1NBQ3ZEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhO1FBQ2pCLElBQ0UsQ0FBQyxJQUFJLENBQUMsZUFBZTtZQUNyQixDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ2IsQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUNsQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFDOUI7WUFDQSxPQUFPO1NBQ1I7UUFFRCxJQUFJO1lBQ0YsTUFBTSxJQUFJLENBQUMsVUFBVTtpQkFDbEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIscUJBQXFCLEVBQUU7Z0JBQ3hELElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO3dCQUNyQixVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO3dCQUMvQixZQUFZLEVBQUUsSUFBSSxDQUFDLGVBQWU7d0JBQ2xDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7d0JBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7d0JBQ3RCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87cUJBQzVCO2lCQUNGO2FBQ0YsQ0FBQztpQkFDRCxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDeEQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLHdFQUF3RTtZQUN4RSxzREFBc0Q7U0FDdkQ7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyJ9