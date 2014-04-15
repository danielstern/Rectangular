angular.module("ConfusionQuest")
  .service('devLevel', function (ConfusionQuestLevels) {
    ConfusionQuestLevels.addLevel(
   		{"properties":{"canvas":null,"scale":30,"fps":60,"gravity":60,"debug":true,"zoom":1,"floor":true,"room":{"width":100,"height":50,"floor":true,"roof":false,"leftWall":true,"rightWall":true},"worldHeight":25,"worldWidth":40,"speed":60,"world":null},"elements":[{"options":{"height":0.5,"width":10,"x":23.813844644858197,"y":39.56427219894775,"radius":1,"density":0,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0,"type":0,"angle":0,"bg":"tiled","src":"img/box.png","userData":{"isFloor":true},"shape":{"name":"Rectangle","type":"box"},"skin":{"name":"Boxy","type":"boxy","src":"img/box.png"},"shapeKind":"box"},"isShape":true},{"options":{"height":0.5,"width":10,"x":82.0316974404526,"y":38.891038243566214,"radius":1,"density":0,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0,"type":0,"angle":0,"bg":"tiled","src":"img/box.png","userData":{"isFloor":true},"shape":{"name":"Rectangle","type":"box"},"skin":{"name":"Boxy","type":"boxy","src":"img/box.png"},"shapeKind":"box"},"isShape":true},{"options":{"height":0.5,"width":10,"x":51.10052000644524,"y":27.011751681533767,"radius":1,"density":0,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0,"type":0,"angle":0,"bg":"tiled","src":"img/box.png","userData":{"isFloor":true},"shape":{"name":"Rectangle","type":"box"},"skin":{"name":"Boxy","type":"boxy","src":"img/box.png"},"shapeKind":"box"},"isShape":true},{"options":{"height":2,"width":1.24,"x":40.07850809139754,"y":47.49250000000001,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/calvin/calvin.png","userData":{"doodad":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","profile":"Calvin","framerate":90,"frames":{"width":238.5,"height":223.5,"regX":120,"regY":145},"frameWidth":90,"frameHeight":160,"animations":{"run":[0,15],"stand":[16,45],"jump":[46,75,"fly"],"fly":[75],"duck":[76,165],"hurt":[166],"punch1":[167,180,"stand"],"kick1":[176,185,"stand"],"kick2":[180,187,"stand"],"punch2":[188,193,192,191,"stand"]}},"isShape":true},{"options":{"height":3,"width":3,"x":23.44388859686666,"y":33.43657815916115,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/powershoe.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","profile":"boots1","framerate":90,"frames":{"width":238.5,"height":223.5,"regX":120,"regY":145},"frameWidth":90,"frameHeight":160,"animations":{"run":[0,15],"stand":[16,45],"jump":[46,75,"fly"],"fly":[75],"duck":[76,165],"hurt":[166],"punch1":[167,180,"stand"],"kick1":[176,185,"stand"],"kick2":[180,187,"stand"],"punch2":[188,193,192,191,"stand"]}},"isShape":true},{"options":{"height":0.5,"width":15,"x":15.955499459388259,"y":13.38516853426537,"radius":1,"density":0,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0,"type":0,"angle":0,"bg":"tiled","src":"img/box.png","userData":{"isFloor":true},"shape":{"name":"Rectangle","type":"box"},"skin":{"name":"Boxy","type":"boxy","src":"img/box.png"},"shapeKind":"box","framerate":90,"frames":{"width":238.5,"height":223.5,"regX":120,"regY":145},"frameWidth":90,"frameHeight":160,"animations":{"run":[0,15],"stand":[16,45],"jump":[46,75,"fly"],"fly":[75],"duck":[76,165],"hurt":[166],"punch1":[167,180,"stand"],"kick1":[176,185,"stand"],"kick2":[180,187,"stand"],"punch2":[188,193,192,191,"stand"]}},"isShape":true},{"options":{"height":0.5,"width":15,"x":83.99106486776051,"y":12.612632685138747,"radius":1,"density":0,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0,"type":0,"angle":0,"bg":"tiled","src":"img/box.png","userData":{"isFloor":true},"shape":{"name":"Rectangle","type":"box"},"skin":{"name":"Boxy","type":"boxy","src":"img/box.png"},"shapeKind":"box","framerate":90,"frames":{"width":238.5,"height":223.5,"regX":120,"regY":145},"frameWidth":90,"frameHeight":160,"animations":{"run":[0,15],"stand":[16,45],"jump":[46,75,"fly"],"fly":[75],"duck":[76,165],"hurt":[166],"punch1":[167,180,"stand"],"kick1":[176,185,"stand"],"kick2":[180,187,"stand"],"punch2":[188,193,192,191,"stand"]}},"isShape":true},{"options":{"height":0.5,"width":5,"x":-6.013392729815092,"y":8.599005497915755,"radius":1,"density":0,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0,"type":0,"angle":0,"bg":"tiled","src":"img/box.png","userData":{"isFloor":true},"shape":{"name":"Rectangle","type":"box"},"skin":{"name":"Boxy","type":"boxy","src":"img/box.png"},"shapeKind":"box","framerate":90,"frames":{"width":238.5,"height":223.5,"regX":120,"regY":145},"frameWidth":90,"frameHeight":160,"animations":{"run":[0,15],"stand":[16,45],"jump":[46,75,"fly"],"fly":[75],"duck":[76,165],"hurt":[166],"punch1":[167,180,"stand"],"kick1":[176,185,"stand"],"kick2":[180,187,"stand"],"punch2":[188,193,192,191,"stand"]}},"isShape":true},{"options":{"height":3,"width":3,"x":-6.053790106949666,"y":3.7238648358952275,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0,"type":0,"angle":0,"bg":"sprite","src":"img/helmet1.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","profile":"helmet1","framerate":90,"frames":{"width":238.5,"height":223.5,"regX":120,"regY":145},"frameWidth":90,"frameHeight":160,"animations":{"run":[0,15],"stand":[16,45],"jump":[46,75,"fly"],"fly":[75],"duck":[76,165],"hurt":[166],"punch1":[167,180,"stand"],"kick1":[176,185,"stand"],"kick2":[180,187,"stand"],"punch2":[188,193,192,191,"stand"]}},"isShape":true},{"options":{"height":1.5,"width":1.5,"x":15.257799746856321,"y":7.911003779114388,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/keyRed.png","userData":{},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"keyRed"},"isShape":true},{"options":{"height":4,"width":4,"x":89.79110957049639,"y":5.644323161264669,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/lock_red.png","userData":{},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"doorRed"},"isShape":true},{"options":{"height":1,"width":1,"x":90.32444290385457,"y":45.11098982791776,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":85.25777623718793,"y":44.97765649458443,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":80.32444290385459,"y":44.97765649458443,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":74.19110957052128,"y":45.11098982791776,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":67.12444290385463,"y":45.244323161251096,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":62.191109570521306,"y":45.77765649458443,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":30.05777623718804,"y":45.77765649458443,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":25.924442903854715,"y":45.644323161251094,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":18.057776237188072,"y":45.51098982791776,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":12.857776237188077,"y":45.77765649458443,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":6.724442903854758,"y":46.0443231612511,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":73.92444290385461,"y":34.177656494584454,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":80.59110957052127,"y":33.777656494584456,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":86.72444290385458,"y":33.51098982791779,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":59.39110957052131,"y":23.644323161251144,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":53.79110957052132,"y":22.97765649458448,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":48.057776237188,"y":22.844323161251147,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":43.12444290385468,"y":22.97765649458448,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":37.52444290385469,"y":15.11098982791783,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":61.7911095705213,"y":15.777656494584495,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":68.72444290385462,"y":29.64432316125113,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":34.724442903854694,"y":30.17765649458446,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":71.12444290385461,"y":6.577656494584513,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":78.99110957052126,"y":6.310989827917847,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":30.191109570521377,"y":7.777656494584512,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":22.324442903854727,"y":8.044323161251178,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":5.8516973608072895,"y":7.722138062037434,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":5.817615450626064,"y":2.183959089971008,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":5.662410117465299,"y":-4.087908323271925,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":1,"width":1,"x":5.92464571169101,"y":-8.088961948226583,"radius":1,"density":0.2,"friction":0.2,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":0,"angle":0,"bg":"sprite","src":"img/coinGold.png","userData":{"doodad":true,"isCoin":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"confCoin"},"isShape":true},{"options":{"height":2,"width":2,"x":50.057544234910644,"y":47.49333571217312,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":29.254497879574945,"y":47.49128426735364,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":64.8544978795543,"y":47.49250000000001,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":79.52733235770596,"y":36.38595014798964,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":88.0544978795538,"y":36.38353824356622,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":55.38783121288719,"y":24.504251681533766,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":49.65449787955387,"y":24.501996898223556,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":28.587831212887252,"y":37.05432554379673,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":9.121164546220626,"y":47.49249999999999,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":73.25449787955382,"y":10.105132685138747,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":28.32116454622059,"y":10.87766853426537,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":2,"width":2,"x":8.054497879553963,"y":10.87766853426537,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/enemy1.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Madness","frames":{"width":395,"height":390,"regX":200,"regY":220},"frameWidth":300,"frameHeight":300,"animations":{"stand":[0,47]}},"isShape":true},{"options":{"height":3,"width":1.5,"x":56.32116454622052,"y":18.258773350512943,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/mahakana.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Mahakana","frames":{"width":78,"height":110,"regX":44,"regY":50},"frameWidth":70,"frameHeight":100,"animations":{"stand":{"frames":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2],"speed":0.4}}},"isShape":true},{"options":{"height":3,"width":1.5,"x":44.85449787955388,"y":18.52544001717961,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/mahakana.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Mahakana","frames":{"width":78,"height":110,"regX":44,"regY":50},"frameWidth":70,"frameHeight":100,"animations":{"stand":{"frames":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2],"speed":0.4}}},"isShape":true},{"options":{"height":3,"width":1.5,"x":80.32116454622047,"y":5.858773350512948,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/mahakana.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Mahakana","frames":{"width":78,"height":110,"regX":44,"regY":50},"frameWidth":70,"frameHeight":100,"animations":{"stand":{"frames":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2],"speed":0.4}}},"isShape":true},{"options":{"height":3,"width":1.5,"x":18.987831212887276,"y":8.21710668384629,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/mahakana.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Mahakana","frames":{"width":78,"height":110,"regX":44,"regY":50},"frameWidth":70,"frameHeight":100,"animations":{"stand":{"frames":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2],"speed":0.4}}},"isShape":true},{"options":{"height":3,"width":1.5,"x":18.45449787955394,"y":35.14544001717955,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/mahakana.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Mahakana","frames":{"width":78,"height":110,"regX":44,"regY":50},"frameWidth":70,"frameHeight":100,"animations":{"stand":{"frames":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2],"speed":0.4}}},"isShape":true},{"options":{"height":3,"width":1.5,"x":81.77071748160515,"y":31.38445108937264,"radius":1,"density":0.07,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":0.4,"type":2,"angle":0,"bg":"spritesheet","src":"img/sprites/mahakana.png","userData":{"isEnemy":true},"shape":{"name":"Rectangle","type":"box"},"shapeKind":"box","index":0,"profile":"Mahakana","frames":{"width":78,"height":110,"regX":44,"regY":50},"frameWidth":70,"frameHeight":100,"animations":{"stand":{"frames":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2],"speed":0.4}}},"isShape":true},{"options":{"height":0.5,"width":50,"x":50,"y":50,"radius":1.5,"density":0.4,"friction":0.3,"restitution":0.2,"linearDamping":0,"angularDamping":0,"gravityScale":1,"type":0,"angle":0,"isFloor":1,"shapeKind":"box","src":"img/stoneMid.png","bg":"tiled","userData":{"isFloor":true},"memo":"floor"},"isShape":true},{"options":{"height":25,"width":1,"x":0,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"type":0,"angle":0,"shapeKind":"box","src":"img/snowCenter.png","bg":"tiled","memo":"leftWall"},"isShape":true},{"options":{"height":25,"width":1,"x":100,"y":25,"radius":1.5,"density":0.5,"friction":0.2,"restitution":0.1,"linearDamping":0,"angularDamping":0,"gravityScale":1,"type":0,"angle":0,"shapeKind":"box","src":"img/snowCenter.png","bg":"tiled","memo":"rightWall"},"isShape":true}]}
    	);

  });
