import fs from 'fs';
import _ from 'lodash';

const getFileData = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
};

const gendiff = (filepath1, filepath2) => {
  const [data1, data2] = [getFileData(filepath1), getFileData(filepath2)];
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2).sort();

  const result = ['{\n'];
  for (const key of keys) {
    if (!Object.hasOwn(data1, key)) {
      result.push(`  + ${key}: ${data2[key]}\n`);
    } else if (!Object.hasOwn(data2, key)) {
      result.push(`  - ${key}: ${data1[key]}\n`);
    } else if (data1[key] !== data2[key]) {
      result.push(`  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`);
    } else {
      result.push(`    ${key}: ${data1[key]}\n`);
    }
  }
  result.push('\r}');
  return result.join('');
};

export default gendiff;
