const stringifyValue = (value) => {
  const type = typeof value;
  if (type === 'string') return `'${value}'`;
  if (value !== null && type === 'object') return '[complex value]';
  return value;
};

const mapping = {
  root: ({ children }) => {
    const output = children.flatMap((node) => {
      if (node.type !== 'unchanged') return mapping[node.type](node, '');
      return '';
    });
    return output.join('\n');
  },
  nested: ({ key, children }, path) => {
    const output = children.flatMap((node) => {
      if (node.type !== 'unchanged') return mapping[node.type](node, `${path}${key}.`);
      return '';
    });
    return output.join('\n');
  },
  added: (node, path) => `Property '${path}${node.key}' was added with value: ${stringifyValue(node.value)}`,
  deleted: (node, path) => `Property '${path}${node.key}' was removed`,
  changed: (node, path) => `Property '${path}${node.key}' was updated. From ${stringifyValue(node.value1)} to ${stringifyValue(node.value2)}`,
};

const renderTree = (ast) => {
  const iter = (node, path) => mapping[node.type](node, path);
  const output = iter(ast, '');
  return output.split('\n').filter((line) => line !== '').join('\n');
};

export default renderTree;
