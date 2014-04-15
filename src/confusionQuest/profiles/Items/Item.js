angular.module("ConfusionQuest")
  .service("Item", function (ngrGame, ConfusionQuestDefaults) {

    Item = function (config) {
      return Item.fn.init(config);
    }

    Item.fn = Item.prototype;

    var profile = function () {
      var item = this;

      this.init = function (body) {
        item.body = body;
        body.setSensor(true);
        body.onimpact(function (other) {

          if (other.GetUserData() && other.GetUserData().isHero) {
            body.crumble();
            console.log("powerup...", item);
            ngrGame.powerup(item.stats);
          }
        })
      }
    };

    Item.fn.init = function (def) {
      ConfusionQuestDefaults.addDefault(def.defaults);

      var R = new profile();
      R.init.stats = def.stats;
      R.stats = def.stats;

      ngrGame.addProfile(def.stats.id, R.init);
    }

    Item.fn.dimensions = {
      radius: 1,
      height: 3,
      width: 3,
      restitution: 0.2,
      density: 0.2

    }
    return Item;

  });
