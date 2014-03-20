angular.module('Rectangular')
.service('ngrData',function(ngrState,ngrWorld){

    this.getJSON = function() {
      var r = {};
      r.properties = _.clone(state);
      r.properties.canvas = null;
      r.properties.world = null;
      r.elements = ngrState.getElements();
      r.pins = ngrState.getPins();
      //console.log("Attempting to stringify", r)
      var str = JSON.stringify(r);
      return str;
    }

    this.load = function(json) {
		
		if (!json) throw new Error("You must pass a valid JSON object to load.");

    	var w = ngrWorld;

      console.log(JSON.stringify(json));
      ngrState.setProperties(json.properties);

      _.each(json.elements, function(element) {
        element.options.id = element.id;
        w.addElement(element.options);
      })

      _.each(json.pins, function(pin) {
        var body = w.getBodyById(pin.bodyId);
        if (!body) console.error("Can't find the body for this pin.");
        if (body) w.pin(body, pin.target);
      })
    }

		this.save = this.getJSON;
})