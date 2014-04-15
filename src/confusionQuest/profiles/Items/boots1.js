angular.module('ConfusionQuest')

.service('boots1', function (ngrGame, ConfusionQuestDefaults, Item) {
  var stats = {
    id: "boots1",
    img: 'img/powershoe.png',
    name: "Trevon's Greaves of Dunking",
    description: "These legendary shoes increase your jumping power by 10%. Also makes you run a bit faster.",
    flavor: "Thou tries to dunks't against me, ser?",
    hero: {
      speed: 5,
      jump: 10
    }
  }

/*  var Boots1 = function (body) {

    _.extend(this, new Item.profile);
    this.stats = stats;
    this.init(body);

  };*/

  var defaults = {
    name: 'Powerup - Boots 1',
    shape: 'box',
    skin: {
      src: 'img/powershoe.png',
      bg: 'sprite'
    },
    profile: "boots1",
    presets: Item.dimensions
  };


  var Boots1 = Item({
    stats:stats,
    defaults:defaults
  })
  ConfusionQuestDefaults.addDefault(defaults);
  ngrGame.addProfile('boots1', Boots1);

})
