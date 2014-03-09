angular.module('BallAgent')
  .service('BallAgentLevels', function()
    {
      this.levels = [
      {
        lWall: true,
        rWall: true,
        floor: true,
        levelName: "Infiltration",
      },
      {
        lWall: true,
        rWall: true,
        floor: true,
        levelName: "A Piece of Cake",
        exit:
        {
          y: 12,
          x: 4
        },
        platforms: [
        {
          x: 4,
          y: 13,
          width: 2
        },
        {
          x: 17,
          y: 15,
          width: 2
        }]
      },
      {
        // level 3
        lWall: true,
        rWall: true,
        floor: true,
        levelName: "Travelling",
        exit:
        {
          y: 9,
          x: 17
        },
        platforms: [
        {
          x: 4,
          y: 13,
          width: 2.5
        },
        {
          x: 17,
          y: 15,
          width: 2
        }, ]
      },
      {
        // level 4
        lWall: false,
        rWall: false,
        floor: false,
        levelName: "Cerberus",
        exit:
        {
          y: 10,
          x: 17
        },
        platforms: [
        {
          x: 3,
          y: 13,
          width: 2
        },
        {
          x: 10,
          y: 12,
          width: 2
        },
        {
          x: 17,
          y: 11,
          width: 2
        }]
      },
      {
        // level 5
        lWall: false,
        rWall: false,
        floor: false,
        levelName: "Delta Strike",
        exit:
        {
          y: 9,
          x: 20
        },
        platforms: [
        {
          x: 3,
          y: 13,
          width: 1.8
        },
        {
          x: 9,
          y: 12,
          width: 1.8
        },
        {
          x: 14,
          y: 11,
          width: 1.8
        },
        {
          x: 20,
          y: 10,
          width: 2.3
        }]
      },
      {
        // level 6
        lWall: true,
        rWall: false,
        floor: false,
        levelName: "A Leap of Faith",
        exit:
        {
          y: 9.3,
          x: 19
        },
        platforms: [
          {
            x: 2.5,
            y: 11,
            width: 2.1
          },

        ]
      },
      {
        // level 7
        lWall: false,
        rWall: false,
        floor: false,
        levelName: "Catch-22",
        exit:
        {
          y: 9.3,
          x: 19
        },
        platforms: [
          {
            x: 2.5,
            y: 4,
            width: 2.1
          },
          {
            x: 19,
            y: 7,
            width: 1.5
          },
          {
            x: 12,
            y: 11,
            width: 2
          },

        ]
      },
      {
        // level 8
        lWall: false,
        rWall: false,
        floor: false,
        levelName: "Geronimo!",
        exit:
        {
          y: 11.3,
          x: 19
        },
        platforms: [
          {
            x: 2.5,
            y: 4,
            width: 2.1
          },


        ]
      },
      {
        // level 9
        lWall: false,
        rWall: false,
        floor: false,
        levelName: "Vertigo",
        exit:
        {
          y: 12,
          x: 20
        },
        platforms: [
          {
            x: 2,
            y: 15,
            width: 1.2
          },
          {
            x: 7,
            y: 13,
            width: 1.2
          },
          {
            x: 12,
            y: 11,
            width: 1.2
          },
          {
            x: 17,
            y: 9,
            width: 1.2
          },


        ]
      },
      {
        // level 10
        lWall: true,
        rWall: true,
        floor: true,
        levelName: "Movin’ On Up",
        background: 'img/fog-bg.jpg',
        exit:
        {
          y: 12,
          x: 20
        },
        platforms: [
        {
          x: 2,
          y: 15,
          width: 1.2
        }, ],
        columns: [
        {
          x: 10,
          y: 15,
          width: 0.3,
          height: 10,
          friction: 25,
        }]
      },
      {
        // level 11
        lWall: true,
        rWall: false,
        floor: false,
        background: 'img/fog-bg.jpg',
        levelName: "Good Luck",
        exit:
        {
          y: 10,
          x: 20
        },
        platforms: [
        {
          x: 2,
          y: 15,
          width: 2
        }, ],
        columns: [
        {
          x: 10,
          y: 15,
          width: 0.3,
          height: 9,
          friction: 25,
        }]
      },
      {
        // level 12
        lWall: false,
        rWall: false,
        floor: false,
        levelName: "Stairway to Heaven",
        background: 'img/fog-bg.jpg',
        exit:
        {
          y: 4,
          x: 18
        },
        platforms: [
        {
          x: 2,
          y: 15,
          width: 2
        }, ],
        columns: [
        {
          x: 10,
          y: 15,
          width: 0.3,
          height: 3,
          friction: 25,
        },
        {
          x: 15,
          y: 8,
          width: 0.3,
          height: 3,
          friction: 25,
        }]
      },
      {
        // level 13
        lWall: false,
        rWall: false,
        floor: false,
        levelName: "On a Roll",
        background: 'img/fog-bg.jpg',
        exit:
        {
          y: 3,
          x: 20
        },
        platforms: [
        {
          x: 2,
          y: 15,
          width: 2
        },
        {
          x: 12,
          y: 10,
          width: 3
        }, ],
        columns: [
        {
          x: 8,
          y: 15,
          width: 0.3,
          height: 3,
          friction: 25,
        },
        {
          x: 17,
          y: 6,
          width: 0.3,
          height: 3,
          friction: 25,
        }]
      },
      {
        // level 14
        lWall: true,
        rWall: true,
        floor: false,
        levelName: "The One with the Moving Platform",
        background: 'img/fog-bg.jpg',
        exit:
        {
          y: 13,
          x: 20
        },
        platforms: [
        {
          x: 12,
          y: 15,
          width: 2,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            shiftY: 0,
            shiftX: 1,
            period: 2,
          }
        },
        {
          x: 2,
          y: 15,
          width: 2
        }, ]
      },
      {
        // level 15
        lWall: true,
        rWall: true,
        floor: false,
        background: 'img/fog-bg.jpg',
        levelName: "Two’s Company",
        exit:
        {
          y: 11,
          x: 22
        },
        platforms: [
        {
          x: 12,
          y: 15,
          width: 1.5,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            shiftY: 0,
            shiftX: 1,
            period: 2,
            phaseShift: 2,
          }
        },
        {
          x: 18,
          y: 14,
          width: 1.5,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            shiftY: 0,
            shiftX: 1,
            period: 2,
          }
        },
        {
          x: 2,
          y: 15,
          width: 2
        }, ]
      },
      {
        // level 16
        lWall: true,
        rWall: true,
        floor: false,
        levelName: "A View to a Kill",
        background: 'img/fog-bg.jpg',
        exit:
        {
          y: 11,
          x: 22
        },
        platforms: [
        {
          x: 12,
          y: 15,
          width: 1.5,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            shiftY: 0,
            shiftX: 1,
            period: 2,
            phaseShift: 2,
          }
        },
        {
          x: 2,
          y: 4,
          width: 2
        }, ]
      },
      {
        // level 17
        lWall: true,
        rWall: true,
        floor: false,
        levelName: "Up the Downstairs",
        background: 'img/fog-bg.jpg',
        exit:
        {
          y: 4,
          x: 22
        },
        platforms: [
        {
          x: 12,
          y: 15,
          width: 2.5,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            shiftY: 0,
            shiftX: 1,
            period: 2,
            phaseShift: 2,
          }
        },
        {
          x: 2,
          y: 4,
          width: 2
        }, ],
        columns: [
        {
          x: 17,
          y: 8,
          width: 0.3,
          height: 4,
          friction: 25,
        }]
      },
      {
        // level 18
        lWall: false,
        rWall: false,
        background: 'img/fog-bg.jpg',
        levelName: "Midnight Exchange",
        floor: false,
        exit:
        {
          y: 4,
          x: 22
        },
        platforms: [
        {
          x: 15,
          y: 6,
          width: 3,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            shiftY: 0,
            shiftX: 1,
            period: 2,
            phaseShift: 2,
          }
        },
        {
          x: 2,
          y: 13,
          width: 2
        }, ],
        columns: [
        {
          x: 6,
          y: 8,
          width: 0.3,
          height: 4,
          friction: 25,
        }]
      },
      {
        // level 19
        lWall: false,
        rWall: true,
        floor: false,
        levelName: "A Game of Balls",
        background: 'img/fog-bg.jpg',
        exit:
        {
          y: 12,
          x: 22
        },
        platforms: [
        {
          x: 15,
          y: 6,
          width: 3,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            shiftY: 0,
            shiftX: 1,
            period: 2,
            phaseShift: 2,
          }
        },
        {
          x: 2,
          y: 13,
          width: 2
        }, ],
        columns: [
        {
          x: 6,
          y: 8,
          width: 0.3,
          height: 4,
          friction: 25,
        }]
      },
      {
        // level 20
        lWall: true,
        rWall: true,
        floor: true,
        levelName: "Go for a Spin",
        background: 'img/desert-bg.jpg',
        exit:
        {
          y: 11,
          x: 22
        },
        platforms: [
        {
          x: 15,
          y: 11,
          width: 3,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            rotation: 1,
          }
        }, 
      ],

      },
      {
        // level 21
        lWall: true,
        rWall: true,
        floor: false,
        levelName: "Timed Attack",
        background: 'img/desert-bg.jpg',
        exit:
        {
          y: 12,
          x: 22
        },
        platforms: [
        {
          x: 15,
          y: 11,
          width: 3,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            rotation: 1,
          }
        },
        {
          x: 2,
          y: 13,
          width: 3
        } 
      ],

      },
      {
        // level 22
        lWall: true,
        rWall: true,
        floor: false,
        levelName: "Sand Dune",
        background: 'img/desert-bg.jpg',
        exit:
        {
          y: 9,
          x: 22
        },
        platforms: [
        {
          x: 10,
          y: 11,
          width: 2,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            rotation: 1,
          }
        },
        {
          x: 17,
          y: 10,
          width: 2,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            rotation: 1,
            phaseShift: 0.5,
          }
        },
        {
          x: 2,
          y: 12,
          width: 3
        } 
      ],

      },
      {
        // level 23
        lWall: true,
        rWall: true,
        floor: false,
        levelName: "Something in the Way",
        background: 'img/desert-bg.jpg',
        exit:
        {
          y: 8,
          x: 22
        },
        platforms: [
        {
          x: 10,
          y: 11,
          width: 2,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            rotation: 1,
          }
        },
        {
          x: 17,
          y: 10,
          width: 2.5,
          height: 0.2,
          friction: 100,
          moves: true,
          movement:
          {
            rotation: 1,
            phaseShift: 0.5,
          }
        },
        {
          x: 2.5,
          y: 12,
          width: 2
        } 
      ],
      columns: [
      {
        x: 6,
        y: 8,
        width: 0.3,
        height: 4,
        friction: 25,
        movement:
        {
          shiftY: 0,
          shiftX: 1,
          period: 1,
          phaseShift: 2,
        }
      }]

      },
      {
        // level 24
        lWall: true,
        rWall: false,
        floor: false,
        levelName: "On a Plain",
        background: 'img/desert-bg.jpg',
        exit:
        {
          y: 8,
          x: 22
        },
        platforms: [
        {
          x: 13,
          y: 10,
          width: 2.5,
          height: 0.2,
          friction: 100,
        },
        {
          x: 2.5,
          y: 12,
          width: 2
        } 
      ],
      columns: [
      {
        x: 20,
        y: 8,
        width: 0.3,
        height: 4,
        friction: 25,
        movement:
        {
          shiftY: 3,
          shiftX: 0,
          period: 3,
          phaseShift: 2,
        }
      }]

      },

]
}

)
