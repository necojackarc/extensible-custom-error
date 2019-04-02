'use strict';

const path = require('path');
const { expect } = require('chai');
const { checkDirectory } = require('typings-tester');

const ExtensibleCustomError = require('../src');

describe('TypeScript definitions', function() {
  it('should compile against index.d.ts', function() {
    checkDirectory(path.join(__dirname, 'typescript'));
  });
});
