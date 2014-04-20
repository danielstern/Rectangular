angular.module("ConfusionQuest")
.service("ConfusionQuestSoundtrack",function(ConfusionQuest, ngrSoundtrack, ngrGame){

  var sounds = [{
      id: 'punch1',
      defaultVolume: 0.3,
      src: 'audio/fight/Punch1.wav',
      family: 'punch',
      kind: 'effect',
    }, {
      id: 'punch2',
      defaultVolume: 0.3,
      src: 'audio/fight/Punch2.wav',
      family: 'punch',
      kind: 'effect',
    },{
      id: 'punch3',
      defaultVolume: 0.3,
      src: 'audio/fight/Punch3.wav',
      family: 'punch',
      kind: 'effect',
    },{
      id: 'punch4',
      defaultVolume: 0.3,
      src: 'audio/fight/Punch4.wav',
      family: 'punch',
      kind: 'effect',
    },{
      id: 'punch5',
      defaultVolume: 0.3,
      src: 'audio/fight/Punch5.wav',
      family: 'punch',
      kind: 'effect',
    },{
      id: 'swing1',
      defaultVolume: 0.3,
      src: 'audio/fight/Air Swing 1.wav',
      family: 'swing',
      kind: 'effect',
    },{
      id: 'swing2',
      defaultVolume: 0.3,
      src: 'audio/fight/Air Swing 2.wav',
      family: 'swing',
      kind: 'effect',
    },{
      id: 'swing3',
      defaultVolume: 0.3,
      src: 'audio/fight/Air Swing 3.wav',
      family: 'jump',
      kind: 'effect',
    },{
      id: 'swing4',
      defaultVolume: 0.3,
      src: 'audio/fight/Air Swing 4.wav',
      family: 'swing',
      kind: 'effect',
    },{
      id: 'swing5',
      defaultVolume: 0.3,
      src: 'audio/fight/Air Swing 5.wav',
      family: 'swing',
      kind: 'effect',
    },{
      id: 'swing6',
      defaultVolume: 0.3,
      src: 'audio/fight/PK_swing1.wav',
      family: 'jump',
      kind: 'swing',
    }];

		var ConfusionQuestSoundtrack = this
    ngrSoundtrack.registerSounds(sounds)

    ngrGame.oncreateentity(function(entity) {
    	if (!entity.onbehavior) return;
    	entity.onbehavior(function(behavior){
    		if (behavior == 'hit-punch') {
    			ConfusionQuestSoundtrack.playFamily('punch');
    		}

        if (behavior == 'attack-swing') {
          ConfusionQuestSoundtrack.playFamily('swing');
        }

        if (behavior == 'jump') {
          ConfusionQuestSoundtrack.playFamily('jump');
        }
    	})
    });

    this.playFamily = function(family) {
    	console.log("playing sound in family::" , family);
      var possibleSounds = _.filter(sounds,function(sound){
        if (sound.family == family) return true;
      })

      var sound = _.sample(possibleSounds);
      ngrSoundtrack.play(sound.id)
    }

})
