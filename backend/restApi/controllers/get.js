// controller: get -> specific posts from a table
export default (
  { db, tableName, whereWithParams, orderBy, limit }
) =>
  async (req, res) => {
    const { where, params, byId } =
      whereWithParams(req.params.where);
    const result = await db(/*SQL*/`
      SELECT * FROM ${tableName} 
      WHERE ${where}
      ${orderBy(req)}
      ${limit(req)}
    `, params, req);
    res.json(byId ? result[0] || null : result);
  };