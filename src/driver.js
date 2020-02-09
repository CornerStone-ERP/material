/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
const EventEmitter = require('events').EventEmitter;
const ioc = require('../index');

const TYPE = Symbol('type');
const OPTIONS = Symbol('options');
const MODELS = Symbol('models');

const drivers = {};

module.exports = class Driver extends EventEmitter {

  static get(type) {
    if (!drivers.hasOwnProperty(type)) {
      try {
        require('./drivers/' + type);
      } catch(e) { /* ignore it */ }
      if (!drivers.hasOwnProperty(type)) {
        throw new Error(`Undefined driver type "${type}"`);
      }
    }
    return drivers[type];
  }

  static set(type, ctor) {
    drivers[type] = ctor;
  }

  static create(type, options) {
    const ctor = ioc.Driver.get(type);
    return new ctor(type, options);
  }

  constructor(type, options) {
    this[TYPE] = type;
    this[OPTIONS] = options;
    this[MODELS] = {};
  }

  define(model, ctor) {
    this[MODELS][model] = ctor;
  }

  model(name) {
    if (!this[MODELS].hasOwnProperty(name)) {
      return ioc.Model;
    }
    return this[MODELS][name];
  }

  transaction() {
    throw new Error('Should return a transaction object');
  }

  session() {
    const transaction = this.transaction();
    return new ioc.Session(this, transaction);
  }
}