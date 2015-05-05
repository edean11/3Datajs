


////////////////////////////////////////////////
///////////////// DATA /////////////////////////
////////////////////////////////////////////////

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Get US City Coordinates//


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
    hasAmbientLight : true,
    hasDirectionalLight : true,
    hasDblClickZoom : true,
    // dblClickAppendPopup : false,
    // popupRendererContainerClass : 'testContainer',
    autoAppendPopup : true,
    respondToWindowResizing : true,
    // zoomSpeed : 0.4,
    zoomAutoRotate : true,
    positioningType : 'defined', //random, automatic, grouped, or defined
    //   //if defined
    positioningVariable: 'position',
     nodePopupFunction : function(node){
    //   if(node){
         return node.popup;
    //   }else{return false}
     },
     geometryTypeFunction : function(node){
         return node.geometry
     },
    //defaultGeometryType : 'Box',
    //nodeSize : [4,4,4],
    nodeWidthSegments : 32,
    nodeHeightSegments : 32,
    nodeDepthSegments : 32,
    maxBound : 1000,
    backgroundType : 'image', //image or color
    backgroundImage : 'img/stars.jpeg',
    nodeColor : [0,1,0],
    nodeHighlightColor : [1,0,0],
    ambientLightColor : 0x404040,
    directionalLightColor : 0x808080,
    directionalLightPosX : 1,
    directionalLightPosY : 1,
    directionalLightPosZ : 1,
    materialType : 'Phong',
    meshPosX : 0,
    meshPosY : 0,
    meshPosZ : 0,
    wireframeMesh: false
    //wireframeWidth: 1
  }

// Create 3DATA Scene

//_3DATA.create(testData,optionsObj);

