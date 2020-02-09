/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
class Filter {
  constructor(request, field, type, options) {
    this._request = request;
    this._field = field;
    this._type = type;
    this._options = options;
  }
}

class Equals extends Filter {
  constructor(request, field, value) {
    super(request, field, '=', value);
  }
}

class NotEquals extends Filter {
  constructor(request, field, value) {
    super(request, field, '!=', value);
  }
}

class GreaterThan extends Filter {
  constructor(request, field, value) {
    super(request, field, '>', value);
  }
}

class LowerThan extends Filter {
  constructor(request, field, value) {
    super(request, field, '<', value);
  }
}

class GreaterOrEquals extends Filter {
  constructor(request, field, value) {
    super(request, field, '>=', value);
  }
}

class LowerOrEquals extends Filter {
  constructor(request, field, value) {
    super(request, field, '<=', value);
  }
}

class In extends Filter {
  constructor(request, field, values) {
    if (!Array.isArray(values)) {
      throw new Error('Expecting an array of values');
    }
    super(request, field, 'in', values);
  }
}

class NotIn extends Filter {
  constructor(request, field, values) {
    if (!Array.isArray(values)) {
      throw new Error('Expecting an array of values');
    }
    super(request, field, 'not in', values);
  }
}

class Between extends Filter {
  constructor(request, field, min, max) {
    super(request, field, 'between', { min, max });
  }
}

class Like extends Filter {
  constructor(request, field, pattern) {
    super(request, field, 'like', pattern);
  }
}

class ILike extends Filter {
  constructor(request, field, pattern) {
    super(request, field, 'ilike', pattern);
  }
}

class IsNull extends Filter {
  constructor(request, field) {
    super(request, field, 'null', null);
  }
}

class IsNotNull extends Filter {
  constructor(request, field) {
    super(request, field, 'not null', null);
  }
}


module.exports = class Request {
  constructor(model) {
    this._model = model;
    this._criteria = [];
    this._orders = {};
    this._offset = 0;
    this._size = 100;
  }
  limit(size)  {
    this._size = size;
    return this;
  }
  offset(offset) {
    this._offset = offset;
  }
  orderAsc(field) {
    this._orders[field] = true;
    return this;
  }
  orderDesc(field) {
    this._orders[field] = false;
    return this;
  }
}