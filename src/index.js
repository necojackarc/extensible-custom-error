'use strict';

class ExtensibleCustomError extends Error {
  constructor(message, ...args) {
    let errorToWrap;

    if (message instanceof Error) {
      errorToWrap = message;
    } else if (args[0] instanceof Error) {
      errorToWrap = args[0];
      args.shift();
    }

    super(message, ...args);

    // Align with Object.getOwnPropertyDescriptor(Error.prototype, 'name')
    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    // Helper function to merge stack traces
    const mergeStackTrace = (stackTraceToMerge, baseStackTrace) => {
      if (!baseStackTrace) {
        return stackTraceToMerge;
      }

      const entriesToMerge = stackTraceToMerge.split('\n');
      const baseEntries = baseStackTrace.split('\n');

      const newEntries = [];

      entriesToMerge.forEach((entry) => {
        if (baseEntries.includes(entry)) {
          return;
        }

        newEntries.push(entry);
      });

      return [...newEntries, ...baseEntries].join('\n');
    };

    const stackTraceSoFar = errorToWrap ? errorToWrap.stack : undefined;

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor);
      this.stack = mergeStackTrace(this.stack, stackTraceSoFar);
      return;
    }

    // This class is supposed to be extended, so the first two lines from
    // the second line are about error object constructors.
    const stackTraceEntries = new Error(message).stack.split('\n');
    const stackTraceWithoutConstructors =
      [stackTraceEntries[0], ...stackTraceEntries.slice(3)].join('\n');

    this.stack = mergeStackTrace(stackTraceWithoutConstructors, stackTraceSoFar);
  }
}

module.exports = ExtensibleCustomError;
