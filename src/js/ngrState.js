angular.module('Rectangular')
.service('ngrState', function() {

  var state;

  this.setProperties = function(_properties) {
    state = _properties;
    window.state = state;

  }


  this.getScale = function() {
    return state.SCALE;
  }

  this.setScale = function(scale) {
    state.SCALE = scale;
//    console.log("updated state,",state);
    return state;
  }

  this.setWorldHeight = function(height) {
    state.worldHeight = height;

  }

  this.getProperties = function() {
    if (!state) {
      throw new Error("Attempting to access undefined properties.")
    }
    return state;
  };

  this.getState = this.getProperties;
})