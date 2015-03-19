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

function createTestData(numOfKeys, numOfLinks){
  var obj = {};
  for(var i=0;i<numOfKeys;i++){
    obj[i] = {
      name: i,
      links: []
    }
    for(var j=0;j<numOfLinks;j++){
      obj[i].links[j] = getRandomInt(0,numOfKeys-1);
    }
  }
  return obj;
}

var testData = createTestData(20,4);


////////////////////////////////////////////////
///////////////// OPTIONS //////////////////////
////////////////////////////////////////////////

  function testAppender(elem){
    var element = document.createElement('div');
    element.innerHTML = elem;
    element.style.background = 'white';
    element.style.border = '2px solid black';
    element.className = element.className + ' infoBox';
    //element.src = 'http://i.imgur.com/2tQoKAI.jpg';
    return element;
  }

  var nodeSize = 2,
      maxBound = 5000,
      groupSize = 8,
      //max = 1000
      xDensity = 10,
      yDensity = 5,
      zDensity = 10,
      //mesh
      meshPosX = nodeSize+(nodeSize*1.5),
      meshPosY = -nodeSize/2,
      meshPosZ = -nodeSize;

////////////////////////////////////////////////
///////// PROCESS DATA AND OPTIONS /////////////
////////////////////////////////////////////////

function getRandomNodePos(mesh,xDens,yDens,zDens){
  mesh.position.x = ( Math.random() - 0.5 ) * 10 * xDens;
  mesh.position.y = ( Math.random() - 0.5 ) * 10 * yDens;
  mesh.position.z = ( Math.random() - 0.5 ) * 10 * zDens;
}

function getNodeUserDataOnClick(node){
  var nodeInfo = node.object.userData.nodeInfo || null;
  return nodeInfo;
}

function createNodes(data,cb){
  var iterator = 1;
  _.forEach(data,function(val,key){
    var geometry  = new THREE.SphereGeometry( nodeSize,128,128 );
    var material  = new THREE.MeshBasicMaterial({ wireframe: false, wireframeLinewidth: 1, color: 0xffffff})
    var mesh = new THREE.Mesh( geometry, material );
    getRandomNodePos(mesh,xDensity,yDensity,zDensity);
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    val.mesh = mesh;
    mesh.userData.nodeInfo = val;
    mesh.getUUID = function(){return this.uuid}
    nodes.add(mesh);
    if(iterator === _.keys(data).length){
      _.forEach(data,function(val,key){
        findLinkedPos(data,key);
      });
    }
    cb(mesh,key);
    iterator++;
  });
}

function findLinkedPos(data,id){
  var links = data[id].links;
  var linkPosArr = [];
  for(var i=0;i<links.length;i++){
    var linkPos = data[links[i]].mesh.position;
    linkPosArr.push(linkPos);
  }
  data[id].linkPositions = linkPosArr;
}

function createNodeLink(mesh1,mesh2){
  var linkMaterial = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });
  var linkGeometry = new THREE.Geometry();
    linkGeometry.vertices.push(new THREE.Vector3(mesh1.position.x, mesh1.position.y, mesh1.position.z));
    linkGeometry.vertices.push(new THREE.Vector3(mesh2.position.x, mesh2.position.y, mesh2.position.z));
  var linkLine = new THREE.Line(linkGeometry, linkMaterial);
  scene.add(linkLine);
}

////////////////////////////////////////////////
///////////////// RENDER ///////////////////////
////////////////////////////////////////////////

  //Check webgl support
  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  // Renderer //

    var renderer  = new THREE.WebGLRenderer({
      antialias       : true, // to get smoother output
      preserveDrawingBuffer   : true  // to allow screenshot
    });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

  //Scene//

    var scene = new THREE.Scene();

  //Lights//

    // add subtle blue ambient lighting
    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // directional lighting
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

  //Camera//

    var camera  = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100010);
    camera.position.z = 150;
    //Initialize Orbit Controls
    var controls = new THREE.OrbitControls( camera );
      controls.damping = 0.2;
      controls.addEventListener( 'change', render );

  //Action!//

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    TWEEN.update();
    render();
  }

  // Skybox

  function createSkyBox(){
    var skyGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
    var skyMaterial = new THREE.MeshBasicMaterial();
      skyMaterial.color.setRGB(0,50,230);
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
      skyBox.scale.x = -1;
    scene.add(skyBox);
  }

//////////////////////////////////////////
/////////// Slice Scene ///////////////
/////////////////////////////////////////

function findSingleBound(){
  var maxPix = maxBound*2;
  var maxVol = maxPix*maxPix*maxPix;
  var boxVol = maxVol/groupSize;
  var boxLength = Math.floor(Math.pow(boxVol,1/3));
  var boxRowNum = maxPix/boxLength;
  return [boxLength,boxRowNum];
}

