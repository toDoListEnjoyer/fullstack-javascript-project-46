install:
	npm ci

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

compare-flat-json:
	gendiff  './__fixtures__/file1.json' './__fixtures__/file2.json'

compare-flat-yml:
	gendiff  './__fixtures__/file1.yml' './__fixtures__/file2.yml'

