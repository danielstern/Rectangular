angular.module('Rectangular')
  .service('ngrState', function (ngrLoop) {

    var state,
      elements = [],
      stateChangeListeners = [];    

    this.getElements = function () {
      return elements;
    }

    this.onstatechange = function(l){
      stateChangeListeners.push(l);
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

      _.call(stateChangeListeners, state);
    }

    this.setState = function (_properties) {
      state = state || {};
      _.each(_properties,function(prop,key){
        if (prop !== null) state[key] = prop;
      })

      _.call(stateChangeListeners, state);
    }

    this.updateState = function(key,value) {
      if (key) state[key] = value;

      _.call(stateChangeListeners, state);
    }

    this.setElements = function(_elms) {
      elements = _elms;

      _.call(stateChangeListeners, state);
    }
    

    this.getScale = function () {
      return state.scale;
    }


    this.getState = function () {
      return _.clone(state);
    };

  })
