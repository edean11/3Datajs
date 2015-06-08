
////////////////////////////////////////////////
///////////////// DATA /////////////////////////
////////////////////////////////////////////////

var soundFiles = [
	'sounds/220Hz.wav',
	'sounds/233_082Hz.wav',
	'sounds/246_942Hz.wav',
	'sounds/261_626Hz.wav',
	'sounds/277_183Hz.wav',
	'sounds/293_665Hz.wav',
	'sounds/311_127Hz.wav',
	'sounds/329_628Hz.wav',
	'sounds/349_228Hz.wav',
	'sounds/369_994Hz.wav',
	'sounds/391_995Hz.wav',
	'sounds/415_305Hz.wav',
	'sounds/440Hz.wav',
	'sounds/466_164Hz.wav',
	'sounds/493_883Hz.wav',
	'sounds/523_251Hz.wav',
	'sounds/554_365Hz.wav',
	'sounds/587_330Hz.wav',
	'sounds/622_254Hz.wav',
	'sounds/659_255Hz.wav',
	'sounds/698_456Hz.wav',
	'sounds/739_989Hz.wav',
	'sounds/783_991Hz.wav',
	'sounds/830_609Hz.wav',
	'sounds/880Hz.wav'
	]
var numberOfNodes = soundFiles.length;
var gameKeys = [];

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomHexVal(min, max) {
	if(getRandomInt(1,4)==='1'){
		var letters = ['A','B','C','D','E','F'];
		var randIndex = getRandomInt(0,7);
		return letters[randIndex];
	}else{
		return Math.floor(Math.random() * (max - min)) + min;
	}
}

function findOctave(path){
	var indSlash = path.indexOf('/');
	var indH = path.indexOf('H');
	var num = path.slice(indSlash+1,indH);
	if(num[0]==='2'||num[0]==='3'||num[0]==='4'&&num[0]==='1'){
		return 1;
	}else{return 2}
}

function appendSound(node,remove){
    _3DATA.appendPopup(node,remove);
    var sound = node.userData.nodeInfo.audioSrc;
    node.userData.nodeInfo.popup.innerHTML = '<audio autoplay><source src="'+sound+'" type="audio/wav"></audio>'
}

function createSoundNodes(numOfKeys){
  var obj = {};
  for(var i=0;i<numOfKeys;i++){
  	var soundIndex = getRandomInt(0,soundFiles.length-1);
	var soundFile = soundFiles[soundIndex];
    var color = function(){return '0x'+getRandomHexVal(0,9)+getRandomHexVal(0,9)+
    	getRandomHexVal(0,9)+getRandomHexVal(0,9)+
    	getRandomHexVal(0,9)+getRandomHexVal(0,9)}
    function audioSrc(){
		soundFiles.splice(soundIndex,1);
		return soundFile;
	}
    var popup = function(){
      var elem = document.createElement('div');
      elem.className = 'soundWave';
      return elem;
    }
    obj[i] = {
      name: i,
      nodeColor: color(),
      popup: popup(),
      audioSrc: audioSrc(),
      octave: findOctave(soundFile)
    }
  }
  return obj;
}

////////////////////////////////////////////////
///////////////// OPTIONS //////////////////////
////////////////////////////////////////////////

  var optionsObj = {
    respondToWindowResizing : true,
  	hasAmbientLight : true,
    hasDirectionalLight : true,
    ambientLightColor : 0xffffff,
    directionalLightColor : 0xffffff,
    directionalLightPosX : 1,
    directionalLightPosY : 1,
    directionalLightPosZ : 1,
    showLinks : false,
    dblClickAppendPopup : true,
    // autoAppendPopup : true,
    positioningType : 'grouped', //random, automatic, grouped, or defined
    groupingVariable: 'octave',
    groupingDensity: 10,
     nodeColorFunction : function(node){
         return node.nodeColor;
     },
     nodePopupFunction : function(node){
         return node.popup;
     },
     dblClickFunction : function(node){
     	appendSound(node,true);
     },
    nodeSize : 1,
    nodeWidthSegments : 16,
    nodeHeightSegments : 16,
    maxBound : 500,
    backgroundType : 'color', //image or color
    backgroundColor : [0,0.5,1],
    backgroundImage : 'http://i.imgur.com/x4egEw1.jpg',
    nodeColor : [0,1,0],
    nodeHighlightColor : [1,0,0],
    wireframeMesh: false
  }

_3DATA.create(createSoundNodes(24),optionsObj);



