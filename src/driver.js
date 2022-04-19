/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
const EventEmitter = require("events");
const ioc = require("../index");
const knex = require("knex");

const TYPE = Symbol("type");
const OPTIONS = Symbol("options");
const MODELS = Symbol("models");
const CNX = Symbol("connection");

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
    return drivers.get(type);
  }

  /**
   * Defines a driver class
   * @param {*} type
   * @param {*} ctor
   */
  static set(type, ctor) {
    return drivers.set(type, ctor);
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
    this[CNX] = knex({
      client: type,
      connection: options,
    });
  }

  /**
   * Gets the knew instance
   */
  sql() {
    return this[CNX];
  }

  /**
   * Gets an option (if not found return defaults)
   */
  option(name, def = null) {
    if (this[OPTIONS][name]) {
      return this[OPTIONS][name];
    }
    return def;
  }

  /**
   * Define a specific model manager
   * @param {*} model
   * @param {*} ctor
   */
  define(model, ctor) {
    if (!ctor) {
      ctor = new ioc.Model(this, model);
    }
    this[MODELS].set(model, ctor);
    return ctor;
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
    if (!transaction) {
      transaction = this.sql();
    }
    return transaction.schema.createTable(
      model._name.replace(".", "_"),
      function(table) {
        table.increments().primary();
        model._fields.forEach(function(field) {
          field.deploy(table, model, transaction);
        });
        model._behaviors.forEach(function(behavior) {
          behavior.deploy(table, model, transaction);
        });
      }
    );
  }

  /**
   * Starts a new transaction
   * @return Promise<trx>
   */
  transaction() {
    return this[CNX].transaction();
  }

  /**
   * Initialize a session instance (for working with models)
   * @return Promise<Session>
   */
  session() {
    return this.transaction().then((transaction) => {
      return new ioc.Session(this, transaction);
    });
  }
};
