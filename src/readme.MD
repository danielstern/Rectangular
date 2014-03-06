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

### ngrWorld

Contains an instance of a world. Used as an interface for adding and removing objects, as well as accessing the b2World object.

### ngrBox

Use ngrBox to add elements to your world.

```javascript
.controller('myDemoCtrl',function($scope, ngrEnvironment, $compile){

    ngrEnvironment.init($('canvas')[0]);
    ngrEnvironment.debug($('#debugCanvas')[0])

    // returns an instance of ngShape
		var myBox = ngrBox.shape("ellipse",{radius:0.5,x:1.2});

		// adds the element to the world and returns a Box2D body
		ngWorld.addElement(heroBox);

});
```

#### Methods

##### ngrBox.shape(type, options)

Returns an ngShape object that can be used by ngWorld to addElement.
