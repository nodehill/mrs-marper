// create limit part of sql query
// based on limit query param
export default (req) => {
  let { limit } = req.query;
  if (!limit) { return ''; }
  limit = limit.replace(/[^\d,]/g, '');
  return 'LIMIT ' + limit;
};