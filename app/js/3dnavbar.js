

var popup = function(name){
      var elem = document.createElement('div');
      elem.className = 'navLink';
      elem.innerHTML = '<a class="navbarLink" href="./#'+name+'">'+name+'</a>';
      return elem;
    }

navLinks = {
	home: {
		name: 'home',
		position: [0,0,6],
		popup: popup('Home')
	},
	about: {
		name: 'about',
		position: [6,0,0],
		popup: popup('About')
	},
	contact: {
		name: 'contact',
		position: [0,0,-6],
		popup: popup('Contact')
	},
	downloads: {
		name: 'downloads',
		position: [-6,0,0],
		popup: popup('Downloads')
	}
}

options = {
	positioningType: 'defined',
	positioningVariable: 'position',
	backgroundColor : [1,1,1],
	rendererTarget: '.navbarExample',
	popupRendererContainerClass : 'navbarContainer',
	renderSizeWidth: 500,
	renderSizeHeight: 150,
	autoAppendPopup: true,
    nodePopupFunction : function(node){
         return node.popup;
     },
    maxBound : 20,
    nodeSize: 0.5,
    meshPosX: -0.05,
    meshPosY: -0.6,
    meshPosZ: 0
}

_3DATA.create(navLinks,options);

var camera = _3DATA.getCamera()[1];
camera.autoRotate = true;
camera.noPan = true;
camera.noZoom = true;
camera.minPolarAngle = 1.6073009183012759;
camera.maxPolarAngle = 1.6073009183012759;

var scene = _3DATA.getNodeScene();

scene.children[0].visible = false;

_3DATA.cssObj[1][0].rotation.y = -55;
_3DATA.cssObj[2][0].rotation.y = -110;
_3DATA.cssObj[3][0].rotation.y = -165;
