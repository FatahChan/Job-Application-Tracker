import { createRootRoute, Outlet } from '@tanstack/react-router';
import React from 'react';
import { Suspense } from 'react';

const LazyTanStackRouterDevtools = React.lazy(async () => {
  if (import.meta.env.MODE === 'development')
    return import('@tanstack/router-devtools').then((m) => ({
      default: m.TanStackRouterDevtools,
    }));
  return Promise.resolve({ default: () => null });
});

export const Route = createRootRoute({
  component: () => (
    <>
      <main className="p-4">
        <Outlet />
      </main>
      <Suspense fallback={<></>}>
        <LazyTanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
