angular.module("ConfusionQuest")
  .service("Item", function (ngrGame,ConfusionQuestDefaults) {
    //return this.fn.init;

    Item = function (config) {
      return Item.fn.init(config);
    }

    Item.fn = Item.prototype;

    Item.fn.default = function () {
     
        var item = this;
        item.body = body || this.body;
        item.body.setSensor(true);
        item.body.onimpact(function (other) {

          if (other.GetUserData() && other.GetUserData().isHero) {
            item.body.crumble();
            console.log("powerup...", item);
            ngrGame.powerup(item.stats);
          }
        })
      
    }

    Item.fn.init = function (def) {
      console.log("Returning item definition", def,this);
      this.stats = def.stats;
      /*return {
        init(Item.default)
      };*/

      return this.fn;
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
