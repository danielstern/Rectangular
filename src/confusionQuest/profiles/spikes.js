angular.module('ConfusionQuest')
.service('spikes', function (ngrGame, ngrLoop, ngrWorld,ConfusionQuestDefaults) {

  var Spikes = function (body) {
    var stats = {
      id: "Spikes",
      health: 20,
      damage: 15,
      speed: 0.2,
      minFloatHeight: 5,
      maxFloatHeight: 12,
      maxVelocityY: 4,
      floatPower: 50,
      attack: 15,
      antiGravity: 0.8,
      img: 'img/spike.png',
      name: "Spikes",
      description: "Fiendish inanimate spikes.",
      flavor: "Known for their sharp wit.",
    }

   


    var spikes = this;
    var hitTop = false;

    this.body = body;

    body.onimpact(function (body, other) {

      if (other.GetUserData() && other.GetUserData().isHero) {
        //console.log("Mahakana impacts hero...", other);
        var hero = other.profile;
        hero.damage(stats.attack, spikes);

      }
    })

  }
  
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
      profile: 'spikes',
      presets: {
        height: 1,
        width: 4,
        restitution: 0.2,
        density: 1,
        stroke: 0,
      }

    }


  ConfusionQuestDefaults.addDefault(physics);
  ngrGame.addProfile('spikes', Spikes);

})
