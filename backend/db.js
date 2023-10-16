import mysql from 'mysql2/promise';
import prepParams from './prepParams.js';
import dbCredentials from './dbCredentials.js';
import env from './env.js';
const { debug } = env;

// connect to the database and turn on namedPlaceHolders
const dbConnection = await mysql.createPool(dbCredentials);
let dbConfig = (await dbConnection.getConnection())
  .connection.config;
dbConfig.namedPlaceholders = true;

// await db -> make db query as prepared statement
export default async function db(query, params = {}, req = {}) {
  query = query.trim().replace(/\s{1,}/g, ' ');
  debug && console.log(
    ...[decodeURI(req.baseUrl + req.url), params, query]
      .filter(x => x != 'NaN').map(x => [x, '\n']).flat()
  );
  query = prepParams(query, params); // fix IN clauses
  let result;
  result = await dbConnection.execute(query, params)
    .catch(e => result = [{ error: e + '' }]);
  return result[0];
}