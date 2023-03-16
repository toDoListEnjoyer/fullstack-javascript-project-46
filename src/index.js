import fs from 'fs';
import _ from 'lodash';
// import { extname } from 'path';

const getFileData = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
};

// const getFormat = (filepath) => extname(filepath).substring(1);

const gendiff = (filepath1, filepath2) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);
  // const [format1, format2] = [getFormat(filepath1), getFormat(filepath2)];

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2).sort();

  const result = ['{\n'];

  keys.forEach((key) => {
    if (!Object.hasOwn(data1, key)) {
      result.push(`  + ${key}: ${data2[key]}\n`);
    } else if (!Object.hasOwn(data2, key)) {
      result.push(`  - ${key}: ${data1[key]}\n`);
    } else if (data1[key] !== data2[key]) {
      result.push(`  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`);
    } else {
      result.push(`    ${key}: ${data1[key]}\n`);
    }
  });
  result.push('}');
  return result.join('');
};

export default gendiff;
