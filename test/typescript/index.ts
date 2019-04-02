import ExtensibleCustomError from 'extensible-custom-error';

new ExtensibleCustomError();

new ExtensibleCustomError('message');

new ExtensibleCustomError(new Error());

new ExtensibleCustomError('message', new Error());

// typings:expect-error
new ExtensibleCustomError(Error);

// typings:expect-error
new ExtensibleCustomError(new Error(), 'message');
