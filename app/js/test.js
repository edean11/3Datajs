

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
    var linkColor = function(){if(i%2 !== 0){return [0,20,150]}else{return [200,0,0]}}
    var nodeSize = function(){if(i%2 !== 0){return [4,4,4]}else{return [2,2,2]}}
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

var testData = createTestData(10,2);

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
    //rendererTarget: '.container',
    hasAmbientLight : true,
    hasDirectionalLight : true,
    hasDblClickZoom : true,
    // dblClickAppendPopup : false,
    // popupRendererContainerClass : 'testContainer',
     showLinks : true,
    // autoAppendPopup : true,
    // zoomSpeed : 0.4,
    zoomAutoRotate : true,
    positioningType : 'random', //random, automatic, grouped, or defined
    //   //if automatic
       groupSize : 1,
    //   //if grouped
    //   groupingVariable: 'group',
    //   groupingDensity: 30,
    //   //if defined
    //   positioningVariable: 'position',
     nodeColorFunction : function(node){
    //   if(node){
         return node.nodeColor;
    //   }else{return false}
     },
     nodeSizeFunction : function(node){
    //   if(node){
         return node.nodeSize;
    //   }else{return false}
     },
     nodePopupFunction : function(node){
    //   if(node){
         return node.popup;
    //   }else{return false}
     },
     linkColorFunction : function(srcNode){
    //   if(srcNode){
         return srcNode.linkColor;
    //   }else{return false}
     },
     customGeometryFunction : function(){
         var box = new THREE.BoxGeometry(100,100,100);
         return box;
     },
    nodeSize : 40,
    nodeWidthSegments : 32,
    nodeHeightSegments : 32,
    nodeDepthSegments : 32,
    maxBound : 1000,
    xSpread : 10,
    ySpread : 5,
    zSpread : 5,
    backgroundType : 'image', //image or color
    backgroundColor : [150,150,0],
    backgroundImage : 'img/stars.jpeg',
    nodeColor : [0,1,0],
    nodeHighlightColor : [1,0,0],
    linkColor : 0x00ff00,
    ambientLightColor : 0x404040,
    directionalLightColor : 0x808080,
    directionalLightPosX : 1,
    directionalLightPosY : 1,
    directionalLightPosZ : 1,
    materialType : 'Phong',
    geometryType : 'Box',
    meshPosX : 0,
    meshPosY : 0,
    meshPosZ : 0,
    wireframeMesh: false,
    wireframeWidth: 1
  }

// Create 3DATA Scene

_3DATA.create(testData,optionsObj);

