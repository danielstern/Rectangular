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
      setTimeout(function () {
      }, 1);

      currentScore = state.score;


    });

    ConfusionQuest.onmessage(function(msg){
      console.log("Displaying message",msg);
      message.html(msg);
      message.removeClass('fadeOutRight');
      message.addClass('animated fadeInLeft');
      setTimeout(function(){
        message.removeClass('fadeInLeft');
        message.addClass('fadeOutRight');
      },2000)
    })

    ngrLoop.addPermanentHook(function(){
    	  if (scoreDisplay < currentScore) scoreDisplay += 1;
        if (scoreDisplay > currentScore) scoreDisplay --;
    	  //console.log("Current score?",currentScore,scoreDisplay)

    		coins.html(scoreDisplay);
    })

    p.append("<div class='message'></div>")
    var message = p.find('.message');


    
    

    p.append("<div class='score'></div>");
    var score = p.find('.score');
    score.append("<div class='coins-container'></div>");
    var coinsContainer = p.find('.coins-container');
    coinsContainer.append("<div class='coins'></div>")
    var coins = p.find('.coins');
    coinsContainer.append('<div class="legend"></div>');

  })
