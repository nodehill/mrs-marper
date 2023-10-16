// the mysql2 driver can not handle expressions like
// IN :someArray, params: {someArray: [...]}
// (the old mysql driver could) - so fix it:
export default (query, params) => {
  if (params instanceof Array) { return query; }
  Object.entries(params).forEach(([key, val]) => {
    if (!(val instanceof Array)) { return; }
    val.forEach((x, i) => params[key + '_' + i] = x);
    query = query.replace(':' + key,
      val.map((_, i) => ':' + key + '_' + i));
    delete params[key];
  });
  return query;
}

