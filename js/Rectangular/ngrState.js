angular.module('Rectangular')
  .service('ngrState', function () {

    var state,
      elements = [],
      stateChangeListeners = [];    

    this.getElements = function () {
      return elements;
    }

    this.onstatechange = function(l){
      stateChangeListeners.push(l);
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
