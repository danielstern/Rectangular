angular.module('Rectangular')
 .service('ngrRoom', function (ngrWorld, ngrState, ngrStage, ngrModels) {

     var roomBodies = {};
     var e = this;
     var w = ngrWorld;;

     this.floor = function (options) {
       if (roomBodies.floor) w.removeElement(roomBodies.floor);
       var floor = ngrModels.floor(options);
       roomBodies.floor = w.addElement(floor.options);
     }

     this.createRoom = function (options) {
       this.clearRoom();
       var r = ngrState.getRoom();

       if (r.floor) e.floor(options);
       if (r.leftWall) e.leftWall(options);
       if (r.rightWall) e.rightWall(options);
       if (r.roof) e.roof();

     }

     this.clearRoom = function () {
      //console.error("Clearing room...",roomBodies.leftWall);

       if (roomBodies.roof) w.removeElement(roomBodies.roof);
       if (roomBodies.leftWall) w.removeElement(roomBodies.leftWall);
       if (roomBodies.rightWall) w.removeElement(roomBodies.rightWall);
       if (roomBodies.floor) w.removeElement(roomBodies.floor);
       roomBodies = {};
     }

     this.roof = function (options) {

       if (roomBodies.roof) w.removeElement(roomBodies.roof);
       var roof = ngrModels.roof(options);
       roomBodies.roof = w.addElement(roof.options);
     }

     this.leftWall = function (options) {

       if (roomBodies.leftWall) w.removeElement(roomBodies.leftWall);
       var leftWall = ngrModels.leftWall(options);
       roomBodies.leftWall = w.addElement(leftWall.options);
     }

     this.rightWall = function (options) {

       if (roomBodies.rightWall) w.removeElement(roomBodies.rightWall);
       var rightWall = ngrModels.rightWall(options);
       roomBodies.rightWall = w.addElement(rightWall.options);
     }

   })
