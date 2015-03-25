
////////////////////////////////////////////////
///////////////// DATA /////////////////////////
////////////////////////////////////////////////

var searchTerm="toyota";
var url="http://en.wikipedia.org/w/api.php?action=parse&format=json&page="+searchTerm+"&redirects&prop=text&callback=?";

function getWiki(cb){
  $.getJSON(url,function(data){
    wikiPage = data.parse.text["*"];
    $wikiDOM = $("<document>"+wikiPage+"</document>");
    var elem = $wikiDOM.find('.infobox').html();
    cb(elem);
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


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
    rendererTarget: null,
    hasAmbientLight : true,
    hasDirectionalLight : false,
    showLinks : false,
    autoAppendPopup : true,
    allowZoomThrough : true,
    positioningType : 'random', //random, automatic, grouped, or defined
      //if automatic
      groupSize : 2,
      //if grouped
      groupingVariable: 'group',
      groupingDensity: 30,
      //if defined
      positioningVariable: 'position',
    nodeColorFunction : function(node){
      if(node){
        return node.nodeColor;
      }else{return false}
    },
    nodeSizeFunction : function(node){
      if(node){
        return node.links.length;
      }else{return false}
    },
    nodePopupFunction : function(node){
      if(node){
        return node.getWiki(nodeAppenderFunction(elem));
      }else{return false}
    },
    linkColorFunction : function(srcNode){
      if(srcNode){
        return srcNode.linkColor;
      }else{return false}
    },
    renderSizeWidth : null,
    renderSizeHeight : null,
    nodeSize : 2,
    nodeWidthSegments : 128,
    nodeHeightSegments : 128,
    maxBound : 10000,
    xSpread : 40,
    ySpread : 40,
    zSpread : 40,
    backgroundType : 'color', //image or color
    backgroundColor : [0,0,0],
    backgroundImage : 'http://i.imgur.com/x4egEw1.jpg',
    nodeColor : [0,1,0],
    nodeHighlightColor : [1,0,0],
    linkColor : 0x00ff00,
    ambientLightColor : 0xffffff,
    directionalLightColor : 0xffffff,
    directionalLightPosX : 1,
    directionalLightPosY : 1,
    directionalLightPosZ : 1,
    meshPosX : 2+(2*1.5),
    meshPosY : -1,
    meshPosZ : -2,
    wireframeMesh: true,
    wireframeWidth: 1
  }

// Create 3DATA Scene

_3DATA.create(testData,optionsObj);

