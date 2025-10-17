// Server bootstrap
import { createApp } from './app';
import config from './config/index';
import { logger } from './utils/logger';


const app = createApp();
const port = config.port;
app.listen(port, () => logger.info(`Server listening on ${port}`));