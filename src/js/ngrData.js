angular.module('Rectangular')
.service('ngrData',function(ngrState,ngrWorld){

    this.getJSON = function() {
      var r = {};
      r.properties = _.clone(ngrState.getState());
      r.properties.canvas = null;
      r.properties.world = null;
      r.elements = _.map(ngrState.getElements(),function(el){
        
        var def = _.clone(el.definition);
        var pos = el.GetPosition();
        def.options.type = el.GetType();
        def.options.x = pos.x;
        def.options.y = pos.y;
        

        return def;
      })

      console.log("World?",r);
      var str = JSON.stringify(r);
      return str;
    }
	
	this.export = function(json) {
		return (JSON.stringify(json));
	}

    this.load = function(json) {
		
		if (!json) throw new Error("You must pass a valid JSON object to load.");

    	var w = ngrWorld;


      ngrState.setState(json.properties);

      _.each(json.elements, function(element) {
        element.options.id = element.id;
        w.addElement(element.options);
      })

    }

		this.save = this.getJSON;
})