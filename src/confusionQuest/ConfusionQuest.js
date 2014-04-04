angular.module('ConfusionQuest', [])
.service("ConfusionQuest",function(ngrGame, ngrCamera, ngrState, ngrStage, ConfusionQuestDefaults, questHero, confCoin, boots1){
 
 	var CQState = {
 		powerups:[],
 	};

 	var hero = undefined;

  ngrGame.powerup = function(powerup) {
  	console.log("POWER UP!!",powerup);
  	if (_.contains(CQState.powerups)) {
  		console.warn("You already got this powerup",powerup);
  	} else {
  		console.log("Showing prompt...");
  		ngrGame.pause();
  		ngrStage.modal({
  			title: powerup.name,
  			img: powerup.img,
  			text: powerup.description,
  			flavor: powerup.flavor
  		})
  		.then(ngrGame.unpause);
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
  		});

  		hero = entity;

  		ngrCamera.follow(entity.body);
  		ngrCamera.setZoom(1);
  		var room = ngrState.getState().room;
  		console.log("Room?",room);
  	   ngrCamera.constrainFocus({
         x: 0,
         y: 0,
         width: room.width,
         height: room.height
       });
  	}
  })


})
