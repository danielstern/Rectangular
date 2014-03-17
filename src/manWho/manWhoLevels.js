angular.module('manWho')
  .service('manWhoLevels', function() {
    var levels = [];

    var level1 = {
      "properties": {
        "height": 600,
        "width": 800,
        "SCALE": 30,
        "worldWidth": 1000,
        "worldHeight": 20
      },
      "elements": [{
        "options": {
          "x": 7.397884612210136,
          "height": 0.21,
          "width": 6.14,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": -0.0018560834137971555,
          "shapeKind": "box",
          "y": 18.601462471463837,
          "id": "757ea502-3484-b006-6aea-99be10cd638b"
        },
        "id": "757ea502-3484-b006-6aea-99be10cd638b"
      }, {
        "options": {
          "x": 19.68875709592279,
          "height": 0.21,
          "width": 6.14,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": 0.007093561486967683,
          "shapeKind": "box",
          "y": 18.652079542343152,
          "id": "93b97c44-1af4-051a-2c5e-e30ad9289f75"
        },
        "id": "93b97c44-1af4-051a-2c5e-e30ad9289f75"
      }, {
        "options": {
          "x": 1.5028804170054877,
          "height": 0.21,
          "width": 6.14,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": 1.568744216271544,
          "shapeKind": "box",
          "y": 12.252559461820644,
          "id": "68e2a76a-f268-e015-fe8b-3e2515fed892"
        },
        "id": "68e2a76a-f268-e015-fe8b-3e2515fed892"
      }, {
        "options": {
          "x": 7.415298869441907,
          "height": 0.21,
          "width": 2.54,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": 0,
          "shapeKind": "box",
          "y": 16.609683144254205,
          "id": "7abe56cf-6fa8-fedc-b47d-556c843facb0"
        },
        "id": "7abe56cf-6fa8-fedc-b47d-556c843facb0"
      }, {
        "options": {
          "x": 3.7000012850144675,
          "height": 0.21,
          "width": 2.54,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": 0,
          "shapeKind": "box",
          "y": 11.685484794059256,
          "id": "52cffc18-442e-ddb8-1dba-174cf01618d4"
        },
        "id": "52cffc18-442e-ddb8-1dba-174cf01618d4"
      }, {
        "options": {
          "x": 3.6453669469013326,
          "radius": 0.5,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "friction": 0.5,
          "shapeKind": "circle",
          "y": 9.911601585150148,
          "angle": -10.97169297424836,
          "id": "c8530ba4-1cff-b8de-a633-51dec5755b28"
        },
        "id": "c8530ba4-1cff-b8de-a633-51dec5755b28"
      }, {
        "options": {
          "x": 16,
          "height": 0.21,
          "width": 2.54,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": 0,
          "shapeKind": "box",
          "y": 14,
          "id": "b3bc4d1c-2db9-b799-0cb8-0ce986d52d4e"
        },
        "id": "b3bc4d1c-2db9-b799-0cb8-0ce986d52d4e"
      }, {
        "options": {
          "x": 29.70229112824751,
          "height": 0.21,
          "width": 2.54,
          "type": 2,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": 3.141592653589793,
          "shapeKind": "box",
          "y": 49.943333333333364,
          "id": "57072e2b-838f-8f0e-3afc-655fd2713014"
        },
        "id": "57072e2b-838f-8f0e-3afc-655fd2713014"
      }, {
        "options": {
          "x": 23,
          "height": 0.21,
          "width": 2.54,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": -0.4691571274263099,
          "shapeKind": "box",
          "y": 11,
          "id": "732b9ca1-201d-61a9-e8fd-8e1778addc2b"
        },
        "id": "732b9ca1-201d-61a9-e8fd-8e1778addc2b"
      }, {
        "options": {
          "x": 20.323635507169044,
          "height": 0.21,
          "width": 2.54,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": 0,
          "shapeKind": "box",
          "y": 8.635022732584353,
          "id": "4d4a0eb1-bd9e-aef6-ba14-3e5c58be6361"
        },
        "id": "4d4a0eb1-bd9e-aef6-ba14-3e5c58be6361"
      }, {
        "options": {
          "x": 13.908441155972007,
          "height": 0.21,
          "width": 2.54,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": 0,
          "shapeKind": "box",
          "y": 6.3623280657854435,
          "id": "c5fba760-4293-2d5e-552e-1514a05411b4"
        },
        "id": "c5fba760-4293-2d5e-552e-1514a05411b4"
      }, {
        "options": {
          "x": 407.74224220799346,
          "height": 0.21,
          "width": 2.54,
          "type": 2,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": -3.142531880980963,
          "shapeKind": "box",
          "y": 49.940947788736054,
          "id": "ae66a0f6-67d6-def7-198a-317537743cbe"
        },
        "id": "ae66a0f6-67d6-def7-198a-317537743cbe"
      }, {
        "options": {
          "x": 7.418482443191597,
          "height": 0.21,
          "width": 2.54,
          "type": 0,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": 0,
          "shapeKind": "box",
          "y": 3.6623003552888256,
          "id": "0de36f11-d050-3d47-22fc-36923513706a"
        },
        "id": "0de36f11-d050-3d47-22fc-36923513706a"
      }],
      "pins": [{
        "pinId": "b810468c-c25e-cb49-7bda-9c4851d0db63",
        "target": {
          "worldPosX": 1.4666666666666666,
          "worldPosY": 18.6,
          "mousePosX": 44,
          "mousePosY": 558
        },
        "bodyId": "757ea502-3484-b006-6aea-99be10cd638b"
      }, {
        "pinId": "ac52463d-b829-3a1e-8ab7-608b4858ec43",
        "target": {
          "worldPosX": 13.166666666666666,
          "worldPosY": 18.566666666666666,
          "mousePosX": 395,
          "mousePosY": 557
        },
        "bodyId": "757ea502-3484-b006-6aea-99be10cd638b"
      }, {
        "pinId": "2e8e47ae-77e9-2245-4094-8da2aa632c00",
        "target": {
          "worldPosX": 13.8,
          "worldPosY": 18.5,
          "mousePosX": 414,
          "mousePosY": 555
        },
        "bodyId": "93b97c44-1af4-051a-2c5e-e30ad9289f75"
      }, {
        "pinId": "db824686-1ffa-8764-11ce-06cebb0541ca",
        "target": {
          "worldPosX": 25.233333333333334,
          "worldPosY": 18.666666666666668,
          "mousePosX": 757,
          "mousePosY": 560
        },
        "bodyId": "93b97c44-1af4-051a-2c5e-e30ad9289f75"
      }]
    }
    levels.push(level1)
    this.getLevel = function(_levelNumber) {
      return _.clone(levels[_levelNumber - 1]);
    }

  })
