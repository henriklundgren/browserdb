import './features';
import _ from 'lodash-es';
import schema from './validate';
import open from './open';
import defaults from './defaults';
import state from './state';

/**
 * setter
 * @param {string} [databaseName]
 * @param {number} [databaseVersion]
 * @return {context}
 */
function use(databaseName = defaults.databaseName, databaseVersion = 1) {
  _.set(state, 'databaseVersion', databaseVersion);
  _.set(state, 'databaseName', databaseName);
  return this;
}

/**
 * setter
 * @param {string} storeName
 * @param {browserdb.schema} schema
 * @return {context}
 */
function store(storeName = defaults.storeName, schema) {
  if (schema) {
    _.set(state, 'storeOptions', schema.storeOptions);
    _.set(state, 'schema', schema);
  }
  _.set(state, 'storeName', storeName);
  return this;
}

/**
 * @class
 * @example
 * browserdb.use('foo', 1).store('bar', user).open();
 */
const browserdb = Object.create({
  use,
  store,
  open,
}, {
  version: {
    value: '__VERSION__',
  },
  schema: {
    value: schema,
  },
});

export default browserdb;

