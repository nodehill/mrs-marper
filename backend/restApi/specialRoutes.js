import { loginCtrls, aclMiddleware, compileProject }
  from "./controllers/_.js";

// special routes for the rest router
// (on top of the normal ones per table/view)
export default (restRouter, inject) => {
  inject.restRouter = restRouter;

  // middleware for acl
  aclMiddleware(inject);

  // login routes
  loginCtrls(inject);

  // compile project route
  compileProject(inject);

  // catch all route if nothing else matches 
  setImmediate(() => restRouter.all('*', (_, res) =>
    res.json({ error: 'no such route' })));
};