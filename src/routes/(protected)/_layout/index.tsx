import { ApplicationTable } from '@/components/ApplicationTable';
import { useGetApplications } from '@/lib/appwrite/queries';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)/_layout/')({
  component: Page,
});

function Page() {
  const { data, isFetching, error } = useGetApplications();
  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) {
    return <ApplicationTable data={data} />;
  }
}
