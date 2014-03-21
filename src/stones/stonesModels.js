angular.module("Stones")
.service('StonesModels', function () {
    this.box = {
      shapeKind: 'box',
      name: 'box',
      width: 2,
      height: 2,
      density: 0.5,
      userData: {
        doodad: "true"
      },
      friction: 0.2,
      src: 'img/box.png',
      x: 3,
      y: 3
    }

    this.explodingBox = {
      name: 'explodingBox',
      shapeKind: 'box',
      width: 1,
      height: 1,
      density: 0.5,
      restitution: 0.1,
      userData: {
        doodad: "true",
        explosive: true,
      },
      friction: 0.2,
      src: 'img/box-red.png',
      x: 3,
      y: 3

    }

    this.blueBox = {
      shapeKind: 'box',
      name: 'blueBox',
      width: 2,
      height: 1,
      density: 0.5,
      restitution: 0.8,
      userData: {
        doodad: "true"
      },
      friction: 0.2,
      src: 'img/box-blue.png',
      x: 3,
      y: 3
    }

    this.greenBox = {
      name: 'greenBox',
      shapeKind: 'box',
      width: 2,
      height: 1,
      density: 0.5,
      restitution: 0.2,
      friction: 0,
      userData: {
        doodad: "true"
      },
      friction: 0.2,
      src: 'img/box-green.png',
      x: 3,
      y: 3
    }

    this.girder = {
      shapeKind: 'box',
      name: 'girder',
      width: 5,
      height: 0.75,
      userData: {
        doodad: "true"
      },
      density: 3,
      friction: 0.2,
      src: 'img/castleCenter.png',
      x: 3,
      y: 3
    }

    this.wedge = {
      shapeKind: 'triangle',
      name: 'wedge',
      innerAngle: 90,
      opposite: 4,
      userData: {
        doodad: "true"
      },
      adjacent: 12,
      bg: 'tiled',
      src: 'img/snowCenter.png',
      density: 3,
      friction: 0.6,
      src: 'img/castleCenter.png',
      x: 3,
      y: 3
    }

  })