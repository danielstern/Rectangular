angular.module('Rectangular')
.service('ngrState', function() {
  var properties;
  var state = this;
  this.state = properties;

  this.setProperties = function(_properties) {
    properties = _properties;
    state.SCALE = properties.SCALE;

    window.state = state;

  }

  this.getProperties = function() {
    if (!properties) {
      throw new Error("Attempting to access undefined properties.")
    }
    return properties;
  };

  this.getState = this.getProperties;
})