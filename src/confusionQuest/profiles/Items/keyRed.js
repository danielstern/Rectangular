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

  var defaults = {
    name: 'Key - Red',
    shape: 'box',
    skin: {
      src: 'img/keyRed.png',
      bg: 'sprite',
      index: 0
    },
    profile: "keyRed",
    presets: Item.dimensions
  };

    Item({
      stats: stats,
      defaults: defaults
    })

})
