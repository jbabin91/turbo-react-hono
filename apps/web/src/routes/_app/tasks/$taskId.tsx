import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/tasks/$taskId')({
  component: TaskComponent,
});

function TaskComponent() {
  const { taskId } = Route.useParams();

  return (
    <>
      <div>Hello /_app/tasks/index/{taskId}!</div>
    </>
  );
}
