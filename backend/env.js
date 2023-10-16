import tryToJsonParse from './tryToJsonParse.js';
import dotenv from 'dotenv';
dotenv.config();

// env -> camel cased environment variables
// (also make numeric and booleic
//  values into real numbers and booleans)
export default Object.fromEntries(
  Object.entries(process.env).map(([key, val]) => {
    return [
      key
        .toLowerCase().replace(
          /_./g, x => x[1].toUpperCase()),
      tryToJsonParse(val)
    ];
  })
);