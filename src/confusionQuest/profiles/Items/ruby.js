angular.module('ConfusionQuest')
  .service('ruby', function (ngrGame, Item) {

    var stats = {
      id: "ruby",
      name: "Ruby",
      img: "img/gemRed.png",
      description: "Rubies are worth a goodly amount of coins.",
      flavor: "A goodly amount indeed.",
      points: 200
    };

    var defaults = {
      name: 'Ruby',
      shape: 'box',
      skin: {
        src: 'img/gemRed.png',
        bg: 'sprite'
      },
      profile: "ruby",
      presets: Item.dimensions

    };

    Item({
      stats: stats,
      defaults: defaults
    })

  })
