angular.module("ConfusionQuest")
.service("ConfusionQuestSFX",function(){

  this.explosion1 = {
    skin: {
      src: 'img/sprites/explosion1.png',
      bg: 'spritesheet',
      framerate: 90,
      frames: {
        width: 123,
        height: 120,
        regX: 65,
        regY: 95,

      },
      frameWidth: 150,
      frameHeight: 150,
      animations: {
        explode: {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          speed: 0.4,
          next: 'hide'
        },
        hide: [21]
      }
    },
  };

  this.explosion1Big = {
    skin: {
      src: 'img/sprites/explosion1.png',
      bg: 'spritesheet',
      framerate: 90,
      frames: {
        width: 123,
        height: 120,
        regX: 65,
        regY: 95,

      },
      frameWidth: 50,
      frameHeight: 50,
      animations: {
        explode: {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          speed: 0.4,
          next: 'hide'
        },
        hide: [21]
      }
    },
  };

  this.explosion2 = {
    skin: {
      src: 'img/sprites/explosion2.png',
      bg: 'spritesheet',
      framerate: 90,
      frames: {
        width: 283,
        height: 312,
        regX: 142,
        regY: 156,

      },
      frameWidth: 280,
      frameHeight: 280,
      animations: {
        explode: {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          speed: 0.4,
          next: 'hide'
        },
        hide: [21]
      }
    },
  }

  this.explosion3 = {
    skin: {
      src: 'img/sprites/explosion3.png',
      bg: 'spritesheet',
      frames: {
        width: 152,
        height: 120,
        regX: 76,
        regY: 60,

      },
      frameWidth: 150,
      frameHeight: 150,
      animations: {
        explode: {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,21,22,23,24,25,26,27],
          speed: 0.4,
          next: 'hide'
        },
        hide: [29]
      }
    },
  }
})