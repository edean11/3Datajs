

////////////////////////////////////////////////
///////////////// DATA /////////////////////////
////////////////////////////////////////////////


function init(url,type){
	$.getJSON(url,function(data){
		var dataObj = {}
		var path = data[type+'s'].items;
		var length = path.length;
		var lastPos = 20;
		var gapVar = 2;
		_.forEach(path,function(result,key){
			var id = result.id;
			var embed = '<iframe src="https://embed.spotify.com/?uri=spotify%3A'+type+'%3A'+id+'" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'
			var elem = document.createElement('div');
			elem.className = 'result';
			elem.innerHTML = embed;
			var position = [-8+(gapVar*key),0,lastPos];
			lastPos = lastPos - gapVar;
			dataObj[id] = {};
			dataObj[id].embed = elem;
			dataObj[id].position = position;
			console.log(result,key);
			if(key===0){
				function genre(){if(result.genres){return result.genres[0]}else{return ''}}
				function popularity(){if(result.popularity){return result.popularity}else{return ''}}
				var genreEl = $('<p class="genre">'+genre()+'</p>');
				var imageUrl = $('<img class="playImage" src="'+result.images[0].url+'"></img>');
				var name = $('<p class="playName">'+result.name+'</p>');
				var popularityEl = $('<p class="playPopularity">'+popularity()+'</p>');
				var $resultContainer = $('<div class="resultContainer"></div>');
				$resultContainer.append(imageUrl);
				$resultContainer.append(name);
				$resultContainer.append(genre);
				$resultContainer.append(popularity);
				$('.playContainer').append($resultContainer);
			}
		})
		_3DATA.create(dataObj,optionsObj);
		var camera = _3DATA.getCamera()[0];
		var orbitControls = _3DATA.getCamera()[1];
		camera.position.x = -9;
		camera.position.y = -0.1;
		camera.position.z = 21.7;
		orbitControls.center.x = 31;
		orbitControls.center.z = -18;
		orbitControls.noPan = true;
		orbitControls.noRotate = true;
		_3DATA.render();
	});
}

////////////////////////////////////////////////
///////////////// OPTIONS //////////////////////
////////////////////////////////////////////////

  var optionsObj = {
    hasDblClickZoom : false,
    autoAppendPopup : true,
    allowZoomThrough : true,
    zoomSpeed : 0.08,
    positioningType : 'defined', //random, automatic, grouped, or defined
      //if defined
      positioningVariable: 'position',
    nodePopupFunction : function(node){
        return node.embed;
    },
    nodeSize : 0.3,
    nodeWidthSegments : 16,
    nodeHeightSegments : 16,
    maxBound : 66,
    backgroundType : 'color', //image or color
    backgroundColor : [1,1,1],
    backgroundImage : 'http://i.imgur.com/x4egEw1.jpg',
    nodeColor : '0xafd92c',//[0,235,10],
    meshPosX : 0.5,
    meshPosY : 0,
    meshPosZ : 0,
    wireframeMesh: true,
    wireframeWidth: 1
  }

//////////////////////////////////////////
//////// Container Functions ////////////
//////////////////////////////////////////

var container = $('.spotiflyContainer');
var searchInputAlbum = $('.searchInputAlbum');
var searchInputArtist = $('.searchInputArtist');
var searchInputTrack = $('.searchInputTrack');
var searchButton = $('.searchButton');

searchButton.click(function(){
	if(searchInputAlbum.val() === '' && searchInputArtist.val() === '' 
		&& searchInputTrack.val() === ''){
		alert('Enter an Album, Artist and/or Song to Search');
	} else if(searchInputAlbum.val() !== '' && searchInputArtist.val() === '' 
		&& searchInputTrack.val() === ''){
		toggleContainers();
		var type = 'album'
		var search = createSearchString(searchInputAlbum.val());
		var url = 'https://api.spotify.com/v1/search?q='+search+'&type='+type;
		init(url,type);
	} else if(searchInputAlbum.val() === '' && searchInputArtist.val() !== ''
		&& searchInputTrack.val() === ''){
		toggleContainers();
		var type = 'artist'
		var search = createSearchString(searchInputArtist.val());
		var url = 'https://api.spotify.com/v1/search?q='+search+'&type='+type;
		init(url,type);
	} else if(searchInputAlbum.val() === '' && searchInputArtist.val() === ''
		&& searchInputTrack.val() !== ''){
		toggleContainers();
		var type = 'track'
		var search = createSearchString(searchInputTrack.val());
		var url = 'https://api.spotify.com/v1/search?q='+search+'&type='+type;
		init(url,type);
	} else {alert('Currently only one search parameter is allowed')}
})

function createSearchString(search){
	if(search.indexOf(' ') !== -1){
		var index = search.indexOf(' ');
		search[index] = '+';
		console.log(search);
		return search;
	}else {return search}
}

function toggleContainers(){
	$('.searchContainer').toggleClass('hidden');
	$('.playContainer').toggleClass('hidden');
	container.css('position','absolute');
	container.css('right','5%');
}

function classChangeListener(row){
	var $row = $(row);
	$row.attrchange({
		trackValues: true,
		callback: function(event){
			console.log(event);
		}
	});
}

function attachClassListeners(){
	var rows = $('.content').find('li');
	console.log(rows);
	if(rows.length !== 0){
		_.forEach(rows,function(row){
			console.log(row);
			classChangeListener(row);
		})
	} else {}
}

function attachPlayButtonListener(){
	var play = $('.ppbtn');
	var activeRow = $('.music-playing');
	console.log(play);
	play.click(function(evt){
		var $li = $(evt).closest('li');
		var $searchContainer = $('.searchContainer');
		var $titleContainer = $('div .music-playing');
		var albumArt = $titleContainer.find('.art')[0].attr('src')
		var AAContainer = $('<img src="'+albumArt+'"></img>')
		$searchContainer.append(AAContainer);
	})
}




