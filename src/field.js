/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
const ioc = require("../index");

/**
 * Private holder of defined fields by type
 *
 * to extend an existing field :
 *
 * ```js
 * const Field = require('../index').Field;
 * const BooleanField = Field.get('boolean');
 * class CustomBoolean extends BooleanField {
 *    // -- put here the class customi
 * }
 * Field.set('boolean', CustomBoolean);
 * ```
 */
const types = new Map();

/**
 * Defines a field
 */
module.exports = class Field {
  /**
   * Loads a field definition
   * @param {*} type
   */
  static get(type) {
    if (!types.has(type)) {
      try {
        types.set(type, require("./fields/" + type));
      } catch (e) {
        /* ignore it */
      }
      if (!types.has(type)) {
        throw new Error(`Undefined field type "${type}"`);
      }
    }
    return types.get(type);
  }

  /**
   * Defines a new field type
   * @param {*} type
   * @param {*} ctor
   */
  static set(type, ctor) {
    types.set(type, ctor);
  }

  /**
   * Declares a new field
   * @param {*} model
   * @param {*} name
   * @param {*} type
   * @param {*} options
   */
  static create(model, name, type, options) {
    const ctor = ioc.Field.get(type);
    return new ctor(type, model, name, options);
  }

  /**
   * Initialize a field manager
   * @param {*} type
   * @param {*} model
   * @param {*} name
   * @param {*} options
   */
  constructor(type, model, name, options) {
    this._type = type;
    this._model = model;
    this._name = name;
    this._options = options || {};
  }
  /**
   * Deploy on the database
   */
  // eslint-disable-next-line no-unused-vars
  deploy(table, model, knex) {
    throw new Error(`Field ${this._type} not implemented for ${model._name}`);
  }

  /**
   * Updates a value over a record
   * @param {*} record
   * @param {*} value
   */
  write(record, value) {
    record._write(this._name, value);
  }
  /**
   * Reads a value over a record
   * @param {*} record
   */
  read(record) {
    return record._read(this._name);
  }
};
