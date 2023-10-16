import { modifyReqBody } from "../utilities/_.js";

// controller: post -> create a new post in a table
export default ({ db, tableName }) =>
  async (req, res) => {
    const body = await modifyReqBody(tableName, req.body);
    delete body.id;
    const result = await db(/*SQL*/`
      INSERT INTO ${tableName} (${Object.keys(body)
        .map(x => '`' + x.replaceAll('`', '') + '`')})
      VALUES (${Object.keys(body).map(x => ':' + x)})
    `, body, req);
    res.json(result);
  };