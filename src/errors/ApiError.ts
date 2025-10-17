export class ApiError extends Error {
public readonly status: number;
public readonly isOperational: boolean;


constructor(message: string, status = 500, isOperational = true) {
super(message);
this.status = status;
this.isOperational = isOperational;
Object.setPrototypeOf(this, new.target.prototype);
Error.captureStackTrace(this);
}
}


export class NotFoundError extends ApiError {
constructor(message = 'Not found') {
super(message, 404);
}
}


export class BadRequestError extends ApiError {
constructor(message = 'Bad request') {
super(message, 400);
}
}