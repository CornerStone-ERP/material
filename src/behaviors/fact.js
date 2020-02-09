/**
 * Defining a table + "_fact" with the specified dimensions :
 * - record_id
 * one column on each dimension, ex : dim_date_year
 * on column on the measure value, ex : amount
 *
 * Defining a table + "_summary" used to agregate values depending on measures :
 * one column on each dimension, ex : dim_date_year
 * on column on the measure value, ex : sum(amount)
 *
 * A table contains each dimension entry "fact_dimension" :
 * - id
 * - model_id
 * - record_id
 * - value
 *
 * A table to attach dimension with facts "fact_dimension_facts"
 * - id
 * - dimension_id
 * - fact
 * - count
 */
