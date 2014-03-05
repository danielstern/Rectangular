angular.module('Rectangular')
.directive('ngCircle',function(ngWorld, ngBox,display){

	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
  		var circle = ngBox.shape("ellipse",attrs);
  		var body = ngWorld.addElement(circle);
  		var radius = circle.f.shape.m_radius;
  		attrs.radius = radius;
  		var actor = display.skin(body,attrs);
  		body.SetUserData(actor); 
		}
	}
})

.directive('ngBox',function(ngWorld, ngBox,display){
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
  		var box = ngBox.shape("box",attrs)
  		var body = ngWorld.addElement(box);

  		var vertices = box.f.shape.m_vertices;
  		var width = vertices[1].x - vertices[0].x;
  		var height = vertices[1].y- vertices[3].y;

  		attrs.height = height;
  		attrs.width = width;

  		console.log("Attrs?",attrs);

  		var actor = display.skin(body,attrs);
		}
	}
})