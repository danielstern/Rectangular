Rectangular.js
=====

Rectangular.js is a library for creating Angular physics and games that implements Box2DWeb.


Usage
---

First, add Rectangular as a dependency of your Angular module.

```javascript
angular.module("myApp",['Rectangular'])
```

The Rectangular module gives you access to a number of useful classes, including

- ngrEnvironment
- ngrBox
- ngrStage
- ngr-box directive


Classes
---

### ngrEnvironment


Use ngrEnvironment to initialize a 3D world on a canvas element. 


```javascript```

// this controller has a canvas element in it
.controller('myDemoCtrl',function($scope, ngrEnvironment, $compile){

    ngrEnvironment.init($('canvas')[0]);

 		// optional
    ngrEnvironment.debug($('#debugCanvas')[0])

});

// creates an empty world with nothing in it, and outputs the debug information to your debug canvas.
```

#### Methods

##### ngrEnvironment.init(_canvas:canvas)

Creates the world on the target canvas. Automatically sizes to the canvas. Effectively initialize ngrWorld, ngrLoop and ngrStage.


```javascript
.controller('myDemoCtrl',function($scope, ngrEnvironment){

    ngrEnvironment.init($('canvas')[0]);

    //Mission Accomplished.

});
```

##### ngrEnvironment.debug(_debugCanvas:canvas)

Outputs the Box2D physics world visualization to a seperate canvas. Very useful for development, as Box2D objects have no avatar by default.

```javascript
.controller('myDemoCtrl',function($scope, ngrEnvironment){

    ngrEnvironment.init($('canvas')[0]);
    ngrEnvironment.debug($('#debugCanvas')[0])

    // Debug information is outputting. Of course, you will see nothing.

});
```

### ngrWorld

Contains an instance of a world. Used as an interface for adding and removing objects, as well as accessing the b2World object.	

#### Methods

##### ngrWorld.addElement(shape:ngShape):b2Body


Pass this an ngShape object (probably from the ngrBox class) in order to create body, add it to the world, and return an instance of that ody.

```javascript
.controller('myDemoCtrl',function($scope, ngrEnvironment, ngrWorld) {

    ngrEnvironment.init($('canvas')[0]);
    ngrEnvironment.debug($('#debugCanvas')[0])

		var myBox = ngrBox.shape("box",{width:10,height:10});
		ngWorld.addElement(myBox);

});
```

##### ngrWorld.removeElement(body:b2Body)

Pass this a reference to the b2Body that was created when you created an element to destroy that element.

```javascript
.controller('myDemoCtrl',function($scope, ngrEnvironment, ngrWorld) {

    ngrEnvironment.init($('canvas')[0]);
    ngrEnvironment.debug($('#debugCanvas')[0])

		var myBox = ngrBox.shape("box",{width:10,height:10});
		ngWorld.addElement(myBox);

		// and then...
		ngWorld.removeElement(myBox);

});
```


##### ngrWorld.clearAll()

Removes all elements from a world. Useful if you are making a game, and have started a new level.

```javascript
.controller('myDemoCtrl',function($scope, ngrEnvironment, ngrWorld) {

    ngrEnvironment.init($('canvas')[0]);
    ngrEnvironment.debug($('#debugCanvas')[0])

		var myBox = ngrBox.shape("box",{width:10,height:10});

		// a trio of boxes...
		ngWorld.addElement(myBox);
		ngWorld.addElement(myBox);
		ngWorld.addElement(myBox);

		// and then...
		ngWorld.clearAll();

		// goodbye boxes...
});
```

### ngrBox

Use ngrBox to add elements to your world.

```javascript
.controller('myDemoCtrl',function($scope, ngrEnvironment, ngrWorld){

    ngrEnvironment.init($('canvas')[0]);
    ngrEnvironment.debug($('#debugCanvas')[0])

    // returns an instance of ngShape
		var myCircle = ngrBox.shape("ellipse",{radius:0.5,x:1.2});

		// adds the element to the world and returns a Box2D body
		ngWorld.addElement(myCircle);

});
```

#### Methods

##### ngrBox.shape(type, options):ngShape

Returns an ngShape object that can be used by ngWorld to addElement.

Type currently support two strings, **box** and **circle**.

The **options** parameter contains an object with various paramaters for configuring the shape.

###### Available options

###### height: Number

Defines the height of the object in meters.

###### width: Number,

Defines the width of the object in meters

###### x: Number,

Defines the x position of the object in the world, in meters,

###### y: Number,

Defines the y position of the object in the world, in meters.

###### [radius: Number]

Optional. Defines the radius of the circle if you are creating a circle, in meters.

###### position : 'dynamic' || 'static'

Specifies if the box should be dynamic (a sprite) or static (the terrain.)

###### angle : Number

Specifies the angle of the object, in radians. Useful for terrain.

And the rest...

- density : Number,
- friction : Number ,
- restitution : Number,
- linearDamping : Number,
- angularDamping : Number,
- gravityScale : Number ,


### Directives (not fully supported)

Use directives to add box2d elements with HTML.


```html

<div ngController='myDemoController'>
 <canvas ng-stage id='canvas' width='500' height='400' style="background-color:pink;"></canvas>

 <ng-box></ng-box>

 <ng-circle
    x='0'
    radius='2'
    src='img/globe.png'
 ></ng-circle>
</div>

<!-- Creates a box and a circle in the canvas world. -->


```


