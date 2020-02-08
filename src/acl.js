/**
 * Controls the way to access on objects
 */
module.exports = {
  canCreate: function(record) {
    return true;
  },
  canRead: function(record) {
    return true;
  },
  canUpdate: function(record) {
    return true;
  },
  canDelete: function(record) {
    return true;
  },
  getRequest: function(model) {
    return true;
  }
};