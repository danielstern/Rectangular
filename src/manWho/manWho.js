 angular.module("manWho", ['ngAudio', 'Rectangular'])
   .service('manWho', function(ngrEnvironment,manWhoLevels) {
     console.log("Don't give a FUCK!");

     ngrEnvironment.init({
         floor: true,
         scale: 'auto',
         worldHeight: 20
     });

     this.gotoLevel = function(_lvl) {
     	 ngrEnvironment.load(manWhoLevels.getLevel(_lvl || 1))
     }

   })

   