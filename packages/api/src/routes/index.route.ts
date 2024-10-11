import { createRoute } from '@hono/zod-openapi';
import { jsonContent } from 'stoker/openapi/helpers';
import { createMessageObjectSchema } from 'stoker/openapi/schemas';

import { commonRoutes } from '../lib/configure-open-api';
import { HttpStatusCodes } from '../lib/constants';
import { createRouter } from '../lib/create-app';
import { errorResponses } from '../utils/schema/common-responses';

const tags = [commonRoutes.general.name];

const router = createRouter().openapi(
  createRoute({
    method: 'get',
    path: '/',
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema('TRH API'),
        'TRH API Index',
      ),
      ...errorResponses,
    },
  }),
  (c) => {
    return c.json(
      {
        message: 'TRH API',
      },
      HttpStatusCodes.OK,
    );
  },
);

export default router;
