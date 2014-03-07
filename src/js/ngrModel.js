angular.module('Rectangular')
.service('ngrModels',function(){
  this.floor = function(options) {
    var defaults = {
      width:envWidth / SCALE,
      height: 10 / SCALE,
      position:'static',
      y: envHeight / SCALE,
    };

    options = _.extend(defaults,options);
    
    var shape = ngrBox.shape('box',options);
    return shape;
  }

  this.leftWall = function(options) {

    return ngrBox.shape('box',{
      width: 10 / SCALE,
      height: envHeight / SCALE,
      position:'static',
      x:0
    });
  }

  this.rightWall = function(options) {
    return ngrBox.shape('box',{
      width: 10 / SCALE,
      height: envHeight / SCALE,
      position:'static',
      x: (envWidth / SCALE),
    });
  }
})