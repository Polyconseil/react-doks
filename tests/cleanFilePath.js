import { assert } from 'chai';

import cleanFilePath from '../src/runtime/utils/cleanFilePath';

const testCases = [
  {
    input: './foo/__docs__/index.js',
    expectedOutput: 'foo',
    it: 'cleans index.js',
  },
  {
    input: './foo/bar/__docs__/index.js',
    expectedOutput: 'foo/bar',
    it: 'removes __docs__ but keeps other folders',
  },
  {
    input: './foo/__docs__/components/MyComponent.js',
    expectedOutput: 'foo/components/MyComponent',
    it: 'keeps the component name',
  },
  {
    input: './foo/__docs__/components/MyComponent.jsx',
    expectedOutput: 'foo/components/MyComponent',
    it: 'accepts jsx',
  },
];

describe('cleanFilePath function', () => {
  testCases.forEach(testCase => {
    it(testCase.it, () => {
      assert.equal(cleanFilePath(testCase.input), testCase.expectedOutput, `cleanFilePath(${testCase.input}) should output ${testCase.expectedOutput}`);
    });
  });
});
