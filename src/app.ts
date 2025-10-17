import express from 'express';
import userRoutes from './routes/user.routes';
import { requestLogger } from './middlewares/logging';
import { errorHandler } from './middlewares/errorHandler';


export function createApp() {
const app = express();
app.use(express.json());
app.use(requestLogger);


app.use('/api/users', userRoutes);


app.get('/health', (_req, res) => res.json({ ok: true }));


app.use(errorHandler);


return app;
}