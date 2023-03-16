import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';
const file3 = './__fixtures__/file1.yaml';
const file4 = './__fixtures__/file2.yaml';
const file5 = './__fixtures__/file1.yml';
const file6 = './__fixtures__/file2.yml';
const file7 = './__fixtures__/file1.error';
const file8 = './__fixtures__/file2.error';

const output1 = readFile('output1.txt');

describe('gendiff tests', () => {
  test('extensions tests', () => {
    expect(gendiff(file1, file2)).toEqual(output1);
    expect(gendiff(file3, file4)).toEqual(output1);
    expect(gendiff(file5, file6)).toEqual(output1);
    expect(gendiff(file7, file8)).toThrow();
  });
});
