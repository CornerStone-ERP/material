/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
class Filter {
  constructor(field, type, options) {
    this._field = field;
    this._type = type;
    this._options = options;
  }
}

class Equals extends Filter {
  constructor(field, value) {
    super(field, "=", value);
  }
}

class NotEquals extends Filter {
  constructor(field, value) {
    super(field, "!=", value);
  }
}

class GreaterThan extends Filter {
  constructor(field, value) {
    super(field, ">", value);
  }
}

class LowerThan extends Filter {
  constructor(field, value) {
    super(field, "<", value);
  }
}

class GreaterOrEquals extends Filter {
  constructor(field, value) {
    super(field, ">=", value);
  }
}

class LowerOrEquals extends Filter {
  constructor(request, field, value) {
    super(request, field, "<=", value);
  }
}

class In extends Filter {
  constructor(field, values) {
    if (!Array.isArray(values)) {
      throw new Error("Expecting an array of values");
    }
    super(field, "in", values);
  }
}

class NotIn extends Filter {
  constructor(field, values) {
    if (!Array.isArray(values)) {
      throw new Error("Expecting an array of values");
    }
    super(field, "not in", values);
  }
}

class Between extends Filter {
  constructor(field, min, max) {
    super(field, "between", { min, max });
  }
}

class Like extends Filter {
  constructor(field, pattern) {
    super(field, "like", pattern);
  }
}

class ILike extends Filter {
  constructor(field, pattern) {
    super(field, "ilike", pattern);
  }
}

class IsNull extends Filter {
  constructor(field) {
    super(field, "null", null);
  }
}

class IsNotNull extends Filter {
  constructor(field) {
    super(field, "not null", null);
  }
}

class FilterAnd {
  constructor(parent) {
    this._type = "and";
    this._parent = parent;
    this._criteria = [];
  }
  equals(field, value) {
    this._criteria.push(new Equals(field, value));
    return this;
  }
  notEquals(field, value) {
    this._criteria.push(new NotEquals(field, value));
    return this;
  }
  lower(field, value) {
    this._criteria.push(new LowerThan(field, value));
    return this;
  }
  greater(field, value) {
    this._criteria.push(new GreaterThan(field, value));
    return this;
  }
  lowerEquals(field, value) {
    this._criteria.push(new LowerOrEquals(field, value));
    return this;
  }
  greaterEquals(field, value) {
    this._criteria.push(new GreaterOrEquals(field, value));
    return this;
  }
  in(field, value) {
    this._criteria.push(new In(field, value));
    return this;
  }
  notIn(field, value) {
    this._criteria.push(new NotIn(field, value));
    return this;
  }
  like(field, value) {
    this._criteria.push(new Like(field, value));
    return this;
  }
  iLike(field, value) {
    this._criteria.push(new ILike(field, value));
    return this;
  }
  isNull(field) {
    this._criteria.push(new IsNull(field));
    return this;
  }
  notNull(field) {
    this._criteria.push(new IsNotNull(field));
    return this;
  }
  between(field, min, max) {
    this._criteria.push(new Between(field, min, max));
    return this;
  }
  or() {
    return new FilterOr(this);
  }
  and() {
    return this;
  }
  request() {
    if (this._parent) {
      return this._parent.request();
    }
    return this;
  }
  parent() {
    if (!this._parent) {
      return this;
    }
    return this._parent;
  }
}

class FilterOr {
  or() {
    return this;
  }
  and() {
    return new FilterAnd(this);
  }
}

module.exports = class Request extends FilterAnd {
  constructor(model) {
    super(null);
    this._model = model;
    this._orders = {};
    this._offset = 0;
    this._size = 100;
  }
  limit(size) {
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
};
