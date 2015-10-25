import _ from 'lodash-es';

/**
 * Split passed schema options in two.
 * {@link browserdb.schema} method accepts two argumets, first the dataschema,
 * second the options.
 * The options in turn is two folded, one part is for the schema validation (ie. defaultSchemaOptions),
 * the other part is for the createObjectStore.
 *
 * TODO we could make this easier by actually have a property that is called objectStore.
 *
 * @param {object} options
 * @return {object}
 */
function split(options) {
  /**
   * store options
   * @see https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/createObjectStore
   */
  const defaultStoreOptions = {
    autoIncrement: true,
    unique: true,
  };
  const predicate = ['autoIncrement', 'keyPath', 'unique'];
  const storeOptions = _.reduce(_.pick(options, predicate), function reducer(current, value, key) {
    if (key === 'keyPath') {
      delete current['autoIncrement'];
    }
    _.set(current, key, value);
    return current;
  }, defaultStoreOptions);

  /**
   * schema options (modeled after Mongoose)
   * @see http://mongoosejs.com/docs/guide.html#options
   */
  const defaultSchemaOptions = {
    strict: false,
    minimize: true,
    capped: '1mb',
    validateBeforeSave: true,
    timestamps: false,
  };
  const schemaOptions = _.defaults(_.omit(options, predicate), defaultSchemaOptions);

  return {
    storeOptions,
    schemaOptions,
  };
}

function prepare(data) {
  function mapHandler(value, key) {
    // TODO atm, only turn string value type, to object
    if (!_.isPlainObject(value)) {
      return {
        type: value,
      };
    }
    return value;
  }

  function reduceHandler(current, next, key) {
    if (_.has(next, 'index')) {
      current.indexes.push({
        key,
        idx: next.index,
        unique: next.unique ? true : false,
      });
      delete next['index'];
    }
    _.set(current.schema, key, next);
    return current;
  }

  const mapped = _.mapValues(data, mapHandler);
  return _.reduce(mapped, reduceHandler, {
    indexes: [],
    schema: Object.create(null),
  });
}

/**
 * Parse the schema
 * We have to extract the store options and indexes,
 * and lastly create the schema.
 *
 * @example
 * var user = browserdb.schema({
 *  name: 'string',
 *  age: 'number',
 *  height: 'number',
 * }, {
 *  strict: true,
 *  keyPath: 'name',
 *  unique: true,
 * });
 *
 * @param {object} _schema
 * @param {object} options
 * @return {object}
 */
export default function schema(data, options) {
  const {
    storeOptions,
    schemaOptions,
  } = split(options);

  const {
    indexes,
    schema,
  } = prepare(data);

  /**
   * @param {object} data
   * @param {undefined|string} isUpdate
   * @return {object}
   */
  const parse = function parse(data, isUpdate) {
    return _.reduce(schemaOptions, function reducer(current, next, key) {
      let data = current.parsedData;
      // validateBeforeSave means that we dont save
      // any data to the database if it doesnt validate.
      if (key === 'validateBeforeSave' && next) {
        // TODO make sure that the data is same as valid
      }
      // Remove keys from data to be saved if the value is empty
      if (key === 'minimize' && next) {
        current.parsedData = _.omit(data, function omitter(value) {
          return (_.isUndefined(value) || (_.isString(value) && _.isEmpty(value)));
        });
      }
      // strip invalid keys,
      // similar to validateBeforeSave,
      // but instead of checking type and stuff, it checks keys
      // and only saves predefined keys, stripping out the others.
      if (key === 'strict' && next) {
        current.parsedData = _.pick(data, _.keys(schema));
      }
      // add timestamps to the saved object
      if (key === 'timestamps' && next) {
        if (!isUpdate) {
          _.set(data, 'timestamps.createdAt', new Date().toString());
        } else {
          _.set(data, 'timestamps.updatedAt', new Date().toString());
        }
      }
      // http://stackoverflow.com/questions/1248302/javascript-object-size
      if (key === 'capped' && next) {
        // TODO
      }
      return current;
    }, {
      valid: null,
      parsedData: data,
    });
  };

  // We dont need to return the schema (@see model here), ie much simplier.
  // I have to return [storeOptions, indexes] since that is used for the createStore()
  // Also have to return parse function, that will parse data on the input
  return {
    storeOptions,
    indexes,
    parse,
  };
}

