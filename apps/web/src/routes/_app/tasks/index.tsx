import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/tasks/')({
  component: TasksComponent,
});

function TasksComponent() {
  return (
    <>
      <div className="p-2 text-center">Hello /_app/tasks/!</div>
    </>
  );
}
