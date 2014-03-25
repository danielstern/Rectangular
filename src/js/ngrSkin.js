angular.module('Rectangular')
  .service('ngrSkin', function (ngrState, ngrCamera, ngrDefaults, $q, ngrActor) {

    var nd = this;
    var _body;
    this.skin = function (body, options) {
      _body = body;

      var scale = ngrState.getScale() * ngrCamera.getZoom();

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

        options.spriteWidth = options.radius * scale;
        options.spriteHeight = options.radius * scale;

      } else if (options.shapeKind === "box") {

        options.spriteWidth = options.width * scale;
        options.spriteHeight = options.height * scale;

      } else if (options.shapeKind === "triangle") {

        options.spriteWidth = options.adjacent * scale;
        options.spriteHeight = options.opposite * scale;

      }

      body.options = _.extend(body.options, options)

      var _container = new createjs.Container();

      _body.container = _container;

      actor = ngrActor.newActor(body, _container);

      loadBitmap(options.src)
        .then(function (imgData) {

          var img = imgData.image;

          if (options.bg != 'tiled') {

            var scaleX;
            var scaleY;

            if (options.shapeKind === 'box') {
              scaleY = options.spriteHeight / img.height * 2;
              scaleX = options.spriteWidth / img.width * 2;

            } else {
              console.log("adding non titled circle", options);
              scaleY = options.spriteHeight / img.height;
              scaleX = options.spriteWidth / img.width;
            }

            var regY = (img.height) / 2;
            var regX = (img.width) / 2;

            imgData.regX = regX;
            imgData.regY = regY;
            //console.log("scaling?", options.spriteWidth, img.width, options);
            imgData.scaleX = options.spriteWidth / img.width * 2;
            imgData.scaleY = options.spriteHeight / img.height * 2;
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
      var scale = ngrState.getScale() * ngrCamera.getZoom();

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
      } else if (options.shapeKind === 'triangle') {
        var center = options.center || _body.GetLocalCenter();
        var innerAngleRads = Number(options.innerAngle) * Math.PI / 180;

        var points = options.points;
        var p1 = points[0];
        var p2 = points[1];
        var p3 = points[2];
        mask.graphics.f('#000').lineTo(p1.x * scale, p1.y * scale).lineTo(p2.x * scale, p2.y * scale).lineTo(p3.x * scale, p3.y * scale);
        mask.x = -center.x * scale;
        mask.y = -center.y * scale;
      }

      var stroke = new createjs.Shape();
      var strokeWidth = 2;
      stroke.graphics.beginFill("rgba(0,0,0,0.8)");
      if (options.shapeKind == 'box') {
        stroke.graphics.drawRect(
          -options.spriteWidth - strokeWidth / 2, 
          -options.spriteHeight - strokeWidth / 2, 
          options.spriteWidth * 2 + strokeWidth, 
          options.spriteHeight * 2 + strokeWidth);
      } else if (options.shapeKind == 'circle') {
        stroke.graphics.drawCircle(0, 0, options.spriteHeight + strokeWidth / 2);
      } else if (options.shapeKind === 'triangle') {

        var center = options.center || _body.GetLocalCenter();
        var innerAngleRads = Number(options.innerAngle) * Math.PI / 180;

        var points = options.points;
        var p1 = points[0];
        var p2 = points[1];
        var p3 = points[2];
        stroke.graphics.f('#000').lineTo(p1.x * scale, p1.y * scale).lineTo(p2.x * scale, p2.y * scale).lineTo(p3.x * scale, p3.y * scale);
        stroke.x = -center.x * scale;
        stroke.y = -center.y * scale;
        stroke.scaleX = stroke.scaleY = 1.1;
        stroke.x += strokeWidth/4;
        stroke.y += strokeWidth/4;


      }

      container.mask = mask;

      var wrapper = new createjs.Container();
      wrapper.addChild(stroke);
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
        var scaleX = env.canvas.width() / bgData.image.width  // ngrState.getScale();
        console.log("ScaleX?",scaleX);
        bgData.scaleX = scaleX;
        bgData.scaleY = scaleX;

        sprite.container.parallax = parallax;
        //  bgData.closeness = closeness || 0;
        bgData.x = -bgData.image.width / 4;
        bgData.y = -bgData.image.height / 4;

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
