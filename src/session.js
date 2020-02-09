/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
const ioc = require("../index");

/**
 * Decorator
 */
module.exports = class Session extends ioc.Driver {
  /**
   * Initialize a new session
   * @param {*} driver
   * @param {*} transaction
   */
  constructor(driver, transaction) {
    super("session", null);
    this._driver = driver;
    this._transaction = transaction;
    this._models = new Map();
  }
  /**
   * Gets a model instance
   * @param {*} name
   */
  model(name) {
    if (!this._models.has(name)) {
      const ctor = this._driver.model(name);
      this._models.set(name, new ctor(this, name));
    }
    return this._models.get(name);
  }
  /**
   * Deploys the specified model
   * @param {*} model
   */
  deploy(model) {
    this._driver.deploy(this._transaction, model);
  }

  /**
   * Creates an inner transaction
   */
  transaction() {
    // @todo : not sure what to yet ...
    return this;
  }
};
