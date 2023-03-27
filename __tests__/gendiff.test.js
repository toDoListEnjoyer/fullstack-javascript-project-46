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

const file1Rec = './__fixtures__/file1-rec.json';
const file2Rec = './__fixtures__/file2-rec.json';
const file3Rec = './__fixtures__/file1-rec.yaml';
const file4Rec = './__fixtures__/file2-rec.yaml';

const outputFlat = readFile('output-flat.txt');
const outputRec = readFile('output-rec.txt');
const outputPlain = readFile('output-plain.txt');
const outputJson = readFile('output-json.txt');

describe('gendiff tests', () => {
  test('extensions tests', () => {
    expect(gendiff(file1, file2)).toEqual(outputFlat);
    expect(gendiff(file3, file4)).toEqual(outputFlat);
    expect(gendiff(file5, file6)).toEqual(outputFlat);
  });

  test('recursive structure test', () => {
    expect(gendiff(file1Rec, file2Rec)).toEqual(outputRec);
    expect(gendiff(file3Rec, file4Rec)).toEqual(outputRec);
  });

  test('plain format test', () => {
    expect(gendiff(file1Rec, file2Rec, 'plain')).toEqual(outputPlain);
    expect(gendiff(file3Rec, file4Rec, 'plain')).toEqual(outputPlain);
  });

  test('json format test', () => {
    expect(gendiff(file1Rec, file2Rec, 'json')).toEqual(outputJson);
    expect(gendiff(file3Rec, file4Rec, 'json')).toEqual(outputJson);
  });
});
