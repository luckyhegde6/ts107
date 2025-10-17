import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';
import { logger } from '../utils/logger';


export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
if (err instanceof ApiError) {
logger.error(err.status, err.message, { path: req.path });
res.status(err.status).json({ message: err.message });
return;
}


logger.error('Unhandled error', err);
res.status(500).json({ message: 'Internal server error' });
}