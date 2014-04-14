angular.module("ConfusionQuest")
  .service("ConfusionQuestLevels", function () {
    this.levels = [];
    this.addLevel = function(level){this.levels.push(level)};
  })
