const MISSING_MSG = 'Missing error message';

function invariant(condition, message) {
  if (!condition /** is not meet */) {
    if (!message /** does not exist */) {
      throw new Error(MISSING_MSG);
    }
    throw new Error(`Invariant Violation: ${message}`);
  }
}

export default invariant;

