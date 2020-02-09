/*!
 * Copyright (C) 2020 (GPL 3.0 License)
 * This file is part of CornerStone ERP
 * See LICENSE file for full copyright and licensing details.
 * @authors https://github.com/CornerStone-ERP/model/graphs/contributors
 * @url https://cornerstone-erp.com
 */
const services = {};
/**
 * Expose the model layer with a tiny IoC engine
 */
module.exports = {
  register: function(service, ctor) {
    services[service] = ctor;
  },
  ctor(service) {
    if (!services.hasOwnProperty(service)) {
      try {
        services[service] = require('./src/' + service);
      } catch(e) {
        throw new Error(`Undefined service ${service}`);
      }
    }
    return services[service];
  },
  get Model() {
    return this.ctor('model');
  },
  set Model(value) {
    this.register('model', value);
  },
  get Request() {
    return this.ctor('request');
  },
  set Request(value) {
    this.register('request', value);
  },  
  get Driver() {
    return this.ctor('driver');
  },
  set Driver(value) {
    this.register('driver', value);
  },
  get Session() {
    return this.ctor('session');
  },
  set Session(value) {
    this.register('session', value);
  },
  get Record() {
    return this.ctor('record');
  },
  set Record(value) {
    this.register('record', value);
  },
  get Field() {
    return this.ctor('field');
  },
  set Field(value) {
    this.register('field', value);
  }
};