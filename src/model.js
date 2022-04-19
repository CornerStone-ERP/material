/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
const ioc = require("../index");

module.exports = class Model {
  constructor(driver, name) {
    this._driver = driver;
    this._name = name;
    this._behaviors = new Map();
    this._fields = new Map();
    this._indexes = {};
    this._records = new Map();
  }
  deploy(trx) {
    return this._driver.deploy(trx, this);
  }
  hasField(field) {
    return this._fields.has(field);
  }
  getField(field) {
    const result = this._fields.get(field);
    if (result === undefined) {
      throw new Error(`Undefined field "${this._name}.${field}"`);
    }
    return result;
  }
  setBehavior(type, options) {
    this._behaviors.set(type, ioc.Behavior.create(this, type, options));
    return this._behaviors.get(type);
  }
  addField(field, type, options) {
    if (this._fields.has(field)) {
      throw new Error(`Field "${this._name}.${field}" already defined`);
    }
    this._fields.set(field, ioc.Field.create(this, field, type, options));
    return this._fields.get(field);
  }
  create(data) {}
  browse(id) {
    if (!this._records.has(id)) {
    }
    return this._records.get(id);
  }
  request() {
    return new ioc.Request(this);
  }
};
