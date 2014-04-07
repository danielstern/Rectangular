angular.module('ConfusionQuest')
.service('ConfusionQuestHud', function (ConfusionQuest) {
  var p = $('.main');
  p.append("<div class='health'></div>");

  var health = p.find(".health");

  health.append("<div class='bar-outer'></div>");
  var bar = health.find(".bar-outer")
  bar.append("<div class='bar-inner'></div>");
  health.append("<div class='bar-bg'></div>");

  console.log("H?", health);

})
