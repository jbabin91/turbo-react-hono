import configureOpenAPI from './lib/configure-open-api';
import createApp from './lib/create-app';
import auth from './routes/auth';
import index from './routes/index.route';
import tasks from './routes/tasks';

const app = createApp();

configureOpenAPI(app);

const routes = [index, auth, tasks] as const;

for (const route of routes) {
  app.route('/', route);
}

export type AppType = (typeof routes)[number];

export default app;
