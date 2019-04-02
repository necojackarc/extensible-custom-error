export default class ExtensibleCustomError extends Error {
  constructor(message?: string, error?: Error);
  constructor(error: Error);
}
