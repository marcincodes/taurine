import fastify from 'fastify';
import cors from '@fastify/cors'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { createContext } from './context';
import { appRouter } from './router';

const server = fastify({
  maxParamLength: 5000,
});

server.register(
  cors,
  {
    origin: ['http://localhost:1420', 'tauri://localhost'],
  }
);

server.register(fastifyTRPCPlugin, {
  prefix: '/api',
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    const info = await server.listen({ port: 3000 });
    console.log(info);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
