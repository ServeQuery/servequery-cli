class ApplicationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ApplicationError';
        Error.captureStackTrace(this, ApplicationError);
    }
}
module.exports = ApplicationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24tZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXJyb3JzL2FwcGxpY2F0aW9uLWVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sZ0JBQWlCLFNBQVEsS0FBSztJQUNsQyxZQUFZLE9BQU87UUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQztRQUMvQixLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyJ9