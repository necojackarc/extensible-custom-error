'use strict';

const tsd = require('tsd').default;
const path = require('path');

describe('TypeScript definitions', function() {
  it('should compile against index.d.ts', async function() {
    // tsd operations can take a while
    this.timeout(10000);

    const diagnostics = await tsd({
      cwd: path.resolve(__dirname, '..'),
      testFiles: [ 'test/typescript/*.test-d.ts' ],
    });

    if (diagnostics.length > 0) {
      const errors = diagnostics.map((diagnostic) => `${diagnostic.fileName}:${diagnostic.line}:${diagnostic.column} - ${diagnostic.message}`).join('\n');
      throw new Error(`TypeScript definitions test failed:\n${errors}`);
    }
  });
});
