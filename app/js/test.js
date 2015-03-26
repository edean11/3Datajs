

////////////////////////////////////////////////
///////////////// DATA /////////////////////////
////////////////////////////////////////////////

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createTestData(numOfKeys, numOfLinks){
  var obj = {};
  for(var i=0;i<numOfKeys;i++){
    var color = function(){if(i%2 !== 0){return [0,1,0]}else{return [0,0,1]}}
    var linkColor = function(){if(i%2 !== 0){return [150,0,150]}else{return [1,0,0]}}
    var nodeSize = function(){if(i%2 !== 0){return 5}else{return 2}}
    var group = function(){if(i%3 === 0 && i%2 !== 0){return 1}else if(i%2 !== 0){return 3}else{return 2}}
    var position = function(){return [getRandomInt(-300,300),getRandomInt(-300,300),getRandomInt(-300,300)]}
    var popup = function(){
      var elem = document.createElement('div');
      elem.className = 'infoBox';
      elem.innerHTML = i;
      return elem;
    }
    obj[i] = {
      name: i,
      links: [],
      nodeColor: color(),
      linkColor: linkColor(),
      nodeSize: nodeSize(),
      popup: popup(),
      group: group(),
      position: position()
    }
    if(i%2 !== 0){
      for(var j=0;j<numOfLinks;j++){
        obj[i].links[j] = getRandomInt(0,numOfKeys-1);
      }
    }else{
      for(var j=0;j<numOfLinks+2;j++){
        obj[i].links[j] = getRandomInt(0,numOfKeys-1);
      }
    }
  }
  return obj;
}

var testData = createTestData(20,2);

  nodeAppenderFunction = function(elem){
    var element = document.createElement('div');
    element.innerHTML = elem;
    element.style.background = 'white';
    element.style.border = '2px solid black';
    element.className = element.className + ' infoBox';
    return element;
  }

////////////////////////////////////////////////
///////////////// OPTIONS //////////////////////
////////////////////////////////////////////////

  var optionsObj = {
    // rendererTarget: null,
    // hasAmbientLight : true,
    // hasDirectionalLight : false,
    // hasDblClickZoom : true,
    // showLinks : true,
    // autoAppendPopup : true,
    // allowZoomThrough : true,
    positioningType : 'random', //random, automatic, grouped, or defined
    //   //if automatic
    //   groupSize : 2,
    //   //if grouped
    //   groupingVariable: 'group',
    //   groupingDensity: 30,
    //   //if defined
    //   positioningVariable: 'position',
    // nodeColorFunction : function(node){
    //   if(node){
    //     return node.nodeColor;
    //   }else{return false}
    // },
    // nodeSizeFunction : function(node){
    //   if(node){
    //     return node.links.length;
    //   }else{return false}
    // },
    // nodePopupFunction : function(node){
    //   if(node){
    //     return node.popup;
    //   }else{return false}
    // },
    // linkColorFunction : function(srcNode){
    //   if(srcNode){
    //     return srcNode.linkColor;
    //   }else{return false}
    // },
    // renderSizeWidth : null,
    // renderSizeHeight : null,
    // nodeSize : 2,
    // nodeWidthSegments : 128,
    // nodeHeightSegments : 128,
    // maxBound : 10000,
    // xSpread : 40,
    // ySpread : 40,
    // zSpread : 40,
    // backgroundType : 'color', //image or color
    // backgroundColor : [0,0,0],
    // backgroundImage : 'http://i.imgur.com/x4egEw1.jpg',
    // nodeColor : [0,1,0],
    // nodeHighlightColor : [1,0,0],
    // linkColor : 0x00ff00,
    // ambientLightColor : 0xffffff,
    // directionalLightColor : 0xffffff,
    // directionalLightPosX : 1,
    // directionalLightPosY : 1,
    // directionalLightPosZ : 1,
    // meshPosX : 2+(2*1.5),
    // meshPosY : -1,
    // meshPosZ : -2,
    // wireframeMesh: true,
    // wireframeWidth: 1
  }

// Create 3DATA Scene

_3DATA.create(testData,optionsObj);

