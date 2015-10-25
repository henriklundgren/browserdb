import '../vendor/modernizr-custom';
import invariant from './invariant';

const MSG_INDEXEDDB = `IndexedDB offers a powerful way to store and retrieve data
in the browser. As with server-side databases,
IndexedDB allows us to generate keys, search data, or sort it by a particular field.`;

const MSG_PROMISE = `The Promise object is used for
deferred and asynchronous computations.
A Promise represents an operation that hasn't completed yet,
but is expected in the future.`;

/**
 * Feature check
 */
if (window) {
  invariant(
    window.Modernizr.indexeddb,
    MSG_INDEXEDDB
  );

  invariant(
    window.Modernizr.promises,
    MSG_PROMISE
  );
}

