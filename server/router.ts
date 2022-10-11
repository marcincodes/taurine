import * as trpc from '@trpc/server';
import { z } from 'zod';

export const appRouter = trpc
  .router()
  .mutation('greet', {
    input: z.object({
      name: z.string()
    }),
    async resolve({ input }) {
      return `"Hello, ${input.name}! You've been greeted from NodeJS!"`; // input type is string
    },
  });

export type AppRouter = typeof appRouter;
