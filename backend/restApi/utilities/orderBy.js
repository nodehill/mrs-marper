import orderByReplacer from "./orderByReplacer.js";

// create order by part of sql query
// based on sort/orderby query param
export default (req) => {
  let { sort, orderby } = req.query;
  sort = [sort, orderby, ' '].find(x => x).trim();
  if (!sort) { return ''; }
  sort = sort.split(',').map(orderByReplacer);
  return 'ORDER BY ' + sort.join(', ');
};