
//This example is in progress and is not functioning at this time, check back later for updates


////////////////////////////////////////////////
///////////////// DATA /////////////////////////
////////////////////////////////////////////////

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Get US City Coordinates//
function parseMapData(){
  var obj = createMapData(),
  locations = {};
  $.each(obj, function(index,value){
    console.log(obj[index])
    var popup = function(){
      var elem = document.createElement('div');
      elem.className = 'infoBox';
      if(obj[index] && obj[index].src){
        elem.innerHTML = '<p class="cityStateTitle">'+obj[index].city+', '+obj[index].state+
        '</p><img class="flag" src="'+obj[index].src[0]+
        '"></img><img class="seal" src="'+obj[index].src[1]+'"></img><a href="'+obj[index].wikiUrl+'">Link</a>';
      }else{
        elem.innerHTML = '<p class="cityStateTitle">'+obj[index].city+', '+obj[index].state+'</p>'
      }
      return elem;
    }
    locations[index] = {
      name: obj[index].city+', '+obj[index].state,
      nodeColor: [1,1,1],
      nodeSize: 10,
      popup: popup()
      //position: position()
    }

  })
  return locations;
}

var dataObj = parseMapData();

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
    positioningType : 'random', //random, automatic, grouped, or defined
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
    nodeWidthSegments : 8,
    nodeHeightSegments : 8,
    nodeDepthSegments : 8,
    maxBound : 1000,
    backgroundType : 'color', //image or color
    backgroundImage : 'img/stars.jpeg',
    backgroundColor : [150,150,0],
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

_3DATA.create(dataObj,optionsObj);

