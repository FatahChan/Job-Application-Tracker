import { useUpdateApplication } from '@/lib/appwrite/mutation';
import { useGetApplication } from '@/lib/appwrite/queries';
import { createLazyFileRoute } from '@tanstack/react-router';
import { JobApplicationTrackerForm } from '@/components/JobApplicationTrackerForm';
export const Route = createLazyFileRoute('/(protected)/_layout/application/$id')({
  component: () => <EditApplication />,
});

function EditApplication() {
  const { id } = Route.useParams();
  const { data, isFetching, isError, error } = useGetApplication(id);
  const { mutate } = useUpdateApplication();
  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <>
      <h1>Edit Application {id}</h1>
      <JobApplicationTrackerForm
        defaultValues={data}
        onSubmit={async (values) => {
          mutate({ id, values });
        }}
      />
    </>
  );
}
