angular.module("BallAgent",['Rectangular'])
.service('BallAgent',function(BallAgentLevels, ngrEnvironment, ngrLoop, ngBox, ngWorld, $compile){
   // var world = ngWorld.setWorld(0,26,true);
   this.init = function(canvas,debugCanvas) {

   	var currentLevel = 0;


   ngrEnvironment.init(canvas);
   ngrEnvironment.room({floor:true});
   ngrEnvironment.debug(debugCanvas);


   var heroBody;// = createHero();
   var exit;// = createExit();
   var controls;// = bindControls();

   nextLevel();

   this.gotoLevel = function(level) {
     currentLevel = level - 1;
     nextLevel();
   }

   function createHero() {
   var heroBox = ngBox.shape("ellipse",{radius:0.5,x:1.2});
   var heroBody = ngWorld.addElement(heroBox);
   heroBody.SetUserData({isHero:true});
   window.heroBody = heroBody;

   return heroBody;
 	}

	function createExit(options) {
    console.log("eXT Options,",options)
    var defaults = {src:'img/hi.png', x:20,
      mass:0,
      position:'static',
      y: 15.5,
      height: 1,
      width: 1,
    }

    options = _.extend(defaults, options);

		var exitBox = ngBox.shape("box",options);

		console.log("exitbox?",exitBox);
		exitBox.f.isSensor = true;
		var exitBody = ngWorld.addElement(exitBox);
		exitBody.SetUserData({exit:true})
   // exitBody.SetLinearDamping('float');

		return exitBody;
	}

    function createPlatform(options) {
      
      var defaults = {
        mass:0,
        position:'static',
        height: 0.3,

      }

      options = _.extend(defaults, options);

      var platform = ngBox.shape("box",options);
      var pBody = ngWorld.addElement(platform);
      pBody.SetUserData({isFloor:true});

      options.y += 0.5;
      var platformUnder = ngBox.shape("box",options);
      var pSubBody = ngWorld.addElement(platformUnder);

      return platform;
    }

	function bindControls() {

  // window.heroBody = heroBody;

   Mousetrap.bind('d',function(){
        heroState.goingRight = true;
   },'keydown');
   Mousetrap.bind('d',function(){
        heroState.goingRight = false;
   },'keyup');

   Mousetrap.bind('a',function(){
        heroState.goingLeft = true;
   }, 'keydown');

   Mousetrap.bind('a',function(){
        heroState.goingLeft = false;
   }, 'keyup');

   Mousetrap.bind('w',function(){
        heroState.isJumping = true;
   },'keydown');

   Mousetrap.bind('w',function(){
        heroState.isJumping = false;
   },'keyup');


   ngrLoop.addHook(function(){
   
    var contacts = heroBody.GetContactList();
   

    if (contacts && contacts.contact) {
        var contact = contacts.contact;
        window.contacts = contacts;

        if (contact.IsTouching() && contacts.other.GetUserData()) {
            var data = contacts.other.GetUserData();
            //console.log("Contact has data", data);
            if (data.exit) {
                console.log("You reached the exit!");
                nextLevel();
       //         $('html').append('congratulations!');
            }
        }

        if (contact.IsTouching() && contacts.other.GetUserData() && contacts.other.GetUserData().isFloor)  {
            heroState.airborne = false;
        } else {
            heroState.airborne = true;
        }
    }

     if (heroState.goingRight) {
        var force = heroState.airborne ? 5 : 15; 
        heroBody.ApplyForce(new b2Vec2(force,0),heroBody.GetWorldCenter())  
        heroBody.ApplyTorque(5) 
     }

     if (heroState.goingLeft) {
        var force = heroState.airborne ? 5 : 15; 
        heroBody.ApplyForce(new b2Vec2(-force,0),heroBody.GetWorldCenter())  
        heroBody.ApplyTorque(-5) 
     }

     if (heroState.isJumping) {

        if (!heroState.airborne) {

            var y = heroBody.GetLinearVelocity().y * heroBody.GetInertia();
            heroBody.ApplyForce(new b2Vec2(0,-150),heroBody.GetWorldCenter()) ;  
        }
     }
   });


 	}


   heroState = {
        goingRight:false,
        goingLeft:false,
        isJumping:false,
        airborne:true
   };

   /*var level1 = {
    objects:[

    ]
   }*/

   
   function nextLevel() {
   			//console.log("currentLevel?", currentLevel);
   			currentLevel++;
   			var l = BallAgentLevels.levels[currentLevel - 1];
   			console.log("Levels?",BallAgentLevels, l, currentLevel)
        ngrLoop.stop();
        ngrLoop.clearHooks();
        ngWorld.clearAll();
    //    alert('Entering next level!');

        ngrEnvironment.init($('canvas')[0]);
        if (l.floor) ngrEnvironment.floor();
        if (l.lWall) ngrEnvironment.leftWall();
        if (l.rWall) ngrEnvironment.rightWall();


        ngrEnvironment.debug($('#debugCanvas')[0]);

        console.log("NEXT LVL: BALL AGENT");

      	heroBody = createHero();
   			exit = createExit(l.exit);
   			var controls = bindControls();
    //    activateTargeter();

        _.each(l.platforms, function(platform){
          createPlatform(platform);

        })

    }

    function activateTargeter() {
      var targeter = new MouseTargeter(debugCanvas, ngWorld.SCALE);
      var targetingWindow = null;

      targeter.onmove(function(e){
      
       //console.log("USER HOVERING AT ", e.worldPosX, e.worldPosY);
       //var aabb = new b2AABB();
       //aabb.lowerBound.Set(e.worldPosX - 0.001, e.worldPosY - 0.001);
       //aabb.upperBound.Set(e.worldPosX + 0.001, e.worldPosY + 0.001);

       var world = ngWorld.getWorld();

        /*if (targetingWindow) {
          ngWorld.removeElement(targetingWindow);
          targetingWindow = null;
        }*/
        var shape = {};
       //  var shapes = [];

        shape.b = new b2BodyDef();
        shape.f = new b2FixtureDef;
        shape.f.shape = new b2PolygonShape();
        shape.f.shape.SetAsBox( 1 , 1 );
        shape.f.isSensor = false;
        shape.b.type = 'static';
        shape.b.position.Set(e.worldPosX - 0.5 , e.worldPosY - 0.5);



        if (!targetingWindow) {
          targetingWindow = ngWorld.addElement(shape);
          targetingWindow.SetUserData({isFloor:true})
        } else {
          targetingWindow.SetPosition(new b2Vec2(e.worldPosX - 0.5,e.worldPosY - 0.5) )
        }

      /*  ngWorld.getWorld().QueryShape(function(k){
          console.log("Query?",k);
        },targetingWindow);*/

       window.world = world;
       window.targetingWindow = targetingWindow;

       //world.update();

      console.log(targetingWindow.GetContactList());

   //   ngWorld.getWorld().QueryShape(function(k){
     //     console.log("Query?",k);
      //},targetingWindow);
      //console.log(world.GetContactList());

       /*
         ngWorld.getWorld().QueryAABB(function(k){
          shapes = k;
          var body = null;

          _.each(shapes,function(shape){
            console.log("Shape?",shape);
            window.fixture = shape;
            if (shape.m_body.IsStatic() == false || includeStatic) {
                var tShape = shape;
                var inside = tShape.TestPoint(tShape.m_body.GetXForm(), mousePVec);
                if (inside) {
                    body = tShape.m_body;
                }
            }

          console.log("Body?",body);
        }, aabb);
        
          })*/

    })

      }

   

}



   

})
.service('BallAgentLevels',function(){
	this.levels = [
		{
			lWall:true,
			rWall:true,
			floor:true
		},
		{
			lWall:true,
			rWall:true,
			floor:true,
      exit:{
        y:12,
        x:4
      },
      platforms:[
        {
          x: 4,
          y: 13,
          width: 2
        },
        {
          x: 17,
          y: 15,
          width: 2
        }
      ]
		},
		{
      // level 3
      lWall:true,
      rWall:true,
      floor:true,
      exit:{
        y:9 ,
        x:17
      },
      platforms:[
        {
          x: 4,
          y: 13,
          width: 2.5
        },
        {
          x: 17,
          y: 15,
          width: 2
        },
        {
          x: 17,
          y: 11,
          width: 2
        }
      ]
    },
    {
      // level 4
      lWall:false,
      rWall:false,
      floor:false,
      exit:{
        y:10,
        x:17
      },
      platforms:[
        {
          x: 3,
          y: 13,
          width: 2
        },
        {
          x: 10,
          y: 12,
          width: 2
        },
        {
          x: 17,
          y: 11,
          width: 2
        }
      ]
    },
    {
      // level 5
      lWall:false,
      rWall:false,
      floor:false,
      exit:{
        y:9,
        x:20
      },
      platforms:[
        {
          x: 3,
          y: 13,
          width: 1.8
        },
        {
          x: 9,
          y: 12,
          width: 1.8
        },
        {
          x: 14,
          y: 11,
          width: 1.8
        },
        {
          x: 20,
          y: 10,
          width: 2.3
        }
      ]
    },
    {
      // level 6
      lWall:true,
      rWall:false,
      floor:false,
      exit:{
        y:9.3,
        x:19
      },
      platforms:[
        {
          x: 2.5,
          y: 13,
          width: 2.1
        },
        
      ]
    },
    {
      // level 7
      lWall:false,
      rWall:false,
      floor:false,
      exit:{
        y:9.3,
        x:19
      },
      platforms:[
        {
          x: 2.5,
          y: 4,
          width: 2.1
        },
        {
          x: 19,
          y: 7,
          width: 1.5
        },
        {
          x: 12,
          y: 11,
          width: 2
        },
        
      ]
    },
    {
      // level 8
      lWall:false,
      rWall:false,
      floor:false,
      exit:{
        y:11.3,
        x:19
      },
      platforms:[
        {
          x: 2.5,
          y: 4,
          width: 2.1
        },
        
        
      ]
    },
    {
      // level 9
      lWall:false,
      rWall:false,
      floor:false,
      exit:{
        y:12,
        x:20
      },
      platforms:[
        {
          x: 2,
          y: 15,
          width: 1.2
        },
        {
          x: 7,
          y: 13,
          width: 1.2
        },
        {
          x: 12,
          y: 11,
          width: 1.2
        },
        {
          x: 17,
          y: 9,
          width: 1.2
        },
        
        
      ]
    },
	]
})