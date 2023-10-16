// controller: delete -> remove post(s) in a table
export default ({ db, tableName, whereWithParams }) =>
  async (req, res) => {
    const { where, params } =
      whereWithParams(req.params.where);
    const result = await db(/*SQL*/`
      DELETE FROM ${tableName} 
      WHERE ${where}
    `, params, req);
    res.json(result);
  };