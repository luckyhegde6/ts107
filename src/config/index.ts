import dotenv from 'dotenv';
dotenv.config();


export default {
port: process.env.PORT ? Number(process.env.PORT) : 3000,
nodeEnv: process.env.NODE_ENV ?? 'development'
};