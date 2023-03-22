import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringifyKey = (depth, symbol, key) => `${indent(depth)}${symbol} ${key}:`;

const stringifyValue = (data, depth, mapping) => {
  if (!_.isObject(data)) {
    if (data === '') return data;
    return ` ${String(data)}`;
  }

  const output = Object.entries(data)
    .map(([key, value]) => `${mapping.unchanged({ key, value }, depth + 1)}`);

  return ` {\n${output.join('\n')}\n  ${indent(depth)}}`;
};

const mapping = {
  root: ({ children }, depth, iter) => {
    const output = children.flatMap((node) => mapping[node.type](node, depth + 1, iter));
    return `{\n${output.join('\n')}\n}`;
  },
  nested: ({ key, children }, depth, iter) => {
    const output = children.flatMap((node) => mapping[node.type](node, depth + 1, iter));
    return `${indent(depth)}  ${key}: {\n${output.join('\n')}\n  ${indent(depth)}}`;
  },
  added: (node, depth) => `${stringifyKey(depth, '+', node.key)}${stringifyValue(node.value, depth, mapping)}`,
  deleted: (node, depth) => `${stringifyKey(depth, '-', node.key)}${stringifyValue(node.value, depth, mapping)}`,
  unchanged: (node, depth) => `${stringifyKey(depth, ' ', node.key)}${stringifyValue(node.value, depth, mapping)}`,
  changed: (node, depth) => {
    const { key, value1, value2 } = node;
    const data1 = `${indent(depth)}- ${key}:${stringifyValue(value1, depth, mapping)}`;
    const data2 = `${indent(depth)}+ ${key}:${stringifyValue(value2, depth, mapping)}`;

    return [data1, data2];
  },
};

const renderTree = (ast) => {
  const iter = (node, depth) => mapping[node.type](node, depth, iter);
  return iter(ast, 0);
};

export default renderTree;
