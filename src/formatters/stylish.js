import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (data, depth, mapping) => {
  if (!_.isObject(data)) {
    if (data === '') return data;
    return ` ${String(data)}`;
  }

  const output = Object.entries(data)
    .map(([key, value]) => {
      console.log(`key ${key}, value ${value}`);
      return `${mapping.unchanged({ key, value }, depth + 1)}`;
    });

  return ` {\n${output.join('\n')}\n  ${indent(depth)}}`;
};

const mapping = {
  root: ({ children }, depth, iter) => {
    console.log('root');
    console.log(`depth ${depth}\n`);
    const output = children.flatMap((node) => mapping[node.type](node, depth + 1, iter));
    console.log(output);
    return `{\n${output.join('\n')}\n}`;
  },
  nested: ({ key, children }, depth, iter) => {
    console.log('nested');
    console.log(`key ${key} depth ${depth}\n`);
    const output = children.flatMap((node) => {
      console.log(`depth ${depth}`);
      return mapping[node.type](node, depth + 1, iter);
    });
    console.log(`output ${output}`);
    return `${indent(depth)}  ${key}: {\n${output.join('\n')}\n  ${indent(depth)}}`;
  },
  added: (node, depth) => {
    console.log('added');
    console.log(`node ${JSON.stringify(node, null, 4)} depth ${depth}\n`);
    return `${indent(depth)}+ ${node.key}:${stringify(node.value, depth, mapping)}`;
  },
  deleted: (node, depth) => {
    console.log('deleted');
    console.log(`node ${JSON.stringify(node, null, 4)} depth ${depth}\n`);
    return `${indent(depth)}- ${node.key}:${stringify(node.value, depth, mapping)}`;
  },
  unchanged: (node, depth) => {
    console.log('unchanged');
    console.log(`node ${JSON.stringify(node, null, 4)} depth ${depth}\n`);
    return `${indent(depth)}  ${node.key}:${stringify(node.value, depth, mapping)}`;
  },
  changed: (node, depth) => {
    console.log('changed');
    console.log(`node ${JSON.stringify(node, null, 4)} depth ${depth}\n`);
    const { key, value1, value2 } = node;
    const data1 = `${indent(depth)}- ${key}:${stringify(value1, depth, mapping)}`;
    const data2 = `${indent(depth)}+ ${key}:${stringify(value2, depth, mapping)}`;

    return [data1, data2];
  },
};

const renderTree = (ast) => {
  console.log(JSON.stringify(ast, null, 4));
  const iter = (node, depth) => mapping[node.type](node, depth, iter);
  return iter(ast, 0);
};

export default renderTree;
