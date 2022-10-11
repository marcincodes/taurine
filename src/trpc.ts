import { createReactQueryHooks } from '@trpc/react';

import type { AppRouter } from '../server/router';

export const trpc = createReactQueryHooks<AppRouter>();
