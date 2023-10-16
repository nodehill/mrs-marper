import db from '../../db.js';
import env from '../../env.js';
const { dbDb: database } = env;

// get the names of all the tables and views in the db
export default await db(/*sql*/`
  SELECT 
    TABLE_NAME AS tableName, 
    IF(TABLE_TYPE = 'VIEW', 'view','table') AS type
  FROM information_schema.tables 
  WHERE TABLE_SCHEMA = :database
`, { database });