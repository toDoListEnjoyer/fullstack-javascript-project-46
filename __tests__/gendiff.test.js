import fs from 'fs';
import gendiff from '../src/index.js';

describe('formats tests', () => {
    const output1 = fs.readFileSync('./__fixtures__/output1.txt', 'utf8');
    test('gendiff with json extension', () => {
        const file1 = './__fixtures__/file1.json';
        const file2 = './__fixtures__/file2.json';
        expect(gendiff(file1, file2)).toEqual(output1);
    });
    test('gendiff with yaml extension', () => {
        const file1 = './__fixtures__/file1.yaml';
        const file2 = './__fixtures__/file2.yaml';
        expect(gendiff(file1, file2)).toEqual(output1);
    });
    test('gendiff with yml extension', () => {
        const file1 = './__fixtures__/file1.yml';
        const file2 = './__fixtures__/file2.yml';
        expect(gendiff(file1, file2)).toEqual(output1);
    });
});
