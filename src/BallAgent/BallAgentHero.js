angular.module("BallAgentHero", ['Rectangular', 'ngAudio'])
.service('BallAgentHero',function(ngrLoop, ngrBox,ngAudio,ngrWorld,ngrDisplay){

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
	  	jumpPower: 300,
	  	radius: 0.5,
	  }
	};


	this.createNewHero = function() {
		heroBody = this.createHero();
		hero.entity = heroBody;
		return hero;
	}

	this.getState = function() {
		return state;
	}

	
	this.createHero = function(options) {

	  var heroBox = ngrBox.shape("ellipse", {
	    radius: state.stats.radius,
	    x: 1.2
	  });
	  var heroBody = ngrWorld.addElement(heroBox);
	  heroBody.SetUserData({
	    isHero: true
	  });
	  
	  window.heroBody = heroBody;

	  var radius = state.stats.radius;
	  var attrs = {};
	  attrs.radius = radius;
	  attrs.src = 'img/hero.png';
	  var actor = ngrDisplay.skin(heroBody, attrs);

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
