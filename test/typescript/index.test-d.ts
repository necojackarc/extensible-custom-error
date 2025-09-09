import {expectType, expectError} from 'tsd';
import ExtensibleCustomError from '../..';

expectType<ExtensibleCustomError>(new ExtensibleCustomError());

expectType<ExtensibleCustomError>(new ExtensibleCustomError('message'));

expectType<ExtensibleCustomError>(new ExtensibleCustomError(new Error()));

expectType<ExtensibleCustomError>(new ExtensibleCustomError('message', new Error()));

// Test that passing non-Error/non-string types causes errors
expectError(new ExtensibleCustomError(123));

expectError(new ExtensibleCustomError(true));
