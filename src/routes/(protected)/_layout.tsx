import { account } from '@/lib/appwrite';
import { createRootRoute, Link, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    let user;
    try {
      user = await account.get();
    } catch (e) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }
    if (!user?.$id) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }
  },
  component: () => (
    <>
      <div className="p-2 flex gap-4">
        <Link to="/" className="[&.active]:font-bold [&.active]:underline">
          Home
        </Link>
        <Link to="/form" className="[&.active]:font-bold [&.active]:underline">
          New Application
        </Link>
      </div>
      <hr />
      <div className="py-4">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
