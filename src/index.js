import fs from 'fs';
import { extname } from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const getExt = (filepath) => extname(filepath).substring(1);

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const ext1 = getExt(filepath1);
  const ext2 = getExt(filepath2);
  const data1 = parse(readFile(filepath1), ext1);
  const data2 = parse(readFile(filepath2), ext2);

  const tree = buildTree(data1, data2);
  return format(tree, formatName);
};

export default gendiff;
