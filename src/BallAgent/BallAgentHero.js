angular.module("BallAgentHero", ['Rectangular', 'ngAudio'])
.service('BallAgentHero',function(ngrLoop, ngrEnvironment,ngrStage,ngAudio,ngrWorld,ngrDisplay){

	var heroBody = {};
	var hero = this;
	this.entity = heroBody;
	
	var state = {
	  goingRight: false,
	  goingLeft: false,
	  isJumping: false,
	  airborne: true,
	  stats: {
	  	directionalAgilityStanding: 15,
	  	rotationalAgilityStanding: 5,
	  	directionalAgilityAirborne: 5,
	  	rotationalAgilityAirborne: 5,
	  	jumpPower: 1000,
	  	radius: 0.5,
	  }
	};


	this.createNewHero = function() {
		heroBody = this.createHero();
		hero.entity = heroBody;
		hero.body = heroBody;
		return hero;
	}

	this.getState = function() {
		return state;
	}

	
	this.createHero = function(options) {

		var heroOptions = {
	    radius: state.stats.radius,
	    shapeKind: 'circle',
	    friction: 0.2,
	    density: 0.49,
	    x: 1.2,
	    type: 'dynamic',
	    userData: {
	    	isHero: true
	    }
	  }

	  heroBody = ngrEnvironment.add('circle',heroOptions);
	  
	  window.heroBody = heroBody;

	  var radius = state.stats.radius;
	  var attrs = {};
	  attrs.radius = radius;
	  attrs.src = 'img/hero.png';
	  var actor = ngrDisplay.skin(heroBody, attrs);
	  console.log("setting follow",actor);
	  ngrStage.follow(actor);

	  ngrLoop.addHook(tick);

	  return heroBody;
	};

	function tick() {

  	if (state.goingRight) {
  	  hero.goRight();
  	}

  	if (state.goingLeft) {
  	  hero.goLeft();
  	}

  	if (state.isJumping) {

  	  if (!state.airborne) {

  	    hero.jump();
  	    ngAudio.play('jump');
  	  }
  	};
	}

	this.goRight = function() {
		var s = state.stats;
		var force = state.airborne ? s.directionalAgilityAirborne : s.directionalAgilityStanding;
		heroBody.ApplyForce(new b2Vec2(force, 0), heroBody.GetWorldCenter());
		heroBody.ApplyTorque(s.rotationalAgilityStanding);
	}

	this.goLeft = function() {
		var s = state.stats;
		var force = state.airborne ? s.directionalAgilityAirborne : s.directionalAgilityStanding;
		heroBody.ApplyForce(new b2Vec2(-force, 0), heroBody.GetWorldCenter());
		heroBody.ApplyTorque(-s.rotationalAgilityStanding);
	}

	this.jump = function() {
		var s = state.stats;
		var y = heroBody.GetLinearVelocity().y * heroBody.GetInertia();
		heroBody.ApplyForce(new b2Vec2(0, -s.jumpPower), heroBody.GetWorldCenter());
		state.airborne = true;
		state.isJumping = false;
	}

})
