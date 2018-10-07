'use strict';

const { expect } = require('chai');

const ExtensibleCustomError = require('../src');

describe('ExtensibleCustomError', function() {
  describe('MyError extends ExtensibleCustomError', function() {
    class MyError extends ExtensibleCustomError {}
    const className = 'MyError';
    const captureStackTrace = Error.captureStackTrace;

    [true, false].forEach((isCaptureStackTraceAvailable) => {
      const availability =
        isCaptureStackTraceAvailable ? 'available' : 'unavailable';

      context(`when captureStackTrace is ${availability}`, function() {
        before(function() {
          if (!isCaptureStackTraceAvailable) {
            delete Error.captureStackTrace;
          }
        });

        after(function() {
          if (!isCaptureStackTraceAvailable) {
            Error.captureStackTrace = captureStackTrace;
          }
        });

        context('given a message', function() {
          it('should contain name, message, and stack properly', function() {
            const message = 'message';
            const myError = new MyError(message);

            // toString() returns the first line of the stack trace
            expect(myError.toString()).to.equal(`${className}: ${message}`);

            expect(myError.name).to.equal(className);
            expect(myError.message).to.equal(message);

            expect(myError).to.be.an.instanceof(Error);
            expect(myError).to.be.an.instanceof(ExtensibleCustomError);
            expect(myError).to.be.an.instanceof(MyError);
          });
        });

        context('given an error', function() {
          it('should contain name, message, and stack properly', function() {
            const originalMessage = 'originalMessage';
            const errorToWrap = new Error(originalMessage);
            const myError = new MyError(errorToWrap);

            // toString() returns the first line of the stack trace
            expect(myError.toString()).to.equal(
              `${className}: ${errorToWrap.toString()}`
            );

            expect(myError.name).to.equal(className);
            expect(myError.message).to.equal(errorToWrap.toString());
            expect(myError.stack).to.include(errorToWrap.stack);

            expect(myError).to.be.an.instanceof(Error);
            expect(myError).to.be.an.instanceof(ExtensibleCustomError);
            expect(myError).to.be.an.instanceof(MyError);
          });
        });

        context('given a message and an error', function() {
          it('should contain name, message, and stack properly', function() {
            const originalMessage = 'originalMessage';
            const errorToWrap = new Error(originalMessage);
            const message = 'message';
            const myError = new MyError(message, errorToWrap);

            // toString() returns the first line of the stack trace
            expect(myError.toString()).to.equal(`${className}: ${message}`);

            expect(myError.name).to.equal(className);
            expect(myError.message).to.equal(message);
            expect(myError.stack).to.include(errorToWrap.stack);

            expect(myError).to.be.an.instanceof(Error);
            expect(myError).to.be.an.instanceof(ExtensibleCustomError);
            expect(myError).to.be.an.instanceof(MyError);
          });
        });
      });
    });
  });
});
