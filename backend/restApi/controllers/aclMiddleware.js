export default ({ env, db, restRouter }) => {

  restRouter.use(async (req, res, next) => {

    let urlSplit = req.url.split('/'), id = +urlSplit[2];
    let entity = urlSplit[1], reqMethod = req.method;
    let userRole = req.session?.user?.[env.userUserroleColumn] ||
      env.notLoggedInUserrole
    let userId = req.session.user?.[env.userIdColumn];
    let idMatchesUserId = id && userId && id === userId;

    const rules = await db(/*SQL*/`SELECT * FROM ${env.aclTable}`);
    const ok = rules.some(
      ({ userRole: u, entity: e, requestMethod: r }) =>
        (u === '*' || u === userRole)
        && (r === '*' || r === reqMethod)
        && (
          (e === '*' || e === entity) ||
          (
            e.replace('/:loggedInId', '') === entity
            && idMatchesUserId
          )
        )
    );
    ok || 1 ? next() : res.json({ error: 'not allowed' });
  });
}