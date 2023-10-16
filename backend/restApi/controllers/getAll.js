// controller: getAll -> all posts from a table
export default ({ db, tableName, orderBy, limit }) =>
  async (req, res) => {
    const result = await db(/*SQL*/`
      SELECT * FROM ${tableName}
      ${orderBy(req)}
      ${limit(req)}
    `, {}, req);
    res.json(result);
  };