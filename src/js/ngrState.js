angular.module('Rectangular')
  .service('ngrState', function() {

    var state;

    this.setProperties = function(_properties) {
      state = _properties;
      window.state = state;

    }

    this.setFocus = function(focus) {
      console.log("Setting focus..", focus);
      //if (!focus.y && focus.y !== 0) state.focusY = focus.y;

      if (!focus.x && focus.x !== 0) state.focusX = focus.x;

      state.focus = focus;
    }


    this.getScale = function() {
      return state.SCALE;
    }

    this.setScale = function(scale) {
      state.SCALE = scale;
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
