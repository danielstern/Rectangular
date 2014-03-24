angular.module('Rectangular')
  .service('ngrState', function (ngrLoop) {

    var state,
      elements = [],
      pins = [];
      


    this.getElements = function () {
      return elements;
    }

    this.getPins = function () {
      return pins;
    }

  

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
      state = state || {};
      _.each(_properties,function(prop,key){
        if (prop !== null) state[key] = prop;
      })
      //state = _properties;
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
