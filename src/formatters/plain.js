const mapping = {
  root: ({ children }, path) => {
    //console.log('root');
    //console.log(`path ${path}`);
    const output = children.flatMap((node) => {
      if (node.type !== 'unchanged') return mapping[node.type](node, '');
      return 'unchanged';
    });
    console.log(output);
    return output.filter((item) => item !== 'unchanged\n').join('\n');
  },
  nested: (node, path) => {
    //console.log('nested');
    //console.log(`path ${path}`);
    const nestedKey = node.key; 
    const output = node.children.flatMap((node) => {
      if (node.type !== 'unchanged') return mapping[node.type](node, `${path}${nestedKey}.`);
      return 'unchanged';
    });
    return output.join('\n');
  },
  added: (node, path) => {
    //console.log('added');
    return `Property '${path}${node.key}' was added with value: ${stringifyValue(node.value)}`;
  },
  deleted: (node, path) => {
    //console.log('deleted');
    return `Property '${path}${node.key}' was removed`;
  },
  changed: (node, path) => {
    //console.log('changed');
    return `Property '${path}${node.key}' was updated. From ${stringifyValue(node.value1)} to ${stringifyValue(node.value2)}`;
  },
};

const stringifyValue = (value) => {
  const type = typeof value; 
  if (type === 'string') return `'${value}'`;
  if (value !== null && type === 'object') return '[complex value]';
  return value;
}

const renderTree = (ast) => {
  //console.log(JSON.stringify(ast, null, 4));
  const iter = (node, path) => mapping[node.type](node, path);
  return iter(ast, '');
};

export default renderTree;