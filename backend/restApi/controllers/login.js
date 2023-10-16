import { Router } from 'express';
import { comparePassword as cpw } from '../utilities/_.js';
import env from '../../env.js'; const { userTable,
  userPwColumn: pwCol, userUsernameColumn: unameCol } = env;

// login routes, post = login, get = check, delete = logout
export default ({ restRouter, db }) => {
  const loginRouter = new Router();
  restRouter.use('/login', loginRouter);

  loginRouter.post('/', async (req, res) => {
    let already = !!req.session.user, user = (await db(/*SQL*/`
      SELECT * FROM ${userTable} WHERE  ${unameCol} = :uname
    `, { uname: req.body[unameCol] }))[0];
    const ok = !already && await cpw(req.body[pwCol], user?.[pwCol]);
    ok && (req.session.user = user = { ...user, [pwCol]: undefined });
    res.json([{ error: 'not logged in' },
    { error: 'already logged in' }, user][already + ok * 2]);
  });

  loginRouter.get('/', (req, res) =>
    res.json(req.session.user || { error: 'not logged in' }));

  loginRouter.delete('/', (req, res) => {
    const ok = req.session.user; delete req.session.user;
    res.json(ok ? { ok: 'logged out' } : { error: 'not logged in' });
  });
}