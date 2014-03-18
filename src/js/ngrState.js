angular.module('Rectangular')
  .service('ngrState', function(ngrLoop) {

    var state;
    var elements = [];
    var pins = []
    var focus = {x:0,y:0};
    var focusTo = {x:0,y:0};
    var focusOffset = {x:0,y:0}

    this.getJSON = function() {
      var r = {};
      r.properties = _.clone(state);
      r.properties.canvas = null;
      r.elements = elements;
      r.pins = pins;
      console.log("Attempting to stringify", r)
      var str = JSON.stringify(r);
      return str;
    }

    this.setFocusOffset = function(_off) {
      focusOffset = _off;
    }


    this.getRoom = function() {
      return state.room;
    }

    this.setRoom = function(_room) {
      state.room = _room;
    }

    this.setRoomHeight = function(_h) {
      state.room.height = Number(_h);
    }

    this.setRoomWidth = function(_w) {
      state.room.width = Number(_w);
    }

    this.setZoom = function(_z) {
       if (_z) state.zoom = _z;
     }

     this.getZoom = function() {
      return state.zoom;
     }

    this.setFocus = function(_f, _inst) {
      focusTo = {x:_f.x,y:_f.y};
      if (_inst)    focus = {x:_f.x,y:_f.y};
    }

    this.getFocus = function() {
      return {
        x:focus.x + focusOffset.x,
        y:focus.y + focusOffset.y
      };
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
     var inc = 0.5;
      if (Math.abs(focusTo.x - focus.x) < inc * 2) {
        focus.x = focusTo.x;
      } else if (focusTo.x > focus.x) {
        focus.x+=inc;
      } else {
        focus.x-=inc;
      }

      if (Math.abs(focusTo.y - focus.y) < inc * 2) {

        focus.y = focusTo.y;

      } else  if (focusTo.y > focus.y) {
        focus.y+=inc;
      } else {
        focus.y-=inc;
      }

      state.focus = focus;

    })

    this.removePin = function(pinId) {
      pins = _.map(pins,function(_pin){
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
