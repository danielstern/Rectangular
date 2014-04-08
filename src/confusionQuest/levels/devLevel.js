angular.module("ConfusionQuest")
  .service('devLevel', function (ConfusionQuestLevels) {
    ConfusionQuestLevels.addLevel({
      "properties": {
        "canvas": null,
        "scale": 30,
        "fps": 60,
        "gravity": 60,
        "debug": true,
        "zoom": 1,
        "floor": true,
        "room": {
          "width": 120,
          "height": 75,
          "floor": true,
          "roof": false,
          "leftWall": true,
          "rightWall": true
        },
        "worldHeight": 25,
        "worldWidth": 40,
        "speed": 60,
        "world": null
      },
      "elements": [{
        "options": {
          "height": 6,
          "width": 10,
          "x": 23.42337103399111,
          "y": 58.13067258510836,
          "radius": 2,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0.5,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/controls.png",
          "innerAngle": 90,
          "adjacent": 2,
          "opposite": 2,
          "preset": {
            "name": "Wooden Box",
            "shape": "box",
            "skin": {
              "src": "img/box.png",
              "bg": "sprite"
            },
            "userData": {
              "doodad": true
            },
            "presets": {
              "height": 1,
              "width": 1,
              "restitution": 0.2,
              "density": 0.2
            }
          },
          "userData": {
            "doodad": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box",
          "frameWidth": 73,
          "frameHeight": 97,
          "frames": [
            [365, 98, 69, 71, 0, 37, 50],
            [0, 196, 66, 92, 0, 37, 50],
            [438, 0, 69, 92, 0, 37, 50],
            [438, 93, 67, 94, 0, 37, 50],
            [67, 196, 66, 92, 0, 37, 50],
            [0, 0, 72, 97, 0, 37, 50],
            [73, 0, 72, 97, 0, 37, 50],
            [146, 0, 72, 97, 0, 37, 50],
            [0, 98, 72, 97, 0, 37, 50],
            [73, 98, 72, 97, 0, 37, 50],
            [146, 98, 72, 97, 0, 37, 50],
            [219, 0, 72, 97, 0, 37, 50],
            [292, 0, 72, 97, 0, 37, 50],
            [219, 98, 72, 97, 0, 37, 50],
            [365, 0, 72, 97, 0, 37, 50],
            [292, 98, 72, 97, 0, 37, 50]
          ],
          "animations": {
            "run": {
              "frames": [5, 6, 7, 8, 9, 10],
              "next": "stand",
              "speed": 0.2
            },
            "stand": {
              "frames": [5]
            },
            "jump": {
              "frames": [14],
              "next": "stand",
              "speed": 0.03
            }
          },
          "customSrc": "img/controls.png"
        },
        "isShape": true
      }, {
        "options": {
          "height": 2,
          "width": 2,
          "x": 54.07315283243254,
          "y": 72.49500622015756,
          "radius": 1,
          "density": 0.2,
          "friction": 0.5,
          "restitution": 0.2,
          "linearDamping": 0.5,
          "angularDamping": 0,
          "gravityScale": 0.5,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/box.png",
          "innerAngle": 90,
          "adjacent": 2,
          "opposite": 2,
          "preset": {
            "name": "Wooden Box",
            "shape": "box",
            "skin": {
              "src": "img/box.png",
              "bg": "sprite"
            },
            "userData": {
              "doodad": true,
              "isFloor": true
            },
            "presets": {
              "height": 1,
              "width": 1,
              "restitution": 0.2,
              "density": 0.2
            }
          },
          "userData": {
            "doodad": true,
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 2,
          "width": 2,
          "x": 58.08729027631206,
          "y": 68.48809928023371,
          "radius": 1,
          "density": 0.2,
          "friction": 0.5,
          "restitution": 0.2,
          "linearDamping": 0.5,
          "angularDamping": 0,
          "gravityScale": 0.5,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/box.png",
          "innerAngle": 90,
          "adjacent": 2,
          "opposite": 2,
          "preset": {
            "name": "Wooden Box",
            "shape": "box",
            "skin": {
              "src": "img/box.png",
              "bg": "sprite"
            },
            "userData": {
              "doodad": true,
              "isFloor": true
            },
            "presets": {
              "height": 1,
              "width": 1,
              "restitution": 0.2,
              "density": 0.2
            }
          },
          "userData": {
            "doodad": true,
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 2,
          "width": 2,
          "x": 58.08905096291136,
          "y": 72.4950087283984,
          "radius": 1,
          "density": 0.2,
          "friction": 0.5,
          "restitution": 0.2,
          "linearDamping": 0.5,
          "angularDamping": 0,
          "gravityScale": 0.5,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/box.png",
          "innerAngle": 90,
          "adjacent": 2,
          "opposite": 2,
          "preset": {
            "name": "Wooden Box",
            "shape": "box",
            "skin": {
              "src": "img/box.png",
              "bg": "sprite"
            },
            "userData": {
              "doodad": true,
              "isFloor": true
            },
            "presets": {
              "height": 1,
              "width": 1,
              "restitution": 0.2,
              "density": 0.2
            }
          },
          "userData": {
            "doodad": true,
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 90.85655164397838,
          "y": 58.86140780367877,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {},
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frameWidth": 73,
          "frameHeight": 97,
          "frames": [
            [365, 98, 69, 71, 0, 37, 48],
            [0, 196, 66, 92, 0, 37, 48],
            [438, 0, 69, 92, 0, 37, 48],
            [438, 93, 67, 94, 0, 37, 48],
            [67, 196, 66, 92, 0, 37, 48],
            [0, 0, 72, 97, 0, 37, 48],
            [73, 0, 72, 97, 0, 37, 48],
            [146, 0, 72, 97, 0, 37, 48],
            [0, 98, 72, 97, 0, 37, 48],
            [73, 98, 72, 97, 0, 37, 48],
            [146, 98, 72, 97, 0, 37, 48],
            [219, 0, 72, 97, 0, 37, 48],
            [292, 0, 72, 97, 0, 37, 48],
            [219, 98, 72, 97, 0, 37, 48],
            [365, 0, 72, 97, 0, 37, 48],
            [292, 98, 72, 97, 0, 37, 48]
          ],
          "animations": {
            "run": {
              "frames": [6, 7, 8, 9, 8, 7],
              "next": "stand",
              "speed": 0.2
            },
            "stand": {
              "frames": [4]
            },
            "duck": {
              "frames": [0]
            },
            "hurt": {
              "frames": [2],
              "next": "stand"
            },
            "jump": {
              "frames": [3],
              "next": "stand",
              "speed": 0.03
            }
          },
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 30.71670364720172,
          "y": 46.48392247887229,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {},
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frameWidth": 73,
          "frameHeight": 97,
          "frames": [
            [365, 98, 69, 71, 0, 37, 48],
            [0, 196, 66, 92, 0, 37, 48],
            [438, 0, 69, 92, 0, 37, 48],
            [438, 93, 67, 94, 0, 37, 48],
            [67, 196, 66, 92, 0, 37, 48],
            [0, 0, 72, 97, 0, 37, 48],
            [73, 0, 72, 97, 0, 37, 48],
            [146, 0, 72, 97, 0, 37, 48],
            [0, 98, 72, 97, 0, 37, 48],
            [73, 98, 72, 97, 0, 37, 48],
            [146, 98, 72, 97, 0, 37, 48],
            [219, 0, 72, 97, 0, 37, 48],
            [292, 0, 72, 97, 0, 37, 48],
            [219, 98, 72, 97, 0, 37, 48],
            [365, 0, 72, 97, 0, 37, 48],
            [292, 98, 72, 97, 0, 37, 48]
          ],
          "animations": {
            "run": {
              "frames": [6, 7, 8, 9, 8, 7],
              "next": "stand",
              "speed": 0.2
            },
            "stand": {
              "frames": [4]
            },
            "duck": {
              "frames": [0]
            },
            "hurt": {
              "frames": [2],
              "next": "stand"
            },
            "jump": {
              "frames": [3],
              "next": "stand",
              "speed": 0.03
            }
          },
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 79.45267744217095,
          "y": 55.820238833058866,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {},
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frameWidth": 73,
          "frameHeight": 97,
          "frames": [
            [365, 98, 69, 71, 0, 37, 48],
            [0, 196, 66, 92, 0, 37, 48],
            [438, 0, 69, 92, 0, 37, 48],
            [438, 93, 67, 94, 0, 37, 48],
            [67, 196, 66, 92, 0, 37, 48],
            [0, 0, 72, 97, 0, 37, 48],
            [73, 0, 72, 97, 0, 37, 48],
            [146, 0, 72, 97, 0, 37, 48],
            [0, 98, 72, 97, 0, 37, 48],
            [73, 98, 72, 97, 0, 37, 48],
            [146, 98, 72, 97, 0, 37, 48],
            [219, 0, 72, 97, 0, 37, 48],
            [292, 0, 72, 97, 0, 37, 48],
            [219, 98, 72, 97, 0, 37, 48],
            [365, 0, 72, 97, 0, 37, 48],
            [292, 98, 72, 97, 0, 37, 48]
          ],
          "animations": {
            "run": {
              "frames": [6, 7, 8, 9, 8, 7],
              "next": "stand",
              "speed": 0.2
            },
            "stand": {
              "frames": [4]
            },
            "duck": {
              "frames": [0]
            },
            "hurt": {
              "frames": [2],
              "next": "stand"
            },
            "jump": {
              "frames": [3],
              "next": "stand",
              "speed": 0.03
            }
          },
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 26.596091986672384,
          "y": 46.69996883531917,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {},
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frameWidth": 73,
          "frameHeight": 97,
          "frames": [
            [365, 98, 69, 71, 0, 37, 48],
            [0, 196, 66, 92, 0, 37, 48],
            [438, 0, 69, 92, 0, 37, 48],
            [438, 93, 67, 94, 0, 37, 48],
            [67, 196, 66, 92, 0, 37, 48],
            [0, 0, 72, 97, 0, 37, 48],
            [73, 0, 72, 97, 0, 37, 48],
            [146, 0, 72, 97, 0, 37, 48],
            [0, 98, 72, 97, 0, 37, 48],
            [73, 98, 72, 97, 0, 37, 48],
            [146, 98, 72, 97, 0, 37, 48],
            [219, 0, 72, 97, 0, 37, 48],
            [292, 0, 72, 97, 0, 37, 48],
            [219, 98, 72, 97, 0, 37, 48],
            [365, 0, 72, 97, 0, 37, 48],
            [292, 98, 72, 97, 0, 37, 48]
          ],
          "animations": {
            "run": {
              "frames": [6, 7, 8, 9, 8, 7],
              "next": "stand",
              "speed": 0.2
            },
            "stand": {
              "frames": [4]
            },
            "duck": {
              "frames": [0]
            },
            "hurt": {
              "frames": [2],
              "next": "stand"
            },
            "jump": {
              "frames": [3],
              "next": "stand",
              "speed": 0.03
            }
          },
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 7.219665568261738,
          "y": 41.02912576861608,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {},
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frameWidth": 73,
          "frameHeight": 97,
          "frames": [
            [365, 98, 69, 71, 0, 37, 48],
            [0, 196, 66, 92, 0, 37, 48],
            [438, 0, 69, 92, 0, 37, 48],
            [438, 93, 67, 94, 0, 37, 48],
            [67, 196, 66, 92, 0, 37, 48],
            [0, 0, 72, 97, 0, 37, 48],
            [73, 0, 72, 97, 0, 37, 48],
            [146, 0, 72, 97, 0, 37, 48],
            [0, 98, 72, 97, 0, 37, 48],
            [73, 98, 72, 97, 0, 37, 48],
            [146, 98, 72, 97, 0, 37, 48],
            [219, 0, 72, 97, 0, 37, 48],
            [292, 0, 72, 97, 0, 37, 48],
            [219, 98, 72, 97, 0, 37, 48],
            [365, 0, 72, 97, 0, 37, 48],
            [292, 98, 72, 97, 0, 37, 48]
          ],
          "animations": {
            "run": {
              "frames": [6, 7, 8, 9, 8, 7],
              "next": "stand",
              "speed": 0.2
            },
            "stand": {
              "frames": [4]
            },
            "duck": {
              "frames": [0]
            },
            "hurt": {
              "frames": [2],
              "next": "stand"
            },
            "jump": {
              "frames": [3],
              "next": "stand",
              "speed": 0.03
            }
          },
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 10.930807841841588,
          "y": 40.68096622184275,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {},
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frameWidth": 73,
          "frameHeight": 97,
          "frames": [
            [365, 98, 69, 71, 0, 37, 48],
            [0, 196, 66, 92, 0, 37, 48],
            [438, 0, 69, 92, 0, 37, 48],
            [438, 93, 67, 94, 0, 37, 48],
            [67, 196, 66, 92, 0, 37, 48],
            [0, 0, 72, 97, 0, 37, 48],
            [73, 0, 72, 97, 0, 37, 48],
            [146, 0, 72, 97, 0, 37, 48],
            [0, 98, 72, 97, 0, 37, 48],
            [73, 98, 72, 97, 0, 37, 48],
            [146, 98, 72, 97, 0, 37, 48],
            [219, 0, 72, 97, 0, 37, 48],
            [292, 0, 72, 97, 0, 37, 48],
            [219, 98, 72, 97, 0, 37, 48],
            [365, 0, 72, 97, 0, 37, 48],
            [292, 98, 72, 97, 0, 37, 48]
          ],
          "animations": {
            "run": {
              "frames": [6, 7, 8, 9, 8, 7],
              "next": "stand",
              "speed": 0.2
            },
            "stand": {
              "frames": [4]
            },
            "duck": {
              "frames": [0]
            },
            "hurt": {
              "frames": [2],
              "next": "stand"
            },
            "jump": {
              "frames": [3],
              "next": "stand",
              "speed": 0.03
            }
          },
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 5,
          "x": 42.673929348226125,
          "y": 60.79836125612037,
          "radius": 1.5,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "tiled",
          "src": "img/box.png",
          "userData": {
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 5,
          "x": 28.313366716223257,
          "y": 51.62317258510835,
          "radius": 1.5,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "tiled",
          "src": "img/box.png",
          "userData": {
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 5,
          "x": 18.11560787149351,
          "y": 51.62317258510835,
          "radius": 1.5,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "tiled",
          "src": "img/box.png",
          "userData": {
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 5,
          "x": 8.74861219916313,
          "y": 44.73437991618993,
          "radius": 1.5,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "tiled",
          "src": "img/box.png",
          "userData": {
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 16.768521649454694,
          "y": 47.23857900689197,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 21.841099169839772,
          "y": 46.92925255144736,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 44.93048343769462,
          "y": 57.06590274275813,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 39.936098492878976,
          "y": 57.02135428776486,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 3,
          "width": 3,
          "x": 9.251941192855423,
          "y": 31.213060250012184,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/powershoe.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frameWidth": 73,
          "frameHeight": 97,
          "frames": [
            [365, 98, 69, 71, 0, 37, 48],
            [0, 196, 66, 92, 0, 37, 48],
            [438, 0, 69, 92, 0, 37, 48],
            [438, 93, 67, 94, 0, 37, 48],
            [67, 196, 66, 92, 0, 37, 48],
            [0, 0, 72, 97, 0, 37, 48],
            [73, 0, 72, 97, 0, 37, 48],
            [146, 0, 72, 97, 0, 37, 48],
            [0, 98, 72, 97, 0, 37, 48],
            [73, 98, 72, 97, 0, 37, 48],
            [146, 98, 72, 97, 0, 37, 48],
            [219, 0, 72, 97, 0, 37, 48],
            [292, 0, 72, 97, 0, 37, 48],
            [219, 98, 72, 97, 0, 37, 48],
            [365, 0, 72, 97, 0, 37, 48],
            [292, 98, 72, 97, 0, 37, 48]
          ],
          "animations": {
            "run": {
              "frames": [6, 7, 8, 9, 8, 7],
              "next": "stand",
              "speed": 0.2
            },
            "stand": {
              "frames": [4]
            },
            "duck": {
              "frames": [0]
            },
            "hurt": {
              "frames": [2],
              "next": "stand"
            },
            "jump": {
              "frames": [3],
              "next": "stand",
              "speed": 0.03
            }
          },
          "profile": "boots1"
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 5,
          "x": 49.28713612010394,
          "y": 27.540212105319707,
          "radius": 1,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "tiled",
          "src": "img/box.png",
          "userData": {
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 5,
          "x": 24.86764540093334,
          "y": 34.35037705207111,
          "radius": 1,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "tiled",
          "src": "img/box.png",
          "userData": {
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 5,
          "x": 74.43914196407407,
          "y": 21.51734660764121,
          "radius": 1,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "tiled",
          "src": "img/box.png",
          "userData": {
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 19.884121621193742,
          "y": 27.1999375429126,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 23.617454954527084,
          "y": 27.1999375429126,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 27.217454954527085,
          "y": 26.7999375429126,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 29.61745495452709,
          "y": 26.533270876245933,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 37.350788287860425,
          "y": 22.13327087624593,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 45.88412162119377,
          "y": 23.466604209579263,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 49.35078828786044,
          "y": 24.13327087624593,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 53.08412162119377,
          "y": 23.599937542912595,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 58.417454954527116,
          "y": 19.599937542912592,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 62.28412162119378,
          "y": 17.066604209579257,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 66.01745495452712,
          "y": 17.99993754291259,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 70.6841216211938,
          "y": 18.533270876245926,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 73.61745495452712,
          "y": 18.533270876245926,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 76.41745495452713,
          "y": 18.399937542912593,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 78.81745495452714,
          "y": 18.933270876245928,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 77.61745495452713,
          "y": 15.466604209579257,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 74.01745495452712,
          "y": 15.333270876245923,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 70.6841216211938,
          "y": 15.333270876245923,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 7.5,
          "x": 97.72053562063483,
          "y": 16.649453467993993,
          "radius": 1,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "tiled",
          "src": "img/box.png",
          "userData": {
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box",
          "frameWidth": 73,
          "frameHeight": 97,
          "frames": [
            [365, 98, 69, 71, 0, 37, 48],
            [0, 196, 66, 92, 0, 37, 48],
            [438, 0, 69, 92, 0, 37, 48],
            [438, 93, 67, 94, 0, 37, 48],
            [67, 196, 66, 92, 0, 37, 48],
            [0, 0, 72, 97, 0, 37, 48],
            [73, 0, 72, 97, 0, 37, 48],
            [146, 0, 72, 97, 0, 37, 48],
            [0, 98, 72, 97, 0, 37, 48],
            [73, 98, 72, 97, 0, 37, 48],
            [146, 98, 72, 97, 0, 37, 48],
            [219, 0, 72, 97, 0, 37, 48],
            [292, 0, 72, 97, 0, 37, 48],
            [219, 98, 72, 97, 0, 37, 48],
            [365, 0, 72, 97, 0, 37, 48],
            [292, 98, 72, 97, 0, 37, 48]
          ],
          "animations": {
            "run": {
              "frames": [6, 7, 8, 9, 8, 7],
              "next": "stand",
              "speed": 0.2
            },
            "stand": {
              "frames": [4]
            },
            "duck": {
              "frames": [0]
            },
            "hurt": {
              "frames": [2],
              "next": "stand"
            },
            "jump": {
              "frames": [3],
              "next": "stand",
              "speed": 0.3
            }
          }
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 5,
          "x": 81.1086019668029,
          "y": 63.82437776419336,
          "radius": 1.5,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "tiled",
          "src": "img/box.png",
          "userData": {
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 3,
          "width": 3,
          "x": 98.07410797530949,
          "y": 9.170068118754399,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/helmet1.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "helmet1"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 91.03874668778982,
          "y": 11.012215000486501,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 93.03874668780743,
          "y": 13.278881667151186,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 95.70541335447409,
          "y": 14.612215000484518,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 99.17208002114074,
          "y": 15.012215000484517,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 102.2387466878074,
          "y": 13.278881667151186,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 103.30541335447407,
          "y": 10.078881667151194,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 103.43874668780741,
          "y": 6.212215000484536,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 99.57208002114075,
          "y": 3.1455483338178745,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 94.50541335447409,
          "y": 3.678881667151206,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 91.83874668780743,
          "y": 7.0122150004845345,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 2.3,
          "width": 1.24,
          "x": 19.0386544110082,
          "y": 72.1925,
          "radius": 1.5,
          "density": 0.07,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 2,
          "angle": 0,
          "bg": "spritesheet",
          "src": "img/sprites/p1_spritesheet.png",
          "userData": {
            "doodad": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frameWidth": 73,
          "frameHeight": 97,
          "frames": [
            [365, 98, 69, 71, 0, 37, 48],
            [0, 196, 66, 92, 0, 37, 48],
            [438, 0, 69, 92, 0, 37, 48],
            [438, 93, 67, 94, 0, 37, 48],
            [67, 196, 66, 92, 0, 37, 48],
            [0, 0, 72, 97, 0, 37, 48],
            [73, 0, 72, 97, 0, 37, 48],
            [146, 0, 72, 97, 0, 37, 48],
            [0, 98, 72, 97, 0, 37, 48],
            [73, 98, 72, 97, 0, 37, 48],
            [146, 98, 72, 97, 0, 37, 48],
            [219, 0, 72, 97, 0, 37, 48],
            [292, 0, 72, 97, 0, 37, 48],
            [219, 98, 72, 97, 0, 37, 48],
            [365, 0, 72, 97, 0, 37, 48],
            [292, 98, 72, 97, 0, 37, 48]
          ],
          "animations": {
            "run": {
              "frames": [6, 7, 8, 9, 8, 7],
              "next": "stand",
              "speed": 0.2
            },
            "stand": {
              "frames": [4]
            },
            "duck": {
              "frames": [0]
            },
            "hurt": {
              "frames": [2],
              "next": "stand",
              "speed": 0.03
            },
            "jump": {
              "frames": [3],
              "next": "stand",
              "speed": 0.3
            }
          },
          "profile": "questHero"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 38.69864810332655,
          "y": 71.26101844787583,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 42.96531476999322,
          "y": 71.1276851145425,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 47.89864810332656,
          "y": 69.39435178120917,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 52.831981436659895,
          "y": 66.59435178120916,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 57.498648103326566,
          "y": 63.66101844787582,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 57.498648103326566,
          "y": 60.72768511454249,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 67.02366213628432,
          "y": 56.268418115886405,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 5,
          "x": 97.55379533451442,
          "y": 42.85808483224817,
          "radius": 1,
          "density": 0,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "tiled",
          "src": "img/box.png",
          "userData": {
            "isFloor": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "skin": {
            "name": "Boxy",
            "type": "boxy",
            "src": "img/box.png"
          },
          "shapeKind": "box"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 86.46794762566229,
          "y": 17.450546479974513,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 86.30128095899562,
          "y": 21.783879813307838,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 85.96794762566229,
          "y": 26.783879813307827,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 89.46794762566229,
          "y": 30.617213146641156,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 91.96794762566228,
          "y": 33.950546479974484,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 2,
          "width": 2,
          "x": 97.58060561908147,
          "y": 38.528217976615636,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/gemRed.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "ruby"
        },
        "isShape": true
      }, {
        "options": {
          "height": 2,
          "width": 2,
          "x": 80.90234092677966,
          "y": 59.35208669390308,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/keyRed.png",
          "userData": {},
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "keyRed"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 77.04174071302354,
          "y": 61.08114185757124,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 79.48618515746799,
          "y": 61.970030746460125,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 82.37507404635687,
          "y": 61.52558630201568,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 83.7084073796902,
          "y": 57.08114185757125,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 71.70840737969021,
          "y": 58.858919635349025,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 1,
          "width": 1,
          "x": 62.15285182413469,
          "y": 58.192252968682354,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/coinGold.png",
          "userData": {
            "doodad": true,
            "isCoin": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "profile": "confCoin"
        },
        "isShape": true
      }, {
        "options": {
          "height": 4,
          "width": 4,
          "x": 108.42444768720014,
          "y": 68.40893258462663,
          "radius": 1,
          "density": 0.2,
          "friction": 0.2,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 1,
          "type": 0,
          "angle": 0,
          "bg": "sprite",
          "src": "img/lock_red.png",
          "userData": {},
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "index": 0,
          "profile": "doorRed"
        },
        "isShape": true
      }, {
        "options": {
          "height": 3,
          "width": 1.5,
          "x": 67.55499257977694,
          "y": 69.79590594513915,
          "radius": 1.5,
          "density": 0.07,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 2,
          "angle": 0,
          "bg": "spritesheet",
          "src": "img/sprites/mahakana.png",
          "userData": {
            "doodad": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frames": {
            "width": 78,
            "height": 110,
            "regX": 44,
            "regY": 50
          },
          "frameWidth": 54,
          "frameHeight": 70,
          "animations": {
            "stand": {
              "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
              "speed": 0.2
            }
          },
          "profile": "enemy1"
        },
        "isShape": true
      }, {
        "options": {
          "height": 3,
          "width": 1.5,
          "x": 15.946015767730529,
          "y": 42.394434119934814,
          "radius": 1.5,
          "density": 0.07,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 2,
          "angle": 0,
          "bg": "spritesheet",
          "src": "img/sprites/mahakana.png",
          "userData": {
            "doodad": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frames": {
            "width": 78,
            "height": 110,
            "regX": 44,
            "regY": 50
          },
          "frameWidth": 54,
          "frameHeight": 70,
          "animations": {
            "stand": {
              "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
              "speed": 0.2
            }
          },
          "profile": "enemy1"
        },
        "isShape": true
      }, {
        "options": {
          "height": 3,
          "width": 1.5,
          "x": 48.77934910106381,
          "y": 13.969434119935094,
          "radius": 1.5,
          "density": 0.07,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 2,
          "angle": 0,
          "bg": "spritesheet",
          "src": "img/sprites/mahakana.png",
          "userData": {
            "doodad": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frames": {
            "width": 78,
            "height": 110,
            "regX": 44,
            "regY": 50
          },
          "frameWidth": 54,
          "frameHeight": 70,
          "animations": {
            "stand": {
              "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
              "speed": 0.2
            }
          },
          "profile": "enemy1"
        },
        "isShape": true
      }, {
        "options": {
          "height": 3,
          "width": 1.5,
          "x": 73.77934910106376,
          "y": 7.21610078660166,
          "radius": 1.5,
          "density": 0.07,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 0.4,
          "type": 2,
          "angle": 0,
          "bg": "spritesheet",
          "src": "img/sprites/mahakana.png",
          "userData": {
            "doodad": true
          },
          "shape": {
            "name": "Rectangle",
            "type": "box"
          },
          "shapeKind": "box",
          "frames": {
            "width": 78,
            "height": 110,
            "regX": 44,
            "regY": 50
          },
          "frameWidth": 54,
          "frameHeight": 70,
          "animations": {
            "stand": {
              "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
              "speed": 0.2
            }
          },
          "profile": "enemy1"
        },
        "isShape": true
      }, {
        "options": {
          "height": 0.5,
          "width": 60,
          "x": 60,
          "y": 75,
          "radius": 1.5,
          "density": 0.4,
          "friction": 0.3,
          "restitution": 0.2,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 1,
          "type": 0,
          "angle": 0,
          "isFloor": 1,
          "shapeKind": "box",
          "src": "img/stoneMid.png",
          "bg": "tiled",
          "userData": {
            "isFloor": true
          },
          "memo": "floor"
        },
        "isShape": true
      }, {
        "options": {
          "height": 37.5,
          "width": 1,
          "x": 0,
          "y": 37.5,
          "radius": 1.5,
          "density": 0.5,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 1,
          "type": 0,
          "angle": 0,
          "shapeKind": "box",
          "src": "img/snowCenter.png",
          "bg": "tiled",
          "memo": "leftWall"
        },
        "isShape": true
      }, {
        "options": {
          "height": 37.5,
          "width": 1,
          "x": 120,
          "y": 37.5,
          "radius": 1.5,
          "density": 0.5,
          "friction": 0.2,
          "restitution": 0.1,
          "linearDamping": 0,
          "angularDamping": 0,
          "gravityScale": 1,
          "type": 0,
          "angle": 0,
          "shapeKind": "box",
          "src": "img/snowCenter.png",
          "bg": "tiled",
          "memo": "rightWall"
        },
        "isShape": true
      }]
    });

  });
