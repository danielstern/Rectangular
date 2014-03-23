angular.module("Stones")
  .service('StonesModels', function () {

    this.focus = {
      x: 20,
      y: 5,
      width: 50,
      height: 25
    }

    this.zoom = {
      min: 0.1,
      max: 2
    }


  })
