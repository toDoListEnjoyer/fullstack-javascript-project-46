import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    let node;
    if (!_.has(data2, key)) {
      node = { key, type: 'deleted', value: data1[key] };
    } else if (!_.has(data1, key)) {
      node = { key, type: 'added', value: data2[key] };
    } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      node = { key, children: buildDiff(data1[key], data2[key]), type: 'nested' };
    } else if (!_.isEqual(data1[key], data2[key])) {
      node = {
        key, type: 'changed', value1: data1[key], value2: data2[key],
      };
    } else {
      node = { key, type: 'unchanged', value: data1[key] };
    }
    return node;
  });
};

export default (data1, data2) => ({
  type: 'root',
  children: buildDiff(data1, data2),
});
