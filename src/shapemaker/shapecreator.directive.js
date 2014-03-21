angular.module('shapemaker')
  .directive('shapemaker', function () {
    return {
      restrict: 'AE',
      templateUrl: function (elem, atts) {
        return "shapemaker/tmpl/shapecreator.html";
      },
      scope: {

      },
      controller: function ($scope, $attrs, $element, ngrEnvironment, ngrState, shapecreatorDefaults) {

        $scope.q = {};
        var q = $scope.q;
        q.height = 2;
        q.width = 1;
        q.radius = 2;
        q.restitution = 0.3;
        q.density = 0.5;
        q.friction = 0.5;
        q.linearDamping = 0.5;
        q.gravityScale = 0.5;
        q.angle = 0;
        q.shape = $attrs.shape || 'circle';

        q.innerAngle = 90;
        q.adjacent = 2;
        q.opposite = 2;

        $scope.defaults = {
          box: {
            params: 'height width restitution density friction',
          },
          triangle: {
            params: 'innerAngle adjacent opposite restitution density friction',
          },
          circle: {
            params: 'radius restitution density friction'
          }
        }

        $scope.$watchCollection('q.preset', function () {
          console.log("PReset updated", $scope.q);
          if ($scope.q.preset) {
            var pre = $scope.q.preset;
            _.each(pre.presets, function (_pre, key) {
              console.log("updating",_pre,key)
              $scope.q[key] = _pre;
            })
            $scope.q.shape = pre.shape;
            if (pre.skin) q.src = pre.skin.src;
          }
        })

        $scope.newShape = function (input) {
          $scope.addShape($attrs.shape);
        }

        $scope.$watch('q', function () {
          //console.log("q changed...");
          if ($scope.defaults) $scope.properties = $scope.defaults[$scope.q.shape].params.split(' ');
        }, true)

        $scope.options = [{
            name: 'Circle',
            type: 'circle'
          }, {
            name: 'Rectangle',
            type: 'box'
          }, {
            name: 'Triangle',
            type: 'triangle'
          }

        ];

        $scope.skins = shapecreatorDefaults.skins;
        $scope.presets = shapecreatorDefaults.presets;

        $scope.addShape = function (shape) {

          if (q.skin) q.src = q.skin.src;

          switch (q.shape) {
          case 'box':
            $scope.addBox();
            break;
          case 'circle':
            $scope.addCircle();
            break;
          case 'triangle':
            $scope.addTriangle();
            break;
          default:
            console.error("Unavailable shape,", shape);
            break;
          }
        }

        $scope.addBox = function () {

          ngrEnvironment.add('box', shapecreatorDefaults.shape(q));
        }

        $scope.addTriangle = function () {
          ngrEnvironment.add('triangle', shapecreatorDefaults.shape(q));
        }

        $scope.destroy = function () {
          $($element).hide();
        }

        $scope.addCircle = function () {
          ngrEnvironment.add('circle', shapecreatorDefaults.shape(q));

        };

        setTimeout(function () {

          var dropdown = $element.find('select');
          var ddl = dropdown[0];
          var opts = ddl.options.length;
          for (var i = 0; i < opts; i++) {
            if (ddl.options[i].value == q.shape) {
              ddl.selectedIndex = i;
              break;
            }
          }
        }, 1)
      }
    }
  })

.service('shapecreatorDefaults', function (ngrState) {
  var Shape = function () {
    return {
      bg: 'tiled',
      type: 'dynamic',
      src: 'img/stoneCenter.png',
      x: Math.random() * ngrState.getState().worldWidth,
    }
  }

  this.shape = function (options) {
    return _.extend(_.clone(new Shape), _.clone(options));
  }

  this.skins = [{
      name: 'Stone',
      type: 'stone',
      src: 'img/stoneCenter.png'
    }, {
      name: 'Boxy',
      type: 'boxy',
      src: 'img/box.png'
    }, {
      name: 'Dirt',
      type: 'dirt',
      src: 'img/grassCenter.png'
    }, {
      name: 'Castle',
      type: 'castle',
      src: 'img/castleCenter.png'
    }, {
      name: 'Snow',
      type: 'snow',
      src: 'img/snowCenter.png'
    }, {
      name: 'Green',
      type: 'green',
      src: 'img/box-green.png'
    }, {
      name: 'Blue',
      type: 'blue',
      src: 'img/box-blue.png'
    }

  ]

  this.presets = [{
    name: 'Wooden Box',
    shape: 'box',
    skin: {
      src: 'img/box.png',
    },
    presets: {
      height: 1,
      width:1,
      restitution: 0.2,
      density: 0.2
    }

  }, {
    name: 'Boulder',
    shape: 'circle',
    skin: {
      src: 'img/stoneMid.png',
    },
    presets: {
      radius: 2,
      density: 0.9,
      friction: 0.4,
    }

  },{
    name: 'Rubber Ball',
    shape: 'circle',
    skin: {
      name: 'Blue',
      src: 'img/box-blue.png',
    },
    presets: {
      radius: 0.3,
      bg: 'tiled',
      restitution: 0.9,
    }

  },{
    name: 'Explosive Box',
    shape: 'box',
    skin: {
      src: 'img/box-red.png',
    },
    presets: {
      height: 0.5,
      width:0.5,
      restitution: 0.2,
      density: 0.6,
      userData: {
        explosive: true
      }
    }

  }]

})
