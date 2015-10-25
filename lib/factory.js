import DEFAULTS from './defaults';

/**
 * Make a request object.
 *
 * @param {IDBDatabase} database
 * @param {string} storeName
 * @param {string} mode
 * @param {number} timeout
 * @param {string} method
 * @param {array}
 * @return {IDBRequest}
 */
function request(database, storeName, mode, timeout, method, ...insert) {
  return database
    .transaction([storeName], mode, timeout)
    .objectStore(storeName)
    [method](...insert);
}

/**
 * Object we return in successHandler
 *
 * @param {IDBDatabase} database
 * @param {string} storeName
 * @param {function} parse
 * @return {object}
 */
export default function factory(database, storeName, parse) {
  /**
   * Remove a entry from the store.
   *
   * @param {number|string} key - The key of the entry to remove.
   * @return {IDBEvent}
   */
  function remove(key) {
    return new Promise(function promiseHandler(resolve) {
      request(
        database,
        storeName,
        DEFAULTS.transaction_mode.readwrite,
        DEFAULTS.timeout,
        'delete',
        key
      ).addEventListener('success', resolve, false);
    });
  }

  /**
   * Add or update entry.
   *
   * @param {Any} data
   * @param {string|number} key
   * @return {Promise}
   */
  function put(data, key) {
    const {
      valid,
      parsedData,
    } = parse(data);

    return new Promise(function promiseHandler(resolve, reject) {
      if (valid !== null) {
        return reject(Error(valid));
      }

      request(
        database,
        storeName,
        DEFAULTS.transaction_mode.readwrite,
        DEFAULTS.timeout,
        (key ? 'put' : 'add'),
        parsedData,
        key
      ).addEventListener('success', resolve, false);
    });
  }

  /**
   * Get record
   *
   * @param {number|string} key
   * @return {Promise}
   */
  function get(key) {
    return new Promise(function promiseHandler(resolve) {
      request(
        database,
        storeName,
        DEFAULTS.transaction_mode.readonly,
        DEFAULTS.timeout,
        'get',
        key
      ).addEventListener('success', resolve, false);
    });
  }

  return Object.create({
    remove,
    put,
    get,

    /**
     * FIXME I dont know if we need this., or if this is the right way to do it.
     */
    [storeName]: {
      ping() {
        return 'Response';
      },
    },
  });
}

