angular.module('Rectangular')
  .service('ngrState', function() {

    var state;
    var elements = [];
    var floor;

    this.getJSON = function() {
      var r = {};
      r.properties = state;
      r.elements = elements;
      var str = JSON.stringify(r);
      return str;
    }

    this.setFloor = function(_floor) {
      floor = _floor;
    }

    this.getFloor = function() {
      return floor;
    }

    this.setProperties = function(_properties) {
      state = _properties;
      window.state = state;
    }

    this.addElement = function(elementDef) {
      elements.push(elementDef)
    }

    this.clearElements = function() {
      elements = [];
    }

    this.removeElement = function(body) {

      var elId = body.id;

      elements = _.map(elements,function(_el){
        if (_el.id != elId) return _el;
      });

      elements = _.compact(elements);
    }

    this.getScale = function() {
      return state.SCALE;
    }

    this.setScale = function(scale) {
      state.SCALE = scale;
      return state;
    }

    this.getProperties = function() {
      if (!state) {
        throw new Error("Attempting to access undefined properties.")
      }
      return state;
    };

    this.getState = this.getProperties;
  })
