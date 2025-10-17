import morgan from 'morgan';
import { RequestHandler } from 'express';


export const requestLogger: RequestHandler = morgan('dev');