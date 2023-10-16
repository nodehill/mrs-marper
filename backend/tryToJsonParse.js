// try to parse as JSON
// (making strings with numbers and booleans
// into real numbers and booleans)
// if error return original value
export default toParse => {
  try {
    toParse = JSON.parse(toParse);
  }
  catch (e) { }
  return toParse;
};