'use strict';

class ExtensibleCustomError extends Error {
  constructor(...args) {
    let errorToWrap;
    let message;
    let restOfArgs;

    if (args[0] instanceof Error) {
      errorToWrap = args[0];
      message = errorToWrap.toString();
      restOfArgs = args.slice(1);
    } else if (args[1] instanceof Error) {
      errorToWrap = args[1];
      message = args[0];
      restOfArgs = args.slice(2);
    } else {
      message = args[0];
      restOfArgs = args.slice(1);
    }

    const stackTraceSoFar = errorToWrap ? errorToWrap.stack : undefined;

    super(...[message, ...restOfArgs]);

    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    const mergeStackTrace = (stackTraceToMerge, baseStackTrace) => {
      if (!baseStackTrace) {
        return stackTraceToMerge;
      }

      const entriesToMerge = stackTraceToMerge.split('\n');
      const baseEntries = baseStackTrace.split('\n');

      const newEntries = [];

      for (const entry of entriesToMerge) {
        if (baseEntries.includes(entry)) {
          return [...newEntries, ...baseEntries].join('\n');
        }

        newEntries.push(entry);
      }
    };

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

    Object.defineProperty(this, 'stack', {
      configurable: true,
      enumerable: false,
      value: mergeStackTrace(stackTraceWithoutConstructors, stackTraceSoFar),
      writable: true,
    });
  }
}

module.exports = ExtensibleCustomError;
