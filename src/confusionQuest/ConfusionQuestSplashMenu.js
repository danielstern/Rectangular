angular.module("ConfusionQuest")
 .service("ConfusionQuestSplashMenu", function (ConfusionQuest, ngrGame, $q) {

    if ($('#iframe_embed > *')[0]) {
      Mousetrap.init($('#iframe_embed > *'));;
    }
    this.opening = function(){
      var r = $q.defer();
      ngrGame.screen({
        bg: 'img/screen_open.png',
        duration: 3,
        exitOnEscape: true,
      })
      .then(function(){
        r.resolve();
      })
      return r.promise;
    }
  });