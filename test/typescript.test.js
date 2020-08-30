'use strict';

const path = require('path');
const { checkDirectory } = require('typings-tester');

describe('TypeScript definitions', function() {
  it('should compile against index.d.ts', function() {
    checkDirectory(path.join(__dirname, 'typescript'));
  });
});
