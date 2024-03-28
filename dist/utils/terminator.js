/**
 * @typedef {{
 *  errorCode: string;
 *  errorMessage: string;
 *  context: any;
 * }} DetailedLog
 *
 * @typedef {{
 *  logs: string[]
 * }} MultipleMessages
 */
module.exports = ({ assertPresent, eventSender, exitProcess, logger }) => {
    assertPresent({ eventSender, exitProcess, logger });
    return {
        /**
         * @param {number} status
         * @param {DetailedLog | MultipleMessages | DetailedLog & MultipleMessages} log
         */
        async terminate(status, { errorCode, errorMessage, logs, context }) {
            if (logs.length) {
                logger.error(...logs);
            }
            if (errorCode) {
                await eventSender.notifyError(errorCode, errorMessage, context);
            }
            else {
                await eventSender.notifyError();
            }
            return exitProcess(status);
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90ZXJtaW5hdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ3ZFLGFBQWEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUVwRCxPQUFPO1FBQ0w7OztXQUdHO1FBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDaEUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUN2QjtZQUVELElBQUksU0FBUyxFQUFFO2dCQUNiLE1BQU0sV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2dCQUNMLE1BQU0sV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2pDO1lBRUQsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDLENBQUMifQ==