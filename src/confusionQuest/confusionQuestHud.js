angular.module('ConfusionQuest')
  .service('ConfusionQuestHud', function (ConfusionQuest, ngrLoop) {
    var p = $('.main');
    p.append("<div class='health'></div>");

    var health = p.find(".health");

    health.append("<div class='bar-outer'></div>");
    var bar = health.find(".bar-outer")
    bar.append("<div class='bar-inner'></div>");

    var inner = bar.find(".bar-inner");

    var scoreDisplay = 0;
    var currentScore = 0;

    health.append("<div class='bar-bg'></div>");



    ConfusionQuest.onstatechange(function (state) {
      
      var heroState = state.hero.getState();
      
      inner.css("width", heroState.health / heroState.stats.hp * 100 + "%");
      //inner.removeClass('flash');
      setTimeout(function () {
       // inner.addClass('animated flash')
      }, 1);

      currentScore = state.score;


    });

    ngrLoop.addPermanentHook(function(){
    	  if (scoreDisplay < currentScore) scoreDisplay += 1;
    	  //console.log("Current score?",currentScore,scoreDisplay)

    		coins.html(scoreDisplay);
    })


    
    

    p.append("<div class='score'></div>");
    var score = p.find('.score');
    score.append("<div class='coins-container'></div>");
    var coinsContainer = p.find('.coins-container');
    coinsContainer.append("<div class='coins'></div>")
    var coins = p.find('.coins');
    coinsContainer.append('<div class="legend"></div>');

  })
