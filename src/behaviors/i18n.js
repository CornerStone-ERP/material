/**
 * Can translate a list of fields.
 *
 * Creates a related table + "_i18n" with fields :
 * - record_id
 * - lang
 * - translated
 * - translated_by
 * - translated_at
 * + translatable fields
 *
 * On the select request automatically injects inner join
 *
 */
const ioc = require("../../index");

module.exports = class Sortable extends ioc.Behavior {
  deploy(table, model, knex) {}
};
