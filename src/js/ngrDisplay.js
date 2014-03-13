angular.module('Rectangular')
  .service('ngrDisplay', function(ngrStage, ngrState, ngrDefaults, $q, ngrActor) {

    var nd = this;
    this.skin = function(body, options) {

      var f = body.GetFixtureList();
      var s = f.GetShape();
      var actor = {};

      var defaults = _.clone(ngrDefaults.skin);

      if (s.constructor == b2CircleShape) {

        defaults.radius = s.GetRadius();

      } else {

        var v = s.GetVertices();
        var height = v[2].y - v[0].y;
        var width = v[1].x - v[0].x;

        defaults.height = height;
        defaults.width = width;
      }

      options = _.extend(defaults, options);

      var env = ngrState.getProperties();

      var stage = ngrStage.stage;
      var imgData;


      if (options.radius) {

        options.width = options.radius * env.SCALE;
        options.height = options.radius * env.SCALE;

      } else {

        options.width = options.width * env.SCALE;
        options.height = options.height * env.SCALE;

      }

      loadBitmap(options.src)
        .then(function(imgData) {

          var img = imgData.image;

          if (options.bg != 'tiled') {

            var scaleY = options.height / img.height * 2;
            var scaleX = options.width / img.width * 2;

            var regY = (img.height) / 2;
            var regX = (img.width) / 2;

            imgData.scaleX = scaleX;
            imgData.scaleY = scaleY;

            imgData.regX = regX;
            imgData.regY = regY;

            imgData.snapToPixel = options.snapToPixel;
            imgData.mouseEnabled = options.mouseEnabled;
            ngrStage.addChild(imgData);

            actor = ngrActor.newActor(body, imgData);
            ngrStage.actors.push(actor);

          } else {

            var container = nd.tile(img, options);

            ngrStage.addChild(container);

            actor = ngrActor.newActor(body, container);
            ngrStage.actors.push(actor);

          }


        })

    };

    this.tile = function(img, options) {

      var container = new createjs.Container();
      var SCALE = ngrState.getScale();

      var regX = 0;
      var regY = 0;

      var config = {};
      config.totalColumns = Math.ceil(options.width * 2 / img.width);
      config.totalRows = Math.ceil(options.height * 2 / img.height);
      config.totalTiles = config.totalColumns * config.totalRows;
      config.tiles = [];
      config.options = options;
      config.img = img;

      config.totalBitmapWidth = config.totalColumns * img.width / 2;
      config.totalBitmapHeight = config.totalRows * img.height / 2;

      config.objectHeight = options.height;
      config.objectWidth = options.width;

      config.scaleX = config.objectWidth / config.totalBitmapWidth;
      config.scaleY = config.objectHeight / config.totalBitmapHeight;

      function Tile() {
        this.x;
        this.y;
        this.width;
        this.height;
      }

      for (var i = 0; i < config.totalColumns; i++) {
        for (var k = 0; k < config.totalRows; k++) {
          var t = new Tile();

          t.x = (i * config.img.width) + config.img.width;
          t.y = (k * config.img.height) + config.img.height;

          t.scaleX = config.scaleX;
          t.scaleY = config.scaleY;
          t.src = config.options.src;
          config.tiles.push(t);
        }
      }

      _.each(config.tiles, function(tile) {
        var _imgData = new createjs.Bitmap(tile.src || 'img/null.png');

        _imgData.regY = tile.y;
        _imgData.regX = tile.x;

        _imgData.scaleX = t.scaleX;
        _imgData.scaleY = t.scaleY;

        container.addChild(_imgData);
      });

      container.regX = -options.width;
      container.regY = -options.height;

      return container;

    }

    this.background = function(src) {
      loadBitmap(src)
        .then(initImg);

      function initImg(bgData) {

        var env = ngrState.getState();
        var scaleX = env.width / bgData.image.width * 1.2;
        bgData.scaleX = scaleX;
        bgData.scaleY = scaleX;

        ngrStage.addChildAt(bgData);
        window.stage = ngrStage.stage;

      }
    }


    function loadBitmap(src) {
      var r = $q.defer();
      var imgData = new createjs.Bitmap(src);

      function checkImageReady() {

        var img = imgData.image;
        if (img.width) {
          return true;
        } else {
          return false;
        }
      };

      var awaitImageInterval = setInterval(function() {
        if (checkImageReady()) {

          clearInterval(awaitImageInterval);
          r.resolve(imgData);
        }
      }, 1);

      return r.promise;

    }
  })
