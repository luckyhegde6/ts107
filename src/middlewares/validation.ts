import { z, ZodSchema } from 'zod';
import { RequestHandler } from 'express';
import { BadRequestError } from '../errors/ApiError';


export const validateBody = (schema: ZodSchema): RequestHandler => {
return (req, _res, next) => {
const result = schema.safeParse(req.body);
if (!result.success) {
const message = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
next(new BadRequestError(message));
return;
}
req.body = result.data;
next();
};
};