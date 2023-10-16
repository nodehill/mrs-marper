import whereParts from './whereParts.js';

// whereWithParams -> turn a raw where clause into a where
// clause with paramaters for use in a prepared statement
export default where => {
  const id = !isNaN(where) && where;
  id && (where = `id = ${id}`);
  let ops = ['=', '!=', '>', '<', '>=', '<=',
    ' NOT IN ', ' IS NOT ', ' IS ', ' NOT ', ' LIKE ', ' IN '];
  let andOr = [' AND ', ' OR ', '&&', '\\|\\|'];
  const reg = new RegExp('(' + [...ops, ...andOr].join('|') + ')');
  ops = ops.map(x => x.trim());
  andOr = andOr.map(x => x.trim());
  let _where = [], params = {}, param = [], op = [];
  where.split(reg).forEach(x => {
    x = x.trim();
    // partTypes: 0 = and / or operator, 1 = column name, 
    //            2 = operator, 3 = parameter value
    let partType = [
      andOr.includes(x), !param[0], ops.includes(x), true
    ].findIndex(x => x);
    whereParts(x, _where, params, param, op)[partType]();
  });
  return {
    params, byId: !!id, where: _where.join('')
      .replace(/(IN\s{1,})(:where_\w{1,})/g, '$1($2)')
  }
};