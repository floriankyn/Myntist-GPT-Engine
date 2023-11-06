import { z } from 'zod';

const envVariables = z.object({
  PORT: z.string(),
  JWT_SECRET: z.string(),
  OPENAI_API_KEY: z.string()
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { router } from '../v1/routes';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins: string[] = [`http://localhost:${PORT}`];

type CorsCallback = (err: Error | null, allow?: boolean) => void;

interface CorsOriginFunction {
  (origin: string | undefined, callback: CorsCallback): void;
}

interface CorsOptions {
  origin: CorsOriginFunction;
  methods: string;
  credentials: boolean;
  optionsSuccessStatus: number;
}

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: CorsCallback): void => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(router);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
