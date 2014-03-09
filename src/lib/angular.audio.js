/* NG AUDIO MOD
@github: danielstern
License: PLEASE USE FOR EVIL*/

angular.module('ngAudio',[])
.directive('ngAudio', function () {
  return {
    restrict: 'A',
    controller: function ($scope, $attrs, $element) {

  	/* Add a click listner to the element the directive is on. */
   	$element.click(function(){
   		
 		/* Find the sound tag embedded in the markup. */
 		var $sound = document.getElementById($attrs.ngAudio);

 		/* Play the sound. */
 		$sound.play();
   	})   
  },
 }
})
.service('ngAudio',function(){
	var a = this;
	var mutedSounds = [];
	var soundVolumes = {};

	this.play = function(id) {
		var $sound = document.getElementById(id);

		/* Play the sound. */
		$sound.pause();
		$sound.currentTime = 0;
		$sound.play();

	};

	this.mute = function(ids) {
		if (!_.isArray(ids)) {
			ids = [ids];
		}
		_.each(ids,function(id){
			//console.log("Iterating...",id);
			mutedSounds.push(id);
			soundVolumes[id] = a.getSoundVolume(id);
			//console.log("Sound volumes?",a.getSoundVolume(id), soundVolumes)
			a.setSoundVolume(id, 0);
		})
	};

	this.toggleMute = function(ids) {
		if (!_.isArray(ids)) {
			ids = [ids];
		};

		_.each(ids,function(id){
			//console.log("Toggling mute",mutedSounds,id);
			if (_.contains(mutedSounds, id)) {
				a.unmute(id);
			} else {
				a.mute(id);
			}
		});
	}

	this.unmute = function(id) {
		//console.log("Unmuting");
		mutedSounds = _.without(mutedSounds, id);
		a.setSoundVolume(id, soundVolumes[id]);
	};


	this.getSoundVolume = function(id) {
		var $sound = document.getElementById(id);
		return $sound.volume;
	}

	this.setSoundVolume = function(id, vol) {
		//console.log("Setting sound vol",id,vol)
		var $sound = document.getElementById(id);
		$sound.volume = vol;
	}

	this.stop = function(id) {
		var $sound = document.getElementById(id);

		/* stop the sound. */
		$sound.pause();
		$sound.currentTime = 0;

	};


})