//find equivalent in groups of squares
function findSquares(groupSize){
  var boxLength = findSingleBound()[0];
  var boxRowNum = findSingleBound()[1];
  var groupBounds = [];
  var lastBoundX = maxBound;
  for(var i=0;i<boxRowNum-1;i++){
    var arrX = [];
    var arrY = [];
    var arrZ = [];

    arrX.push([lastBoundX,lastBoundX-boxLength],
      [maxBound,maxBound-boxLength],
      [maxBound,maxBound-boxLength]);

    var lastBoundY = maxBound;

    lastBoundX = lastBoundX-boxLength;
    groupBounds.push(arrX,arrY,arrZ);
  }
}

findSquares(8);

//////////////////////////////////
///////// OBJs in Scene /////////
//////////////////////////////////

///////////////
/// Find Center of Slice
///////////////


  //Variables for node selection
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  //Declare and Add Node Group
  var nodes = new THREE.Object3D();
    scene.add(nodes)

  //Main initialize function
  function init() {

    createSkyBox();
    //loop through objects and add to node group,
      //cb sets the linkLines
    createNodes(testData,function(mesh,id){});

    //Trigger Event Listeners on window
      //Handles window responsiveness
      window.addEventListener( 'resize', onWindowResize, false );
      //Updates mouseX and mouseY coords
      window.addEventListener( 'mousemove', onMouseMove, false );
      //zoom into dbl clicked node and grab/append node info
      window.addEventListener( 'dblclick', dblClickNode, false );

    //Call animation loop on init
    animate();

  }

  //Pass THREEjs object and its position to zoom into it
  function zoomIntoNode(obj){
    var x = obj.point.x,
        y = obj.point.y,
        z = obj.point.z;
    controls.target.set(x,y,z);
    if(obj.distance >= 5){
      var scaler = obj.distance/5;
      controls.dollyIn(scaler);
    }else{}
    camera.updateProjectionMatrix();
    obj.object.material.color = new THREE.Color( 0xff0000 );
    render();
  }

  //Create Scene, Renderer, and Mesh for Appending to Scene on Dbl Click
  var cssScene = new THREE.Scene(),
      cssRenderer = new THREE.CSS3DRenderer();
      cssRenderer.setSize(window.innerWidth,window.innerHeight);
      cssRenderer.domElement.style.position = 'absolute';
      cssRenderer.domElement.style.top = 0;

  //create plane mesh
  var lastPlaneMeshName = [];
  function createMesh(pos){
    var lastObject = scene.getObjectByName ( 'planeMesh', true );
    if(lastPlaneMeshName[0]){scene.remove(lastObject)};
    var meshMat = new THREE.MeshBasicMaterial({wireframe:true});
    meshMat.color.set('black');
    meshMat.opacity = 0;
    meshMat.blending = THREE.NoBlending;
    var meshGeometry = new THREE.PlaneGeometry();
    var planeMesh = new THREE.Mesh(meshGeometry, meshMat);
      planeMesh.position.x = pos.x;
      planeMesh.position.y = pos.y;
      planeMesh.position.z = pos.z;
      planeMesh.name = 'planeMesh';
    scene.add(planeMesh);
    lastPlaneMeshName.push(planeMesh.name);
    return planeMesh;
  }

  //create dom element
  var lastCssObjectName = [];
  function createDomElement(elem,planeMesh){
    var lastObject = cssScene.getObjectByName ( 'cssObject', true );
    if(lastCssObjectName[0]){cssScene.remove(lastObject)};
    var container = document.createElement('div');
    container.appendChild(elem);
    var cssObject = new THREE.CSS3DObject(container);
    cssObject.position.set(planeMesh.position.x,planeMesh.position.y,planeMesh.position.z);
    cssObject.rotation = planeMesh.rotation;
    cssObject.name = 'cssObject';
    lastCssObjectName.push(cssObject.name);
    cssObject.scale.multiplyScalar(1/350);
    cssScene.add(cssObject);
    return cssObject;
  }

  //Render scene and camera
  function render(){
    renderer.render( scene, camera );
    cssRenderer.render(cssScene,camera);
  }

  //Initialize and Render the Page!
  init();
  render();

  //---------------------//
  //Click Event Listeners//
  //---------------------//

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

  }

  function onMouseMove( event ) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1

  }

  function dblClickNode( e ) {
    raycaster.setFromCamera(mouse,camera);
    nodes.traverse(function(node){
      if(node.material){
        node.material.color = new THREE.Color(0xffffff);
      }else{}
    })
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(nodes.children);
    var children = nodes.children;
    var objPos = intersects[0].point;
    //zoom into object
    zoomIntoNode(intersects[0]);
    var cssPos = objPos.clone();
    //set cssMesh position
    cssPos.x += meshPosX;
    cssPos.y += meshPosY;
    cssPos.z += meshPosZ;
    //render css3D
    var cssMesh = createMesh(cssPos);
    getWiki(function(elem){
      var cssObj = createDomElement(testAppender(elem),cssMesh);
    });
    document.body.appendChild(cssRenderer.domElement);
    cssRenderer.render(cssScene,camera);
  }



