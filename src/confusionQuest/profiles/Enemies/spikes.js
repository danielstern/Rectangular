angular.module('ConfusionQuest')
  .service('spikes', function(ngrGame, Enemy, ngrLoop, ngrWorld, ConfusionQuestDefaults) {

    var stats = {
      id: "Spikes",
      health: 20,
      damage: 15,
      frozen: true,
      attack: 15,
      dangerTouch: true,
      img: 'img/spike.png',
      name: "Spikes",
      description: "Fiendish inanimate spikes.",
      flavor: "Known for their sharp wit.",
    }

    Spikes = new Enemy(stats);

    var physics = {
      name: 'Spikes',
      shape: 'box',
      skin: {
        src: 'img/spike.png',
        bg: 'tiled'
      },
      userData: {
        doodad: true,
        isFloor: true,
      },
      profile: 'Spikes',
      presets: {
        height: 1,
        width: 4,
        restitution: 0.2,
        density: 1,
        stroke: 0,
      }

    }


    ConfusionQuestDefaults.addDefault(physics);
    ngrGame.addProfile('Spikes', Spikes);

  })
