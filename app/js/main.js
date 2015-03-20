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
    // getWiki(function(elem){
    //   var cssObj = createDomElement(nodeAppenderFunction(elem),cssMesh);
    // });

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createTestData(numOfKeys, numOfLinks){
  var obj = {};
  for(var i=0;i<numOfKeys;i++){
    var color = function(){if(i%2 !== 0){return [0,1,0]}else{return [0,0,1]}}
    var linkColor = function(){if(i%2 !== 0){return [255,0,220]}else{return [1,0,0]}}
    var nodeSize = function(){if(i%2 !== 0){return 5}else{return 1}}
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
      popup: popup()
    }
    for(var j=0;j<numOfLinks;j++){
      obj[i].links[j] = getRandomInt(0,numOfKeys-1);
    }
  }
  return obj;
}

var testData = createTestData(20,2);

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

  //target
  var rendererTarget,
  //objects
  hasAmbientLight = true,
  hasDirectionalLight = false,
  //variables
  nodeColorFunction = function(node){
    if(node){
      return node.nodeColor;
    }else{return false}
  }
  nodeSizeFunction = function(node){
    if(node){
      return node.nodeSize;
    }else{return false}
  }
  nodePopupFunction = function(node){
    if(node){
      return node.popup;
    }else{return false}
  }
  linkColorFunction = function(srcNode){
    if(srcNode){
      return srcNode.linkColor;
    }else{return false}
  }

  //size
  renderSizeWidth = window.innerWidth,
  renderSizeHeight = window.innerHeight,
  nodeSize = 2,
  nodeWidthSegments = 128,
  nodeHeightSegments = 128,
  maxBound = 5000,
  groupSize = 8,
  //density
  xDensity = 10,
  yDensity = 5,
  zDensity = 10,
  //color
  nodeColor = 0xffffff,
  zoomNodeColor = 0xff0000,
  linkColor = 0x00ff00,
  ambientLightColor = 0xffffff,
  directionalLightColor = 0xf0f000,
  //directional light pos
  directionalLightPosX = 1,
  directionalLightPosY = 1,
  directionalLightPosZ = 1,
  //mesh pos
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

function createNodeMesh(nodeSize,nodeWidthSegments,nodeHeightSegments,nodeColor,isWireframe,wireframeWidth){
  var geometry  = new THREE.SphereGeometry( nodeSize,nodeWidthSegments,nodeHeightSegments);
  var material  = new THREE.MeshBasicMaterial({ wireframe: isWireframe, wireframeLinewidth: wireframeWidth, color: nodeColor});
  material.color.setRGB(nodeColor[0],nodeColor[1],nodeColor[2]);
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function createNodes(data,cb){
  var iterator = 1;
  _.forEach(data,function(val,key){
    var nColor = function(){if(nodeColorFunction(val)){return nodeColorFunction(val)}else{return nodeColor}}
    var nSize = function(){if(nodeSizeFunction(val)){return nodeSizeFunction(val)}else{return nodeSize}}
    var mesh = createNodeMesh(nSize(),nodeWidthSegments,nodeHeightSegments,nColor(),true,1);
    val._nodeColor = [nColor()[0],nColor()[1],nColor()[2]];
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
  console.log(scene);
}

function findLinkedPos(data,id){
  var links = data[id].links;
  var linkPosArr = [];
  for(var i=0;i<links.length;i++){
    var linkPos = data[links[i]].mesh.position;
    linkPosArr.push(linkPos);
  }
  data[id].linkPositions = linkPosArr;
  for(var j=0;j<data[id].linkPositions.length;j++){
    createNodeLink(data[id],data[id].linkPositions[j]);
  }
}

function createNodeLink(id,pos2){
  var linkMaterial = new THREE.LineBasicMaterial();
  var linkColor = linkColorFunction(id);
  linkMaterial.color.setRGB(linkColor[0],linkColor[1],linkColor[2]);
  var pos1 = id.mesh.position;
  var linkGeometry = new THREE.Geometry();
    linkGeometry.vertices.push(new THREE.Vector3(pos1.x, pos1.y, pos1.z));
    linkGeometry.vertices.push(new THREE.Vector3(pos2.x, pos2.y, pos2.z));
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
    renderer.setSize( renderSizeWidth, renderSizeHeight );
    if(rendererTarget){
      document.getElementById(rendererTarget).appendChild(renderer.domElement)
    }else {document.body.appendChild(renderer.domElement)}

  //Scene//

    var scene = new THREE.Scene();

  //Lights//

    // add ambient lighting
    if(hasAmbientLight){
      var ambientLight = new THREE.AmbientLight(ambientLightColor);
      scene.add(ambientLight);
    }else{}

    // add directional lighting
    if(hasDirectionalLight){
      var directionalLight = new THREE.DirectionalLight(directionalLightColor);
      directionalLight.position.set(directionalLightPosX, directionalLightPosY, directionalLightPosZ).normalize();
      scene.add(directionalLight);
    }else{}

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

  var lastClickedNode;
  function dblClickNode( e ) {
    revertColor(lastClickedNode);
    raycaster.setFromCamera(mouse,camera);
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(nodes.children);
    var children = nodes.children;
    var objPos = intersects[0].point;
    lastClickedNode = intersects[0];
    console.log(intersects[0]);
    //zoom into object
    zoomIntoNode(intersects[0]);
    var cssPos = objPos.clone();
    //set cssMesh position
    cssPos.x += meshPosX;
    cssPos.y += meshPosY;
    cssPos.z += meshPosZ;
    //render css3D
    var cssMesh = createMesh(cssPos);
    var cssObj = createDomElement(nodePopupFunction(intersects[0].object.userData.nodeInfo),cssMesh);
    document.body.appendChild(cssRenderer.domElement);
    cssRenderer.render(cssScene,camera);
  }

  function revertColor(revertNode){
    nodes.traverse(function(node){
      if(node.material && revertNode && node === revertNode.object){
        var revertColor = node.userData.nodeInfo._nodeColor;
        node.material.color.setRGB(revertColor[0],revertColor[1],revertColor[2]);
      }else{}
    })
  }



