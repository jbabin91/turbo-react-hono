import { Card, CardContent, CardHeader } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';

import { tasksQueryOptions, tasksSearchSchema } from '@/features/tasks';

export const Route = createFileRoute('/_app/tasks/')({
  component: TasksIndex,
  validateSearch: zodSearchValidator(tasksSearchSchema),
  loaderDeps: ({ search: { q, sort, order, done } }) => ({
    q,
    sort,
    order,
    done,
  }),
  loader: ({ context: { queryClient }, deps: { q, sort, order, done } }) => {
    const infiniteQueryOptions = tasksQueryOptions({
      q,
      sort,
      order,
      done,
      limit: 10,
    });
    const cachedTasks = queryClient.getQueryData(infiniteQueryOptions.queryKey);
    if (!cachedTasks) {
      queryClient.fetchInfiniteQuery(infiniteQueryOptions);
    }
  },
  staticData: { pageTitle: 'Tasks', isAuth: true },
});

function TasksIndex() {
  return (
    <div className="mx-auto mt-4 flex max-w-screen-sm flex-col space-y-4">
      <Card>
        <CardHeader>Tasks</CardHeader>
        <CardContent>
          <p>Tasks go here</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Tasks</CardHeader>
        <CardContent>
          <p>Tasks go here</p>
        </CardContent>
      </Card>
    </div>
  );
}
