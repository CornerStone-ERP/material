/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
const ioc = require("../../index");

/**
 * Options :
 * * time : default true
 */
module.exports = class FieldDate extends ioc.Field {
  deploy(table) {
    if (this._options.time === false) {
      return table.date(this._name);
    }
    return table.timestamp(this._name);
  }
};
