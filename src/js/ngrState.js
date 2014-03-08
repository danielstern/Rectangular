angular.module('Rectangular')
.service('ngrState', function() {
  var properties;
  var state = this;
  this.state = properties;
  this.SCALE = 30;

  this.setProperties = function(_properties) {
    properties = _properties;
    state.SCALE = properties.SCALE;

  }

  this.getProperties = function() {
    if (!properties) {
      throw new Error("Attempting to access undefined properties.")
    }
    return properties;
  }
})