angular.module('Rectangular')
  .service('ngrSkin', function (ngrState, ngrCamera, ngrDefaults, $q, ngrActor) {

    var nd = this;
    var _body;

    this.skin = function (body, options) {
      _body = body;

      var scale = ngrState.getScale();
      var _container = new createjs.Container();
      var defaults = _.clone(ngrDefaults.skin);
      var actor = undefined;
      var imgData;
      var r = {};
      

      options = _.extend(defaults, options);

      if (options.shapeKind === 'circle') {
        options.spriteWidth = options.radius * scale;
        options.spriteHeight = options.radius * scale;
      } else if (options.shapeKind === "box") {
        options.spriteWidth = options.width * scale;
        options.spriteHeight = options.height * scale;

      }

      body.options = _.extend(body.options, options)

      _body.container = _container;

      actor = ngrActor.newActor(body, _container);

      loadBitmap(options.src)
        .then(function (imgData) {

          var img = imgData.image;

          

          if (options.bg == 'tiled') {

            _container.addChild(nd.tile(img, options));

          } else if (options.bg == 'spritesheet') {
            
            var data = {
              images: [options.src],
              frames: options.frames,
              framerate: options.framerate,
              animations: options.animations,
              speed:0.4,
            };

           // console.log("Spritesheet,",data);
            var spriteSheet = new createjs.SpriteSheet(data);
            window.charSprite = spriteSheet;
            r.animation = new createjs.Sprite(spriteSheet, options.startAt || "stand");

            var animScale = options.spriteHeight / options.frameHeight * 2;
            
            r.animation.scaleX = r.animation.scaleY = animScale;

            _container.addChild(r.animation);

          } else {

            var scaleX;
            var scaleY;

            if (options.shapeKind === 'box') {
              scaleY = options.spriteHeight / img.height * 2;
              scaleX = options.spriteWidth / img.width * 2;

            } else if (options.shapeKind === 'circle') {
              scaleY = options.spriteHeight / img.height;
              scaleX = options.spriteWidth / img.width;
            }

            if (options.noScale) scaleX = scaleY = 1;

            var regY = (img.height) / 2;
            var regX = (img.width) / 2;

            imgData.regX = regX;
            imgData.regY = regY;
            imgData.scaleX = scaleX;
            imgData.scaleY = scaleY;
            imgData.mouseEnabled = options.mouseEnabled;
            _container.addChild(imgData)

          }

        })

      r.actor = actor;
      r.container = _container;

      return r;

    };

    this.tile = function (img, options) {

      var container = new createjs.Container();
      var scale = ngrState.getScale();

      var regX = 0;
      var regY = 0;

      var config = {};
      config.totalColumns = Math.ceil(options.spriteWidth * 2 / img.width);
      config.totalRows = Math.ceil(options.spriteHeight * 2 / img.height);
      config.totalTiles = config.totalColumns * config.totalRows;
      config.tiles = [];
      config.options = options;
      config.img = img;

      config.totalBitmapWidth = config.totalColumns * img.width / 2;
      config.totalBitmapHeight = config.totalRows * img.height / 2;

      config.objectHeight = options.spriteHeight;
      config.objectWidth = options.spriteWidth;

      config.scaleY = config.objectHeight / config.totalBitmapHeight;
      config.scaleX = config.scaleY;

      config.totalColumns *= 1 / config.scaleX;

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

      _.each(config.tiles, function (tile) {
        var _imgData = new createjs.Bitmap(tile.src || 'img/null.png');

        _imgData.regY = tile.y;
        _imgData.regX = tile.x;

        _imgData.scaleX = t.scaleX;
        _imgData.scaleY = t.scaleY;

        _imgData.snapToPixel = false;

        container.addChild(_imgData);
      });

      container.regX = -options.spriteWidth;
      container.regY = -options.spriteHeight;

      var mask = new createjs.Shape();
      mask.graphics.beginFill("rgba(0, 0, 0, 0)")
      if (options.shapeKind == 'box') {
        mask.graphics.drawRect(-options.spriteWidth, -options.spriteHeight, options.spriteWidth * 2, options.spriteHeight * 2);
      } else if (options.shapeKind == 'circle') {
        mask.graphics.drawCircle(0, 0, options.spriteHeight);
      }

      var strokeColor = options.strokeColor || "#000"

      var stroke = new createjs.Shape();
      var strokeWidth = options.strokeWidth || 1;
      stroke.graphics.beginFill(strokeColor);
      if (options.shapeKind == 'box') {
        stroke.graphics.drawRect(-options.spriteWidth - strokeWidth / 2, -options.spriteHeight - strokeWidth / 2,
          options.spriteWidth * 2 + strokeWidth,
          options.spriteHeight * 2 + strokeWidth);
      } else if (options.shapeKind == 'circle') {
        stroke.graphics.drawCircle(0, 0, options.spriteHeight + strokeWidth / 2);
      }

      container.mask = mask;

      var wrapper = new createjs.Container();
      if (!options.stroke === 0) wrapper.addChild(stroke);
      wrapper.addChild(mask);
      wrapper.addChild(container);

      return wrapper;

    }

    this.background = function (src, parallax) {

      var sprite = {
        container: new createjs.Container(),
        parallax: parallax
      };
      loadBitmap(src)
        .then(initImg);

      return sprite;

      function initImg(bgData) {

        var env = ngrState.getState();
        env.canvas = $('canvas');
        var scaleX = env.canvas.width() / bgData.image.width * ngrCamera.getLens() * (sprite.parallax || 1); // to cover the scene
        //bgData.scaleX = scaleX;
        //bgData.scaleY = scaleX;
        //bgData.regX = bgData.image.width / 10;
        //bgData.regY = bgData.image.height / 10;


        sprite.container.parallax = parallax;

        sprite.container.addChild(bgData);

      }
    }

    this.coverCanvas = function (src, parallax) {
        
      var canvas = $('canvas');

      var sprite = {
        container: new createjs.Container(),
        parallax: parallax
      };
      loadBitmap(src)
        .then(initImg);

      return sprite;

      function initImg(bgData) {

        var env = ngrState.getState();
        var scaleX = canvas.width() / bgData.image.width;
        bgData.scaleX = scaleX;
        bgData.scaleY = scaleX;

        sprite.container.addChild(bgData);

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

      var awaitImageInterval = setInterval(function () {
        if (checkImageReady()) {

          clearInterval(awaitImageInterval);
          r.resolve(imgData);
        }
      }, 1);

      return r.promise;

    }
  })
