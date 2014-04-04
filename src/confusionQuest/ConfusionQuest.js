angular.module('ConfusionQuest', [])
.service("ConfusionQuest",function(ngrGame, ngrCamera, ngrState, ngrInterface, ngrStage, ConfusionQuestDefaults, questHero, confCoin, boots1){
 
 	var CQState = {
 		powerups:[],
 	};

 	var hero = undefined;

  ngrGame.powerup = function(powerup) {
  	console.log("POWER UP!!",powerup,CQState.powerups);
  	if (_.find(CQState.powerups, function(_powerup){
  		if (_powerup.id == powerup.id) return true;
  	})) {
  	} else {
  		ngrGame.pause();
  		var modal = ngrStage.modal({
  			title: powerup.name,
  			img: powerup.img,
  			text: powerup.description,
  			flavor: powerup.flavor
  		});

  		modal.find('.button').on('click',endModal);
  		var esc = ngrInterface.onescape(endModal);

  		function endModal(){
  			modal.hide();
  			ngrGame.unpause();
  		}
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
