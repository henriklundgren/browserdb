import _ from 'lodash-es';
import factory from './factory';
import state from './state';

export default function open() {
  const {
    databaseName,
    databaseVersion,
    schema,
    storeName,
    storeOptions,
  } = state;
  const request = window.indexedDB.open(databaseName, databaseVersion);

  return new Promise(function promiseHandler(resolve, reject) {
    let database;

    function successHandler(event) {
      database = event.target.result;
      return resolve(factory(database, storeName, schema.parse));
    }

    /**
     * upgradeneededHandler is called when a version change is made.
     * A version change is made either by the user or the first time a Database is created.
     * It depends on if the current request is a structural change transaction.
     *
     * Structural changes include creating and deleting object stores, or adding indexes.
     */
    function upgradeneededHandler(event) {
      const {
        oldVersion,
        newVersion,
      } = event;

      if (oldVersion < newVersion) {
        database = event.target.result;
        /**
         * We wont be able to do a structural change on a
         * existing store,
         * @see http://stackoverflow.com/a/17772759
         */
        if (_.includes(database.objectStoreNames, storeName)) {
          database.deleteObjectStore(storeName);
        }

        database.createObjectStore(storeName, storeOptions);
      }
    }

    request.addEventListener(
      'error',
      reject,
      false
    );
    request.addEventListener(
      'success',
      successHandler,
      false
    );
    request.addEventListener(
      'upgradeneeded',
      upgradeneededHandler,
      false
    );
  });
}

