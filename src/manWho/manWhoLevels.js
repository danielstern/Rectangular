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
    levels.push(level1);

    var level2 = {
      "properties": {
        "height": 600,
        "width": 800,
        "SCALE": 30,
        "worldWidth": 1000,
        "worldHeight": 20
      },
      "elements": [{
        "options": {
          "height": 0.3,
          "type": 0,
          "friction": 0.3,
          "density": 0.4,
          "restitution": 0.2,
          "isFloor": true,
          "shapeKind": "box",
          "bg": "tiled",
          "userData": {
            "isFloor": true
          },
          "y": 29.99999999999998,
          "width": 500,
          "x": 499.99999999999915,
          "angle": 0,
          "id": "dd15b5db-e29f-29f3-8943-a315c43a9d72"
        },
        "id": "dd15b5db-e29f-29f3-8943-a315c43a9d72"
      }, {
        "options": {
          "x": 15.013451862539126,
          "radius": 0.5,
          "type": 2,
          "restitution": 0.3,
          "density": 0.5,
          "friction": 0.5,
          "shapeKind": "circle",
          "y": 29.200280020751453,
          "angle": 11.71755440724307,
          "id": "56d94865-897c-902b-b3a0-97d2f6a7f09b"
        },
        "id": "56d94865-897c-902b-b3a0-97d2f6a7f09b"
      }, {
        "options": {
          "x": 20.62650178956677,
          "radius": "4.41",
          "type": 2,
          "restitution": 0.3,
          "density": "1.45",
          "friction": 0.5,
          "shapeKind": "circle",
          "y": 25.286375348210786,
          "angle": 4.240939725860788,
          "id": "a135f58a-7c3c-fb32-2e95-3f7f551c1550"
        },
        "id": "a135f58a-7c3c-fb32-2e95-3f7f551c1550"
      }, {
        "options": {
          "x": 23.740614492295993,
          "innerAngle": 60,
          "adjacent": "1",
          "opposite": "1",
          "type": 2,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": "0.82",
          "angle": 8.946588620178293,
          "shapeKind": "triangle",
          "y": 29.69522750720793,
          "id": "b794df23-7472-fb69-8240-6059550a19a7"
        },
        "id": "b794df23-7472-fb69-8240-6059550a19a7"
      }, {
        "options": {
          "x": 12.806395311893144,
          "height": 0.3,
          "width": 5.81,
          "type": 2,
          "restitution": 0.3,
          "density": 0.5,
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": -2.838093540629985,
          "shapeKind": "box",
          "y": 27.669827183613684,
          "id": "b97a4321-ca38-39ef-74f1-36780c13e763"
        },
        "id": "b97a4321-ca38-39ef-74f1-36780c13e763"
      }, {
        "options": {
          "x": 37.88254844125775,
          "height": 3.48,
          "width": 0.5,
          "type": 2,
          "restitution": 0.3,
          "density": "3.14",
          "gravityScale": 0.5,
          "friction": 0.5,
          "angle": -3.143772248244871,
          "shapeKind": "box",
          "y": 26.21136713961476,
          "id": "df634c89-3d32-2349-aeb9-8cefe0468bd1"
        },
        "id": "df634c89-3d32-2349-aeb9-8cefe0468bd1"
      }],
      "pins": [{
        "pinId": "d8572fce-7b60-6cb4-3e9a-8ca93c7dbd95",
        "target": {
          "worldPosX": 15.237154150197629,
          "worldPosY": 29.288537549407113,
          "mousePosX": 257,
          "mousePosY": 494
        },
        "bodyId": "56d94865-897c-902b-b3a0-97d2f6a7f09b"
      }, {
        "pinId": "3952aaee-d629-b431-1947-77256f11eda9",
        "target": {
          "worldPosX": 23.122529644268774,
          "worldPosY": 29.288537549407113,
          "mousePosX": 390,
          "mousePosY": 494
        },
        "bodyId": "b794df23-7472-fb69-8240-6059550a19a7"
      }, {
        "pinId": "0b006d44-45d5-a72c-9f24-77401b9fb17f",
        "target": {
          "worldPosX": 20.51383399209486,
          "worldPosY": 29.881422924901184,
          "mousePosX": 346,
          "mousePosY": 504
        },
        "bodyId": "b794df23-7472-fb69-8240-6059550a19a7"
      }, {
        "pinId": "81d2a00f-f2e1-9ae1-59f9-5188b59eb999",
        "target": {
          "worldPosX": 19.09090909090909,
          "worldPosY": 29.525691699604742,
          "mousePosX": 322,
          "mousePosY": 498
        },
        "bodyId": "b794df23-7472-fb69-8240-6059550a19a7"
      }]
    };
    levels.push(level2);

    this.getLevel = function(_levelNumber) {
      return _.clone(levels[_levelNumber - 1]);
    }

  })
