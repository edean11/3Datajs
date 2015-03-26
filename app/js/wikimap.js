
////////////////////////////////////////////////
///////////////// DATA /////////////////////////
////////////////////////////////////////////////
var increment = 0;

function searchButtonClick(){
  function input1(){if($('.searchWiki1').val() !== ''){increment++;return $('.searchWiki1').val()}else{return null}}
  function input2(){if($('.searchWiki2').val() !== ''){increment++;return $('.searchWiki2').val()}else{return null}}
  function input3(){if($('.searchWiki3').val() !== ''){increment++;return $('.searchWiki3').val()}else{return null}}
  var searchTerms = [input1(),input2(),input3()];
  var dataObj = {};
  for(var i=0;i<increment;i++){
    if(searchTerms[i] !== null){
      console.log(searchTerms[i]);
      var url = "http://en.wikipedia.org/w/api.php?action=parse&format=json&page="+searchTerms[i]+"&redirects&prop=text&callback=?";
      getWiki(url,dataObj,i,callback);
    }
  }
    $('.wikimapContainer').toggleClass('hidden');
    _3DATA.create(dataObj,optionsObj);
}

function getWiki(url,dataObj,key){
  $.getJSON(url,function(data){
    wikiPage = data.parse.text["*"];
    $wikiDOM = $("<document>"+wikiPage+"</document>");
    var elem = $wikiDOM.find('.infobox').html();
    var title = data.parse.title;
    dataObj[title] = {};
    dataObj[title].elem = elem;
    dataObj[title].links = []
    var seeAlso = $wikiDOM.find('#See_also');
    var lis = seeAlso.parent().next().next().children();
    console.log(lis);
    // _.forEach(lis,function(li){
    //   var $li = $(li.innerHTML);
    //   var href = $li.attr('href')
    //   var linkTitle = $li.attr('title')
    //   console.log(linkTitle);
    //   dataObj[title].links.push(linkTitle);
    //   var linkUrl = "http://en.wikipedia.org/w/api.php?action=parse&format=json&page="+linkTitle+"&redirects&prop=text&callback=?"
    //   $.getJSON(linkUrl,function(linkData){
    //     var linkPage = linkData.parse.text["*"];
    //     var linkDom = $("<document>"+linkPage+"</document>");
    //     var linkElem = linkDom.find('.infobox').html();
    //     dataObj[linkTitle] = {};
    //     dataObj[linkTitle].elem = linkElem;
    //     dataObj[linkTitle].links = [title];
    //     if(key===increment-1){
    //       $('.wikimapContainer').toggleClass('hidden');
    //       console.log(dataObj);
    //       _3DATA.create(dataObj,optionsObj);
    //     }
    //   })
    // })
  });
}

nodeAppenderFunction = function(elem){
	var element = document.createElement('div');
  var table = '<table>'+elem+'</table>'
	element.innerHTML = table;
	element.style.background = 'white';
	element.className = element.className + ' wikimapInfoBox';
	return element;
}

////////////////////////////////////////////////
///////////////// OPTIONS //////////////////////
////////////////////////////////////////////////

  var optionsObj = {
    hasAmbientLight : true,
    hasDirectionalLight : false,
    hasDblClickZoom : true,
    showLinks : false,
    autoAppendPopup : false,
    positioningType : 'random', //random, automatic, grouped, or defined
      //if automatic
      groupSize : 1,
      //if grouped
      groupingVariable: 'group',
      groupingDensity: 30,
      //if defined
      positioningVariable: 'position',
    nodePopupFunction : function(node){
      return nodeAppenderFunction(node.elem);
    },
    nodeSize : 4,
    nodeWidthSegments : 16,
    nodeHeightSegments : 16,
    maxBound : 100000,
    zoomSpeed : 1,
    xSpread : 10,
    ySpread : 10,
    zSpread : 10,
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
    meshPosX : -0.5,
    meshPosY : 0,
    meshPosZ : 2,
    wireframeMesh: true,
    wireframeWidth: 1
  }

////////////////////////////////////////////
//////// Container Functions ///////////////
////////////////////////////////////////////

$('.wikiSearchButton').on('click',function(){
  searchButtonClick();
})

// x: -4.902929835952818 y: 47.02781974337995 z: -30.183731555007398



