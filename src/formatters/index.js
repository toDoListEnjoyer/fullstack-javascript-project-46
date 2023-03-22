import formatStylish from './stylish.js';

const formatters = {
  stylish: formatStylish,
  plain: '',
  json: '',
};

export default (ast, type) => {
  const format = formatters[type];
  if (!format) {
    throw new Error(`Unknown format ${type}`);
  }
  return format(ast);
};
