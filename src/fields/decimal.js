/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
const ioc = require("../../index");

module.exports = class FieldDecimal extends ioc.Field {
  deploy(table) {
    return table.decimal(
      this._name,
      this._options.precision || 8,
      this._options.scale || 2
    );
  }
};
