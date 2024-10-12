import configureOpenAPI from './lib/configure-open-api';
import createApp from './lib/create-app';
import auth from './routes/auth';
import index from './routes/index.route';
import me from './routes/me';
import tasks from './routes/tasks';
import users from './routes/users';

const app = createApp();

configureOpenAPI(app);

const routes = [index, auth, me, tasks, users] as const;

for (const route of routes) {
  app.route('/', route);
}

export type AppType = (typeof routes)[number];

export default app;
