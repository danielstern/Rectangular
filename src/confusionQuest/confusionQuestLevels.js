angular.module("ConfusionQuest")
  .service("ConfusionQuestLevels", function () {
    this.levels = [];
    //this.levels[0] = this.devLevel =
    this.addLevel = function(level){this.levels.push(level)};
    

  })
