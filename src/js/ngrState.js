angular.module('Rectangular')
  .service('ngrState', function (ngrLoop, ngrCamera) {

    var state,
      elements = [],
      pins = [];
      


    this.getElements = function () {
      return elements;
    }

    this.getPins = function () {
      return pins;
    }

    this.getZoom = ngrCamera.getZoom;
    this.setZoom = ngrCamera.setZoom;
    this.getFocus = ngrCamera.getFocus;
    this.setFocus = ngrCamera.setFocus;
    this.constrainFocus = ngrCamera.constrainFocus;
    this.constrainZoom = ngrCamera.constrainZoom;
    this.getFocusConstraint = ngrCamera.getFocusConstraint;


    this.getRoom = function () {
      return state.room;
    }

    this.setWorld = function (_world) {
      state.world = _world;
    }

    this.getWorld = function () {
      return state.world;
    }

    this.setRoom = function (_room) {
      state.room = _room;
    }

    this.getRoomCenter = function () {
      return {
        x: state.room.height / 2,
        y: state.room.width / 2
      }
    }

    this.updateRoom = function (_room) {
      if (_room.width) state.room.width = Number(_room.width);
      if (_room.height) state.room.height = Number(_room.height);

      _.each(['floor', 'roof', 'leftWall', 'rightWall'], function (area) {
        if (_room[area] == true) state.room[area] = true;
        if (_room[area] === false) state.room[area] = false;
      })

    }

    this.setRoomHeight = function (_h) {
      state.room.height = Number(_h);
    }

    this.setRoomWidth = function (_w) {
      state.room.width = Number(_w);
    }


    this.setProperties = function (_properties) {
      state = _properties;
    }

    this.update = function(key,value) {
      if (key) state[key] = value;
    }

    this.addPin = function (pinDef) {
      pins.push(pinDef);
    }

  

    this.removePin = function (pinId) {
      pins = _.map(pins, function (_pin) {
        if (_pin.pinId != pinId) return _pin;
      })
      pins = _.compact(pins);
    }

    this.addElement = function (elementDef) {
      elements.push(elementDef)
    }

    this.clearElements = function () {
      elements = [];
      pins = [];
    }

    this.removeElement = function (body) {

      var elId = body.id;

      elements = _.map(elements, function (_el) {
        if (_el.id != elId) return _el;
      });

      elements = _.compact(elements);
    }

    this.getScale = function () {
      return state.SCALE;
    }

    this.setScale = function (scale) {
      state.SCALE = scale;
      return state;
    }

    this.getProperties = function () {
      if (!state) {
        throw new Error("Attempting to access undefined properties.")
      }
      return state;
    };

    this.getState = this.getProperties;
  })
.service('ngrCamera',function(ngrLoop){
  var zoom = 1,
  focus = {
    x: 0,
    y: 0
  },
  focusTo = {
    x: 0,
    y: 0
  },
  zoomTo = 0.15,
  focusConstraint,
  zoomConstraint;

  this.getZoom = function() {
    return zoom;
  }

  this.getFocus = function() {
    return focus;
  }


  this.setFocusOffset = function (_off) {
    focusOffset = _off;
  }


  this.constrainFocus = function (focusBox) {

    focusConstraint = focusBox;

  }

  this.constrainZoom = function (zc) {
    zoomConstraint = zc;
  }


  this.setZoom = function (_z, instant) {

    if (_z) zoomTo = _z;

    if (_z && instant) zoom = _z;
  }



  this.setFocus = function (_f, _inst) {
    focusTo = {
      x: _f.x,
      y: _f.y
    };

    if (focusConstraint) {
      if (focusTo.x < focusConstraint.x) focusTo.x = focusConstraint.x;
      if (focusTo.x > focusConstraint.x + focusConstraint.width) focusTo.x = focusConstraint.x + focusConstraint.width;

      if (focusTo.y < focusConstraint.y) focusTo.y = focusConstraint.y;
      if (focusTo.y > focusConstraint.y + focusConstraint.height) focusTo.y = focusConstraint.y + focusConstraint.height;
    }

    if (_inst) focus = {
      x: _f.x,
      y: _f.y
    };
  };

  this.getFocusConstraint = function () {
    return focusConstraint;
  }

  this.getFocus = function () {
    var focusReturn = {
      x: focus.x,
      y: focus.y,
    };

    return focusReturn;
  }

  ngrLoop.addPermanentHook(function updateFocus() {
    var incX = Math.abs(focusTo.x - focus.x) * 0.05;
    if (Math.abs(focusTo.x - focus.x) < incX * 2) {
      focus.x = focusTo.x;
    } else if (focusTo.x > focus.x) {
      focus.x += incX;
    } else {
      focus.x -= incX;
    }

    var incY = Math.abs(focusTo.y - focus.y) * 0.05;

    if (Math.abs(focusTo.y - focus.y) < incY * 2) {

      focus.y = focusTo.y;

    } else if (focusTo.y > focus.y) {
      focus.y += incY;
    } else {
      focus.y -= incY;
    }


    var incZ = Math.abs(zoomTo - zoom) * 0.05;
    if (zoomTo > zoom) {
      zoom += incZ;
    } else {
      zoom -= incZ;
    }

    if (zoomConstraint) {
      if (zoom < zoomConstraint.min) zoom = zoomConstraint.min;
      if (zoom > zoomConstraint.max) zoom = zoomConstraint.max;
    }

  });

})