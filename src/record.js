/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */

const STATE_NEW = 1;
const STATE_SAVED = 2;
const STATE_DELETED = 3;

module.exports = class Record {
  constructor(model, data, id) {
    this._model = model;
    this._data = data || {};
    this._id = id;
    this._changes = {};
    if (!id) {
      this._state = STATE_NEW;
    } else {
      this._state = STATE_SAVED;
    }
  }
  save() {
    // @todo
  }
  delete() {
    // @todo
    this._state = STATE_DELETED;
  }
};
