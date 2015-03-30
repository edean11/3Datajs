
var popup = function(name){
      var elem = document.createElement('div');
      elem.className = 'navLink';
      elem.innerHTML = name;
      return elem;
    }

navLinks = {
	home: {
		name: 'home',
		href: '/#home',
		color: [1,0,0],
		position: [0,0,6],
		popup: popup('Home')
	},
	about: {
		name: 'about',
		href: '/#about',
		color: [0,1,0],
		position: [6,0,0],
		popup: popup('About')
	},
	contact: {
		name: 'contact',
		href: '/#contact',
		color: [0,0,1],
		position: [0,0,-6],
		popup: popup('Contact')
	},
	downloads: {
		name: 'downloads',
		href: '/#downloads',
		color: [200,50,0],
		position: [-6,0,0],
		popup: popup('Downloads')
	}
}

options = {
	positioningType: 'defined',
	positioningVariable: 'position',
	rendererTarget: '.navbarExample',
	renderSizeWidth: 500,
	renderSizeHeight: 150,
	autoAppendPopup: true,
	nodeColorFunction : function(node){
         return node.color;
    },
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

var scene = _3DATA.getNodeScene();

_3DATA.cssObj[1][0].rotation.y = 90;
_3DATA.cssObj[2][0].rotation.y = 90;
_3DATA.cssObj[3][0].rotation.y = 180;
