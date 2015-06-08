

var popup = function(name){
      var elem = document.createElement('div');
      elem.className = 'navLink';
      elem.innerHTML = '<a class="navbarLink" href="./#'+name+'">'+name+'</a>';
      return elem;
    }

navLinks = {
	home: {
		name: 'home',
		popup: popup('Home')
	},
	about: {
		name: 'about',
		popup: popup('About')
	},
	contact: {
		name: 'contact',
		popup: popup('Contact')
	},
	downloads: {
		name: 'downloads',
		popup: popup('Downloads')
	}
}

options = {
    positioningType: 'carousel',
    carouselSize : 6,
    carouselOrientation : 'horizontal',
	backgroundColor : [1,1,1],
	rendererTarget: '.navbarExample',
	popupRendererContainerClass : 'navbarContainer',
	renderSizeWidth: 500,
	renderSizeHeight: 150,
	autoAppendPopup: true,
    nodePopupFunction : function(node){
         return node.popup;
     },
    maxBound : 55,
    nodeSize: 0.5
}

_3DATA.create(navLinks,options);

var orbit = _3DATA.getCamera()[1];
orbit.autoRotate = true;
orbit.noPan = true;
orbit.noZoom = true;
orbit.minPolarAngle = 1.6073009183012759;
orbit.maxPolarAngle = 1.6073009183012759;

var scene = _3DATA.getNodeScene();

scene.children[0].visible = false;
