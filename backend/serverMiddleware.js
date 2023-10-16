export default ({
  app, express, env, session, mySqlSession, dbCredentials }
) => {
  const { cookieSecret, serverErrorStatus } = env;

  app
    // Set error status code according to env vars
    .use((req, res, next) => {
      let orgResJson = res.json;
      res.json = data => {
        res.status(data.error ? serverErrorStatus : 200);
        return orgResJson.call(res, data);
      }
      next();
    })
    // Cookie-based sessio handling from express-session
    .use(session({
      secret: cookieSecret, resave: false,
      saveUninitialized: true,
      store: new (mySqlSession(session))(dbCredentials)
    }))
    // Parse json-based req bodies
    .use(express.json({ limit: '1MB' }))
    // Handle generic errors (like malformed json in req bodies)
    .use((error, req, res, next) =>
      error ? res.json({ error: error + '' }) : next()
    );
}