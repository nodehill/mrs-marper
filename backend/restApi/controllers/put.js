import { modifyReqBody, smartUpdates }
  from '../utilities/_.js';

// controller: put -> change post(s) in a table
export default ({ db, tableName, whereWithParams }) =>
  async (req, res) => {
    const { where, params } =
      whereWithParams(req.params.where);
    const body = await modifyReqBody(tableName, req.body);
    delete body.id;
    const result = await db(...smartUpdates(/*SQL*/`
      UPDATE ${tableName} 
      SET ${Object.keys(body).map(x =>
      '`' + x.replaceAll('`', '') + '` = :' + x)}
      WHERE ${where}
    `, { ...body, ...params }), req);
    res.json(result);
  };