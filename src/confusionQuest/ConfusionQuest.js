angular.module('ConfusionQuest', [])
.service("ConfusionQuest",function(ngrGame, ConfusionQuestDefaults, questHero, confCoin, boots1){
 
  ngrGame.powerup = function() {
  	console.log("POWER UP!!");
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
  	}
  })


})
