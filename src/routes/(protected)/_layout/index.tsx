import { useGetApplications } from '@/lib/appwrite/queries';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)/_layout/')({
  component: Page,
});

function Page() {
  const { data, isFetching, error } = useGetApplications();
  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) {
    const ApplicationTable = lazyRouteComponent(
      () => import('@/components/ApplicationTable/index'),
      'ApplicationTable'
    );
    return <ApplicationTable data={data} />;
  }
}
