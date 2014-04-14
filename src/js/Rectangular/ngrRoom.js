angular.module('Rectangular')
 .service('ngrRoom', function (ngrWorld, ngrState, ngrStage, ngrModels) {

     var roomBodies = {};
     var e = this;
     var w = ngrWorld;;

     this.floor = function (options) {
       if (roomBodies.floor) roomBodies.floor.crumble();
       var floor = ngrModels.floor(options);
       roomBodies.floor = w.addElement(floor.options);
     }

     this.createRoom = function (options) {
       this.clearRoom();
       var r = ngrState.getState().room;

       if (r.floor) e.floor(options);
       if (r.leftWall) e.leftWall(options);
       if (r.rightWall) e.rightWall(options);
       if (r.roof) e.roof();

     }

     this.clearRoom = function () {

      _.invoke(roomBodies, "crumble");
/*
       if (roomBodies.roof) roomBodies.roof.crumble();
       if (roomBodies.leftWall) (roomBodies.leftWall).crumble();
       if (roomBodies.rightWall) (roomBodies.rightWall).crumble();
       if (roomBodies.floor) (roomBodies.floor).crumble();*/
       roomBodies = {};
     }

     this.roof = function (options) {

       if (roomBodies.roof) roomBodies.roof.crumble();
       var roof = ngrModels.roof(options);
       roomBodies.roof = w.addElement(roof.options);
     }

     this.leftWall = function (options) {

       if (roomBodies.leftWall) roomBodies.leftWall.crumble();
       var leftWall = ngrModels.leftWall(options);
       roomBodies.leftWall = w.addElement(leftWall.options);
     }

     this.rightWall = function (options) {

       if (roomBodies.rightWall) roomBodies.rightWall.crumble();
       var rightWall = ngrModels.rightWall(options);
       roomBodies.rightWall = w.addElement(rightWall.options);
     }

   })
