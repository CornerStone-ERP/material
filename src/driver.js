/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
const EventEmitter = require("events");
const ioc = require("../index");

const TYPE = Symbol("type");
const OPTIONS = Symbol("options");
const MODELS = Symbol("models");

const drivers = new Map();

module.exports = class Driver extends EventEmitter {
  /**
   * Gets a driver constructor
   * @param {*} type
   */
  static get(type) {
    if (!drivers.has(type)) {
      try {
        drivers.set(type, require("./drivers/" + type));
      } catch (e) {
        /* ignore it */
      }
      if (!drivers.has(type)) {
        throw new Error(`Undefined driver type "${type}"`);
      }
    }
    return drivers[type];
  }

  /**
   * Defines a driver class
   * @param {*} type
   * @param {*} ctor
   */
  static set(type, ctor) {
    drivers.set(type, ctor);
  }

  /**
   * Initialize a new driver
   * @param {*} type
   * @param {*} options
   */
  static create(type, options) {
    const ctor = ioc.Driver.get(type);
    return new ctor(type, options);
  }

  /**
   * Driver constructor (actions depends on driver internal connection)
   * @param {*} type
   * @param {*} options
   */
  constructor(type, options) {
    super();
    this[TYPE] = type;
    this[OPTIONS] = options;
    this[MODELS] = new Map();
  }

  /**
   * Define a specific model manager
   * @param {*} model
   * @param {*} ctor
   */
  define(model, ctor) {
    this[MODELS].set(model, ctor);
  }

  /**
   * Gets the specified model constructor
   * @param {*} name
   */
  model(name) {
    if (!this[MODELS].has(name)) {
      return ioc.Model;
    }
    return this[MODELS].get(name);
  }

  /**
   * Deploys the specified model table
   * @param {*} transaction
   * @param {*} model
   */
  // eslint-disable-next-line no-unused-vars
  deploy(transaction, model) {
    throw new Error("Not implemented");
  }

  /**
   * Starts a new transaction
   */
  transaction() {
    throw new Error("Not implemented");
  }

  /**
   * Initialize a session instance (for working with models)
   */
  session() {
    const transaction = this.transaction();
    return new ioc.Session(this, transaction);
  }
};
