angular.module('Rectangular')
  .service('ngrState', function(ngrLoop) {

    var state;
    var elements = [];
    var pins = []
    var floor;
    var focus = {x:0,y:0};
    var focusTo = {x:0,y:0};

    this.getJSON = function() {
      var r = {};
      r.properties = state;
      r.elements = elements;
      r.pins = pins;
      var str = JSON.stringify(r);
      return str;
    }

    this.setFloor = function(_floor) {
      floor = _floor;
    }

    this.getFloor = function() {
      return floor;
    }

    this.setFocus = function(_f) {
      focusTo = {x:_f.x,y:_f.y};
  //    focus = {x:_f.x,y:_f.y};
    }

    this.getFocus = function() {
      return focus;
    }

    this.setProperties = function(_properties) {
      state = _properties;
      window.state = state;
    }

    this.addPin = function(pinDef) {
      pins.push(pinDef);
    }

    ngrLoop.addPermanentHook(function(){
     // console.log("Checking focus,",focusTo);
     var inc = 0.1;
      if (Math.abs(focusTo.x - focus.x) < 0.2) {
        focus.x = focusTo.x;
      } else if (focusTo.x > focus.x) {
        focus.x+=inc;
      } else {
        focus.x-=inc;
      }

      if (Math.abs(focusTo.y - focus.y) < 0.2) {

        focus.y = focusTo.y;

      } else  if (focusTo.y > focus.y) {
        focus.y+=inc;
      } else {
        focus.y-=inc;
      }

    })

    this.removePin = function(pinId) {
      pins = _.map(pins,function(_pin){
        //console.log("removing pin...",pinId,_pin)
        if (_pin.pinId != pinId) return _pin;
      })
      pins = _.compact(pins);
    }

    this.addElement = function(elementDef) {
      elements.push(elementDef)
    }

    this.clearElements = function() {
      elements = [];
      pins = [];
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
