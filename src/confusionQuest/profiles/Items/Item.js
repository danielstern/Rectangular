angular.module("ConfusionQuest")
  .service("Item", function (ngrGame, ConfusionQuestDefaults) {
    //return this.fn.init;

    Item = function (config) {
      return Item.fn.init(config);
    }

    Item.fn = Item.prototype;

    var profile = function (body) {

      var item = this;

      this.init = function (body) {
        item.body = body;
        body.setSensor(true);
        item.body.onimpact(function (other) {

          if (other.GetUserData() && other.GetUserData().isHero) {
            item.body.crumble();
            console.log("powerup...", item);
            ngrGame.powerup(item.stats);
          }
        })
      }

      return this.init(body);

    };

    Item.fn.init = function (def) {
      console.log("Profile def...",def);
      ConfusionQuestDefaults.addDefault(def.defaults);
      var newProf = _.extend({
        stats:def.stats,
      }, profile);
      console.log("Returning profile...",profile);
      ngrGame.addProfile(def.stats.id, profile);
      return profile;
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
