import { Router } from 'express';
import { env, db, server as app } from '../_.js';
import specialRoutes from './specialRoutes.js';
import { tableInfo, orderBy, limit, whereWithParams }
  from './utilities/_.js';
import { postCtrl, getAllCtrl, getCtrl, putCtrl, deleteCtrl }
  from './controllers/_.js';

// create the rest api router + add special routes
const inject = { env, db, orderBy, limit, whereWithParams };
const restRouter = Router();
app.use(env.restApiPrefix, restRouter);
specialRoutes(restRouter, inject);

// add a sub route for each table and view
tableInfo.forEach(({ tableName, type }) => {
  const router = Router(), arg = { tableName, ...inject };
  router.get('/', getAllCtrl(arg));
  router.get('/:where', getCtrl(arg));
  if (type === 'view') { return ``; }
  router.post('/', postCtrl(arg));
  router.put('/:where', putCtrl(arg));
  router.patch('/:where', putCtrl(arg));
  router.delete('/:where', deleteCtrl(arg));
  restRouter.use('/' + tableName, router);
});