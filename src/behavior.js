/*!
 * Copyright (C) 2020-2022 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
const ioc = require("../index");

const types = new Map();

module.exports = class Behavior {
  /**
   * Loads a field definition
   * @param {*} type
   */
  static get(type) {
    if (!types.has(type)) {
      try {
        types.set(type, require("./behaviors/" + type));
      } catch (e) {
        /* ignore it */
      }
      if (!types.has(type)) {
        throw new Error(`Undefined behavior type "${type}"`);
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
  static create(model, type, options) {
    const ctor = ioc.Behavior.get(type);
    const result = new ctor(type, model, options);
    return result;
  }

  /**
   * Constructor
   */
  constructor(type, model, options) {
    this._type = type;
    this._model = model;
    this._options = options;
  }

  /**
   * Deploy on the database
   */
  // eslint-disable-next-line no-unused-vars
  deploy(table, model, knex) {
    throw new Error(
      `Behavior ${this._type} not implemented for ${model._name}`
    );
  }
};
