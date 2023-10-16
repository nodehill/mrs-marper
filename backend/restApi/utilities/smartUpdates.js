// Allow updates/puts where we send a property value as
// { field: 'columnName', 'op': '+-*/ or %', value: ' a value'}
// -> now we can make updates based on old values of fields
export default (query, params) => {
  let ops = ['+', '-', '*', '/', '%'];
  Object.entries(params).forEach(([key, val]) => {
    let { field, op, value } = val || {};
    if (ops.includes(op) && field && value) {
      query = [
        // replace necessary parts of query
        () => query.replace(':' + key,
          `\`${field.replaceAll('`', '')}\` ${op} :${key}`
        ),
        // mysql - we can't concat strings using + 
        // so let's use CONCAT instead
        () => query.replace(':' + key,
          `CONCAT(\`${field.replaceAll('`', '')}\`, :${key})`
        )
      ][0 + (typeof val.value === 'string' && op === '+')]()
      params[key] = val.value;
    }
  });
  return [query, params]
}