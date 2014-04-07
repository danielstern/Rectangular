angular.module('ConfusionQuest')

  .service('keyRed', function (ngrGame) {
    var stats = {
      id: "keyRed",
      img: 'img/keyRed.png',
      name: "Red Key",
      description: "Opens red locked doors.",
      flavor: "Known as the leader of the keys.",
      event: "redKey"
    }
    var RedKey = function (body) {
      body.onimpact(function (body, other) {

        if (other.GetUserData() && other.GetUserData().isHero) {
          body.crumble();
          ngrGame.powerup(stats);
        }
      })
    }

    ngrGame.addProfile('keyRed', RedKey);

  })
  .service('doorRed', function (ngrGame) {
    
    

    var RedDoor = function (body) {

      console.log("Red door",body);
      
      body.setSensor(true);

      //body.sprite.container.parent.setChildIndex(body.sprite.container,0);
      
      body.onimpact(function (body, other) {

        if (other.GetUserData() && other.GetUserData().isHero) {
          console.log("You're on the door now, dog",ngrGame.getEvents());

          if (ngrGame.getEvents().redKey) {
            ngrGame.endGame();
          }
        }

      })
    }

    ngrGame.addProfile('doorRed', RedDoor);

  })