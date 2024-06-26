import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <main className="p-4">
        <Outlet />
      </main>
      {import.meta.env.MODE === 'development' && <TanStackRouterDevtools />}
    </>
  ),
});
