import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

export default (ast, type) => {
  const format = formatters[type];
  if (!format) {
    throw new Error(`Unknown format ${type}`);
  }
  return format(ast);
};
