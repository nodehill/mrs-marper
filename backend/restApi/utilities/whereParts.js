import { tryToJsonParse } from "../../_.js";

// different transforms for 
// distinct parts in a where clause
// (this is a helper called by whereWithParams.js)
export default (x, _where, params, param, op) => [
  // and/or operator
  () => (x = { '&&': 'AND', '||': 'OR' }[x] || x,
    _where.push(' ' + x + ' ')),
  // column name
  () => (param[0] = x,
    _where.push('`' + x.replaceAll('`', '') + '`')),
  // operator
  () => (op[0] = x,
    _where.push(' ' + x + ' ')),
  // parameter value
  () => {
    x = tryToJsonParse(x);
    op[0] === 'LIKE' && (x = x.replaceAll('^', '%'));
    params['where_' + param[0]] = x;
    _where.push(':where_' + param[0]);
    param[0] = null;
  }
];