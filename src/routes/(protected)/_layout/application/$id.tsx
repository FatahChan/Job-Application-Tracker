import { JobApplicationTrackerForm } from '@/components/JobApplicationTrackerForm';
import { useUpdateApplication } from '@/lib/appwrite/mutation';
import { useGetApplication } from '@/lib/appwrite/queries';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)/_layout/application/$id')({
  component: () => <EditApplication />,
});

function EditApplication() {
  const { id } = Route.useParams();
  const { data, isFetching, isError, error } = useGetApplication(id);
  const { mutate } = useUpdateApplication();
  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <JobApplicationTrackerForm
      defaultValues={data}
      onSubmit={async (values) => {
        mutate({ id, values });
      }}
    />
  );
}
