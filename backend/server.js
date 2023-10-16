import express from 'express';
import session from 'express-session';
import mySqlSession from 'express-mysql-session';
import dbCredentials from './dbCredentials.js';
import serverMiddleware from './serverMiddleware.js';
import env from './env.js';
const { serverPort } = env;

// app -> express based web server
const app = express();

// add server middleware
serverMiddleware({
  app, express, env, session, mySqlSession, dbCredentials
});

// start server
app.listen(serverPort, () =>
  console.log(`Listening on http://127.0.0.01:${serverPort}\n`)
);

export default app;