angular.module("BallAgentHero", ['Rectangular', 'ngAudio'])
.service('BallAgentHero',function(ngrLoop, ngBox,ngAudio,ngWorld,display){

	var heroBody = {};
	var hero = this;
	
	hero.state = {
	  goingRight: false,
	  goingLeft: false,
	  isJumping: false,
	  airborne: true,
	};

	this.heroState = hero.state;

	var heroState = hero.state;


	/*this.getNewHero = function() {

	}*/


	this.entity = heroBody;

	this.createNewHero = function() {
		heroBody = this.createHero();
		hero.entity = heroBody;
		return hero;
	}

	this.getState = function() {
		return heroState;
	}

	
	this.createHero = function(options) {

	  var heroBox = ngBox.shape("ellipse", {
	    radius: 0.5,
	    x: 1.2
	  });
	  var heroBody = ngWorld.addElement(heroBox);
	  heroBody.SetUserData({
	    isHero: true
	  });
	  window.heroBody = heroBody;

	  var radius = 0.5;
	  var attrs = {};
	  attrs.radius = radius;
	  attrs.src = 'img/hero.png';
	  var actor = display.skin(heroBody, attrs);



	  ngrLoop.addHook(function(){
	  	var position = heroBody.GetPosition();
	  	heroState.position = position;

//	  	console.log("Hero looping",heroState);

	  	if (heroState.goingRight) {
	  	  hero.goRight();
	  	}

	  	if (heroState.goingLeft) {
	  	  hero.goLeft();
	  	}

	  	if (heroState.isJumping) {

	  	  if (!heroState.airborne) {

	  	    hero.jump();
	  	    ngAudio.play('jump');
	  	  }
	  	};


	  })



	  return heroBody;
	};



	this.goRight = function() {
		var force = heroState.airborne ? 5 : 15;
		heroBody.ApplyForce(new b2Vec2(force, 0), heroBody.GetWorldCenter())
		heroBody.ApplyTorque(5)
	}

	this.goLeft = function() {
		var force = heroState.airborne ? 5 : 15;
		heroBody.ApplyForce(new b2Vec2(-force, 0), heroBody.GetWorldCenter())
		heroBody.ApplyTorque(-5)
	}

	this.jump = function() {
		var y = heroBody.GetLinearVelocity().y * heroBody.GetInertia();
		heroBody.ApplyForce(new b2Vec2(0, -300), heroBody.GetWorldCenter());
		heroState.airborne = true;
		heroState.isJumping = false;
	}

})
