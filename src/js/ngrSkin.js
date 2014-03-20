angular.module('Rectangular')
  .service('ngrSkin', function (ngrState, ngrDefaults, $q, ngrActor) {

    var nd = this;
    var _body;
    this.skin = function (body, options) {
      _body = body;

      var scale = ngrState.getScale() * ngrState.getZoom();

      var f = body.GetFixtureList();
      var s = f.GetShape();
      var actor = {};

      var defaults = _.clone(ngrDefaults.skin);

      if (s.constructor === b2CircleShape) {

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

      var imgData;
   
        if (options.shapeKind === 'circle') {

          console.log("Skinning a circle", options);

          options.spriteWidth = options.radius * scale;
          options.spriteHeight = options.radius * scale;

        } else {

          options.spriteWidth = options.width * scale;
          options.spriteHeight = options.height * scale;

        }

        body.options = _.extend(body.options, options)
    

      var _container = new createjs.Container();

      _body.container = _container;

      actor = ngrActor.newActor(body, _container);

      loadBitmap(options.src)
        .then(function (imgData) {

          var img = imgData.image;

          if (options.bg != 'tiled') {

            var container = new createjs.Container();
            var scaleX;
            var scaleY;

            if (options.shapeKind === 'box') {

            scaleY = options.spriteHeight / img.height * 2;
            scaleX = options.spriteWidth / img.width * 2;

            } else {
              scaleY = options.spriteHeight / img.height;
              scaleX = options.spriteWidth / img.width;
            }

            var regY = (img.height) / 2;
            var regX = (img.width) / 2;

            imgData.scaleX = scaleX;
            imgData.scaleY = scaleY;

            imgData.regX = regX;
            imgData.regY = regY;

      //      imgData.snapToPixel = options.snapToPixel;
            imgData.mouseEnabled = options.mouseEnabled;
            _container.addChild(imgData)

          } else {

            _container.addChild(nd.tile(img, options));

          }

        })

      return {
        actor: actor,
        container: _container
      }

    };

    this.tile = function (img, options) {

      var container = new createjs.Container();
      var SCALE = ngrState.getScale() * ngrState.getZoom();

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

      container.mask = mask;

      var wrapper = new createjs.Container();
      wrapper.addChild(mask);
      wrapper.addChild(container);

      return wrapper;

    }

    this.background = function (src, closeness) {

      var sprite = {
        container: new createjs.Container(),
      };
      loadBitmap(src)
        .then(initImg);

      return sprite;

      function initImg(bgData) {

        var env = ngrState.getState();
        var scaleX = env.width / bgData.image.width * 2.4 // ngrState.getScale();
        bgData.scaleX = scaleX;
        bgData.scaleY = scaleX;
        bgData.closeness = closeness || 0;

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
