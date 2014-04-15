angular.module('ConfusionQuest')
  .service('confCoin', function (ngrGame, Item, ConfusionQuestDefaults) {

    var stats = {
      id: "confCoin",
      name: "Bitcoin",
      img: "img/coinGold.png",
      description: "You can redeem these coins for powerful upgrades at the end of each level.",
      flavor: "In the video game world, Bitcoin takes the form of handy coins.",
      points: 10
    };

    //  _.extend(this, new Item.profile);
    //     this.init(body);

    var defaults = {
      name: 'Coin',
      shape: 'box',
      skin: {
        src: 'img/coinGold.png',
        bg: 'sprite'
      },
      profile: "confCoin",
      presets: Item.dimensions
    }

    Item({
      defaults: defaults,
      stats: stats
    })

  })
