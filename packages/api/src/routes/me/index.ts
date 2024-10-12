import { createRouter } from '../../lib/create-app';
import * as handlers from './me.handlers';
import * as routes from './me.routes';

const router = createRouter()
  .openapi(routes.getSelf, handlers.getSelf)
  .openapi(routes.updateSelf, handlers.updateSelf)
  .openapi(routes.remove, handlers.remove)
  .openapi(routes.removeSession, handlers.removeSession);

export default router;
