import fastify from 'fastify';
import pino from 'pino';
import { itemRoutes } from './routes/item-routes';
import * as a from '@fastify/swagger';

const app = fastify({ logger: pino({ level: 'info' }) });

const PORT = 5000;

app.register(require('@fastify/swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

app.register(itemRoutes);

const start = async () => {
  try {
    await app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
