angular.module('ConfusionQuest', [])
.service("ConfusionQuest",function(ngrGame, ConfusionQuestDefaults, questHero, confCoin, boots1){
 
 	var CQState = {
 		powerups:[],
 	};

 	var hero = undefined;

  ngrGame.powerup = function(powerup) {
  	console.log("POWER UP!!",powerup);
  	if (_.contains(CQState.powerups)) {
  		console.warn("You already got this powerup",powerup);
  	}

  	if (powerup.hero) {
  		_.each(powerup.hero,function(boost, stat){
  				hero.changeStat(stat,boost);
  		})
  	}

  	CQState.powerups.push(powerup);

  	
  }	

  ngrGame.oncreateentity(function(entity){
  	console.log("CQ got Created entity...",entity);
  	if (entity.type == "questHero") {
  		ngrGame.control(entity,{
  			'a':'goingLeft',
  			'd':'goingRight',
  			'w':'isJumping',
  			's':'isCrouching',
  		})

  		hero = entity;
  	}
  })


})
