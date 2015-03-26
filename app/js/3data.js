// Create Library Object

var _3DATA = {VERSION: '0.1'};

// Main Create Function

_3DATA.create = function(data,optionsObj,cb){

//Get Options
  //target
    var rendererTarget = optionsObj.rendererTarget || null,
    //objects
    hasAmbientLight = optionsObj.hasAmbientLight || false,
    hasDirectionalLight = optionsObj.hasDirectionalLight || false,
    hasDblClickZoom = optionsObj.hasDblClickZoom,
    showLinks = optionsObj.showLinks,
    autoAppendPopup = optionsObj.autoAppendPopup,
    allowZoomThrough = optionsObj.allowZoomThrough,
    zoomSpeed = optionsObj.zoomSpeed || 1,
    //grouping
    positioningType = optionsObj.positioningType || 'random', //random, automatic, defined group, or defined position
      //if automatic
      groupSize = optionsObj.groupSize || null,
      //if group
      groupingVariable = optionsObj.groupingVariable || null,
      groupingDensity = optionsObj.groupingDensity || 30,
      //if defined group
      positioningVariable = optionsObj.positioningVariable || [0,0,0],
    //general variables
    nodeColorFunction = optionsObj.nodeColorFunction || null,
    nodeSizeFunction = optionsObj.nodeSizeFunction || null,
    nodePopupFunction = optionsObj.nodePopupFunction || null,
    linkColorFunction = optionsObj.linkColorFunction || null,
    dblClickFunction = optionsObj.dblClickFunction || null,
    //size
    renderSizeWidth = optionsObj.renderSizeWidth || window.innerWidth,
    renderSizeHeight = optionsObj.renderSizeHeight || window.innerHeight,
    nodeSize = optionsObj.nodeSize || 1,
    //node resolution
    nodeWidthSegments = optionsObj.nodeWidthSegments || 32,
    nodeHeightSegments = optionsObj.nodeHeightSegments || 32,
    //bound
    maxBound = optionsObj.maxBound || 10000,
    //density
    xSpread = optionsObj.xSpread || 20,
    ySpread = optionsObj.ySpread || 20,
    zSpread = optionsObj.zSpread || 20,
    //background
    backgroundType = optionsObj.backgroundType || 'color', //image or color
    backgroundColor = optionsObj.backgroundColor || [0,0,0],
    backgroundImage = optionsObj.backgroundImage || null,
    //color
    nodeColor = optionsObj.nodeColor || [0,1,0],
    nodeHighlightColor = optionsObj.zoomNodeColor || [1,0,0],
    linkColor = optionsObj.linkColor || [0,0,1],
    ambientLightColor = optionsObj.ambientLightColor || 0xffffff,
    directionalLightColor = optionsObj.directionalLightColor || 0xffffff,
    //directional light pos
    directionalLightPosX = optionsObj.directionalLightPosX || 1,
    directionalLightPosY = optionsObj.directionalLightPosY || 1,
    directionalLightPosZ = optionsObj.directionalLightPosZ || 1,
    //mesh pos
    meshPosX = optionsObj.meshPosX || nodeSize+(nodeSize*1.5),
    meshPosY = optionsObj.meshPosY || -nodeSize/2,
    meshPosZ = optionsObj.meshPosZ || -nodeSize,
    wireframeMesh = optionsObj.wireframeMesh || false,
    wireframeWidth = optionsObj.wireframeWidth || 1;


  ////////////////////////////////////////////////
  ///////// PROCESS DATA AND OPTIONS /////////////
  ////////////////////////////////////////////////

  // Random Positioning Type

  function getRandomNodePos(mesh,xDens,yDens,zDens){
    mesh.position.x = (Math.random() - 0.5) * 10 * xDens;
    mesh.position.y = (Math.random() - 0.5) * 10 * yDens;
    mesh.position.z = (Math.random() - 0.5) * 10 * zDens;
  }

  // Automatic Positioning Type

  function sortUserData(data,positioningType){
    if(positioningType==='automatic'){
      var sortedNodes = _.sortBy(data, function(node) {
        node.linksLength = node.links.length;
        return -(node.links.length);
      });
      return sortedNodes;
    }
  }

  function chunkUserData(data,positioningType,groupSize){
    if(positioningType==='automatic'){
      return _.chunk(data,groupSize);
    }
  }

  var boundsArr = [];

  function findFullBound(mesh,groupNum,totalGroups){
    var posArr = []
    posArr.push(10*(xSpread*(groupNum/totalGroups)));
    posArr.push(10*(ySpread*(groupNum/totalGroups)));
    posArr.push(10*(zSpread*(groupNum/totalGroups)));
    return posArr;
  }

  function getRandomNodePosGroup(mesh,groupNum,totalGroups){
    var pos = findFullBound(mesh,groupNum,totalGroups);
    mesh.position.x = (Math.random() - 0.5)*pos[0];
    mesh.position.y = (Math.random() - 0.5)*pos[1];
    mesh.position.z = (Math.random() - 0.5)*pos[2];
  }

  function getNodeUserDataOnClick(node){
    var nodeInfo = node.object.userData.nodeInfo || null;
    return nodeInfo;
  }

  // Grouped Positioning Type

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function groupData(data){
    var grouped = _.groupBy(data, function(node) {
      var key = groupingVariable;
      return node[key];
    });

    return grouped;
  }

  function findGroupPos(groupedData){
    var totalGroups = _.keys(groupedData).length;
    var sceneLength = maxBound/groupingDensity;
    var sceneVolume = sceneLength*sceneLength*sceneLength;
    var groupVolume = sceneVolume/totalGroups;
    var groupSideLength = Math.pow(groupVolume,1/3);
    var lastGroupEndPos = [-sceneLength/2,sceneLength/2-groupSideLength,-sceneLength/2+groupSideLength];
    var positionObj = {};
    for(var i=1;i<totalGroups+1;i++){
      positionObj[i] = {x:{},y:{},z:{}};
      //if needs a new x and y coordinate
      if(lastGroupEndPos[0]+groupSideLength >= sceneLength/2 && lastGroupEndPos[1]-groupSideLength <= -(sceneLength/2)){
        positionObj[i].x.start = -(sceneLength/2);
        positionObj[i].x.end = -(sceneLength/2)+groupSideLength;
        positionObj[i].y.start = sceneLength/2;
        positionObj[i].y.end = (sceneLength/2)-groupSideLength;
        positionObj[i].z.start = lastGroupEndPos[2];
        positionObj[i].z.end = lastGroupEndPos[2]+groupSideLength;
        lastGroupEndPos = [];
        lastGroupEndPos.push(positionObj[i].x.end,positionObj[i].y.end,positionObj[i].z.end)
      //if needs a new y coordinate
      } else if(lastGroupEndPos[0]+groupSideLength >= sceneLength/2 && lastGroupEndPos[1]-groupSideLength>= -(sceneLength/2)){
        positionObj[i].x.start = -(sceneLength/2);
        positionObj[i].x.end = -(sceneLength/2)+groupSideLength;
        positionObj[i].y.start = lastGroupEndPos[1]+groupSideLength;
        positionObj[i].y.end = lastGroupEndPos[1];
        positionObj[i].z.start = lastGroupEndPos[2]-groupSideLength;
        positionObj[i].z.end = lastGroupEndPos[2];
        lastGroupEndPos = [];
        lastGroupEndPos.push(positionObj[i].x.end,positionObj[i].y.end,positionObj[i].z.end)
      //if does not need any new coordinates
      } else{
        positionObj[i].x.start = lastGroupEndPos[0];
        positionObj[i].x.end = lastGroupEndPos[0]+groupSideLength;
        positionObj[i].y.start = lastGroupEndPos[1]+groupSideLength;
        positionObj[i].y.end = lastGroupEndPos[1];
        positionObj[i].z.start = lastGroupEndPos[2]-groupSideLength;
        positionObj[i].z.end = lastGroupEndPos[2];
        lastGroupEndPos = [];
        lastGroupEndPos.push(positionObj[i].x.end,positionObj[i].y.end,positionObj[i].z.end)
      }
    }
    return positionObj;
  }

  function placeGroupPos(mesh,groupPosObj,groupNumber){
    mesh.position.x = getRandomInt(groupPosObj[groupNumber].x.start,groupPosObj[groupNumber].x.end);
    mesh.position.y = getRandomInt(groupPosObj[groupNumber].y.start,groupPosObj[groupNumber].y.end);
    mesh.position.z = getRandomInt(groupPosObj[groupNumber].z.start,groupPosObj[groupNumber].z.end);
  }

  // Create Node Objects

  function createNodeMesh(nodeSize,nodeWidthSegments,nodeHeightSegments,nodeColor,isWireframe,wireframeWidth){
    var geometry  = new THREE.SphereGeometry( nodeSize,nodeWidthSegments,nodeHeightSegments);
    var material  = new THREE.MeshBasicMaterial({ wireframe: isWireframe, wireframeLinewidth: wireframeWidth});
    if(nodeColor[1] === 'x'){material.color.setHex(nodeColor)}else{material.color.setRGB(nodeColor[0],nodeColor[1],nodeColor[2])};
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  function createNodeFunction(val,key){
    var nColor = function(){if(nodeColorFunction && nodeColorFunction(val)){return nodeColorFunction(val)}else{return nodeColor}}
    var nSize = function(){if(nodeSizeFunction && nodeSizeFunction(val)){return nodeSizeFunction(val)}else{return nodeSize}}
    var mesh = createNodeMesh(nSize(),nodeWidthSegments,nodeHeightSegments,nColor(),wireframeMesh,wireframeWidth);
    val._nodeColor = [nColor()[0],nColor()[1],nColor()[2]];
    val.mesh = mesh;
    mesh.userData.nodeInfo = val;
    mesh.getUUID = function(){return this.uuid}
    return mesh;
  }

  function createNodes(data,cb){
    var iterator = 1;
    var groupIterator = 1;
    if(positioningType === 'random'){
      _.forEach(data,function(val,key){
        var mesh = createNodeFunction(val,key);
        getRandomNodePos(mesh,xSpread,ySpread,zSpread);
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        if(iterator === _.keys(data).length && showLinks){
          _.forEach(data,function(val,key){
            findLinkedPos(data,key);
          });
        }
        nodes.add(mesh);
        if(autoAppendPopup){
          appendPopup(mesh,false)
        }
        cb(mesh,key);
        iterator++;
      });
    } else if(positioningType === 'automatic') {
      var chunkedData = chunkUserData(sortUserData(data,positioningType),positioningType,groupSize);
      _.forEach(chunkedData,function(chunk,chunkKey){
        _.forEach(chunk,function(node,key){
          var mesh = createNodeFunction(node,key);
          getRandomNodePosGroup(mesh,groupIterator,chunkedData.length);
          mesh.updateMatrix();
          mesh.matrixAutoUpdate = false;
          nodes.add(mesh);
          cb(mesh,key);
          if(autoAppendPopup){
            appendPopup(mesh,false);
          }
        });
        if(groupIterator === chunkedData.length && showLinks){
          _.forEach(data,function(val,key){
            findLinkedPos(data,key);
          });
        }
        groupIterator++;
      });
    } else if(positioningType === 'grouped'){
      var groupedData = groupData(testData);
      var groupedDataPos = findGroupPos(groupedData)
      _.forEach(groupedData,function(group,groupNumber){
        _.forEach(group,function(node,nodeKey){
          var mesh = createNodeFunction(node,nodeKey);
          placeGroupPos(mesh,groupedDataPos,groupNumber)
          mesh.updateMatrix();
          mesh.matrixAutoUpdate = false;
          nodes.add(mesh);
          cb(mesh,nodeKey);
          if(autoAppendPopup){
            appendPopup(mesh,false);
          }
        });
        if(groupIterator === _.keys(groupedData).length && showLinks){
          _.forEach(data,function(val,key){
            findLinkedPos(data,key);
          });
        }
        groupIterator++;
      });
    } else if(positioningType == 'defined'){
      _.forEach(data,function(val,key){
        var mesh = createNodeFunction(val,key);
        var posVariable = positioningVariable;
        mesh.position.x = val[posVariable][0];
        mesh.position.y = val[posVariable][1];
        mesh.position.z = val[posVariable][2];
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        if(iterator === _.keys(data).length && showLinks){
          _.forEach(data,function(val,key){
            findLinkedPos(data,key);
          });
        }
        nodes.add(mesh);
        if(autoAppendPopup){
          appendPopup(mesh,false);
        }
        cb(mesh,key);
        iterator++;
      });
    } else{console.log('You must define a positioning type')}
  }

  function findLinkedPos(data,id){
    var links = data[id].links;
    var linkPosArr = [];
    var linkedMesh = [];
    for(var i=0;i<links.length;i++){
      var linkPos = data[links[i]].mesh.position;
      linkedMesh.push(data[links[i]].mesh)
      linkPosArr.push(linkPos);
    }
    data[id].linkPositions = linkPosArr;
    for(var j=0;j<data[id].linkPositions.length;j++){
      createNodeLink(data[id],data[id].linkPositions[j],linkedMesh[j]);
    }
  }

  function createNodeLink(id,pos2,mesh2){
    var linkMaterial = new THREE.LineBasicMaterial();
    var linkColor = linkColorFunction(id) || linkColor;
    if(linkColor[1]==='x'){linkMaterial.color.setHex(linkColor)}
      else{linkMaterial.color.setRGB(linkColor[0],linkColor[1],linkColor[2])}
    var pos1 = id.mesh.position;
    var linkGeometry = new THREE.Geometry();
      linkGeometry.vertices.push(new THREE.Vector3(pos1.x, pos1.y, pos1.z));
      linkGeometry.vertices.push(new THREE.Vector3(pos2.x, pos2.y, pos2.z));
    var linkLine = new THREE.Line(linkGeometry, linkMaterial);
    linkLine.sourceNode = id.mesh;
    linkLine.destNode = mesh2;
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
      document.querySelector(rendererTarget).appendChild(renderer.domElement)
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

    var camera  = new THREE.PerspectiveCamera(45, renderSizeWidth / renderSizeHeight, 0.01, maxBound+100);
    camera.position.z = 150;
    //Initialize Orbit Controls
    var controls = new THREE.OrbitControls(camera);
    controls.maxDistance = maxBound-10;
      controls.zoomSpeed = zoomSpeed;
      controls.addEventListener('change', render);

  //Action!//

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
  }

  // Skybox

  function createSkyBox(){
    var skyGeometry = new THREE.BoxGeometry(maxBound,maxBound,maxBound);
    if(backgroundType==='image'){
      var texture = THREE.ImageUtils.loadTexture(backgroundImage,{},function(){
      var skyMaterial = new THREE.MeshBasicMaterial({map:texture});
      var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
        skyBox.scale.x = -1;
        scene.add(skyBox);
      });
    }else{
      var skyMaterial = new THREE.MeshBasicMaterial();
      if(skyMaterial[1] === 'x'){skyMaterial.color.setHex(backgroundColor)}
        else{skyMaterial.color.setRGB(backgroundColor[0],backgroundColor[1],backgroundColor[2])}
      var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
        skyBox.scale.x = -1;
        scene.add(skyBox);
    }
  }

//////////////////////////////////
///////// OBJs in Scene /////////
//////////////////////////////////

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
      //cb can access each node
      createNodes(data,function(mesh,id){});

    //Trigger Event Listeners
      window.addEventListener( 'resize', onWindowResize, false );
      //Updates mouseX and mouseY coords
      window.addEventListener( 'mousemove', onMouseMove, false );
      //zoom into dbl clicked node and grab/append node info
      if(hasDblClickZoom){
        window.addEventListener( 'dblclick', dblClickNode, false );
      }

    //Call animation loop on init
    animate();

  }

  //Pass THREEjs object to zoom into it
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
    //obj.object.material.color = new THREE.Color( 0xff0000 );
    if(nodeHighlightColor[1] === 'x'){obj.object.material.color.setHex(nodeHighlightColor)}
      else{obj.object.material.color.setRGB(nodeHighlightColor[0],nodeHighlightColor[1],nodeHighlightColor[2])}
    render();
  }

  //Create Scene, Renderer, and Mesh for Appending to Scene on Dbl Click
  var cssScene = new THREE.Scene(),
      cssRenderer = new THREE.CSS3DRenderer();
      cssRenderer.setSize(renderSizeWidth,renderSizeHeight);
      cssRenderer.domElement.style.position = 'absolute';
      cssRenderer.domElement.style.top = 0;

  //create plane mesh
  var lastPlaneMeshName = [];
  function createMesh(pos,remove){
    if(remove){
      var lastObject = scene.getObjectByName ( 'planeMesh', true );
      if(lastPlaneMeshName[0]){scene.remove(lastObject)};
    }
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
  function createDomElement(elem,planeMesh,remove){
    if(remove){
      var lastObject = cssScene.getObjectByName ( 'cssObject', true );
      if(lastCssObjectName[0]){cssScene.remove(lastObject)};
    }
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

  function appendPopup(node,remove){
    //set cssMesh position
    var cssPos = node.position;
    cssPos.x += meshPosX;
    cssPos.y += meshPosY;
    cssPos.z += meshPosZ;
    //render css3D
    var cssMesh = createMesh(cssPos,remove);
    var cssObj = createDomElement(nodePopupFunction(node.userData.nodeInfo),cssMesh,remove);
    document.body.appendChild(cssRenderer.domElement);
    cssRenderer.render(cssScene,camera);
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
    camera.aspect = renderSizeWidth/renderSizeHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(renderSizeWidth,renderSizeHeight);
    render();
  }

  function onMouseMove(e) {
    if(rendererTarget){
      var offset = $(rendererTarget).offset();
      mouse.x = ((e.clientX-offset.left)/renderSizeWidth) * 2 - 1;
      mouse.y = - ((e.clientY-offset.top)/renderSizeHeight) * 2 + 1;
    }else{
      mouse.x = (e.clientX/window.innerWidth) * 2 - 1;
      mouse.y = - (e.clientY/window.innerHeight) * 2 + 1;
    }
  }

  var lastClickedNode;
  function dblClickNode(e) {
    raycaster.setFromCamera(mouse,camera);
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(nodes.children);
    var children = nodes.children;
    var objPos = intersects[0].object.position;
    revertColor(lastClickedNode);
    lastClickedNode = intersects[0];
    //zoom into object
    zoomIntoNode(intersects[0]);
    //append popup
    appendPopup(intersects[0].object,true);
    if(dblClickFunction){dblClickFunction(intersects[0].object)}else{};
  }

  function revertColor(revertNode){
    nodes.traverse(function(node){
      if(node.material && revertNode && node === revertNode.object){
        var revertColor = node.userData.nodeInfo._nodeColor;
        if(revertColor[1]==='x'){node.material.color.setHex(revertColor)}
          else{node.material.color.setRGB(revertColor[0],revertColor[1],revertColor[2])}
      }
    })
  }

  ////////////////////////////////////////////////
  ///////////// USER FACING FUNCTIONS ////////////
  ////////////////////////////////////////////////

  _3DATA.search = function(searchKey,searchValue){
    var foundNodes = [];
    _.forEach(scene.children[1].children,function(val,key){
      var nodeInfo = val.userData.nodeInfo;
      var nodeSearchKey = nodeInfo[searchKey];
      if(nodeSearchKey === searchValue){
        val.material.color.setRGB(nodeHighlightColor[0],nodeHighlightColor[1],nodeHighlightColor[2]);
        foundNodes.push(val);
      }
    });
    return foundNodes;
  }

  _3DATA.zoomNode = function(zoomObjMesh,zoomOut,showNodeInfo){
    var distance = camera.position.distanceToSquared(zoomObjMesh.position);
    controls.target.set(zoomObjMesh.position.x,zoomObjMesh.position.y,zoomObjMesh.position.z);
    controls.dollyIn(distance-zoomOut);
    camera.updateProjectionMatrix();
    zoomObjMesh.material.color = new THREE.Color( 0xff0000 );
    if(showNodeInfo){
      var cssPos = zoomObjMesh.position;
      //set cssMesh position
      cssPos.x += meshPosX;
      cssPos.y += meshPosY;
      cssPos.z += meshPosZ;
      //render css3D
      var cssMesh = createMesh(cssPos);
      var cssObj = createDomElement(nodePopupFunction(zoomObjMesh.userData.nodeInfo),cssMesh);
      document.body.appendChild(cssRenderer.domElement);
    }
    render();
    return zoomObjMesh;
  }

  _3DATA.zoomPosition = function(position,zoomOut){
    var distance = camera.position.distanceToSquared(position);
    controls.target.set(position[0],position[1],position[2]);
    controls.dollyIn(distance-zoomOut);
    camera.updateProjectionMatrix();
    render();
  }

  _3DATA.getCamera = function(){
    return [camera,controls];
  }

  _3DATA.getNodeScene = function(){
    return scene;
  }

  _3DATA.getNodeRenderer = function(){
    return renderer;
  }

  _3DATA.getPopupScene = function(){
    return cssScene;
  }

  _3DATA.getPopupRenderer = function(){
    return cssRenderer;
  }

  _3DATA.render = function(){
    renderer.render(scene,camera);
    cssRenderer.render(cssScene,camera);
  }

  _3DATA.remove = function(objectName){
    var deleteObject = scene.getObjectByName(objectName);
    scene.remove(deleteObject);
    render();
  }

  _3DATA.revertColor = function(revertNode){
    nodes.traverse(function(node){
      if(node.material && revertNode && node === revertNode){
        var revertColor = node.userData.nodeInfo._nodeColor;
        if(revertColor[1]==='x'){node.material.color.setHex(revertColor)}
          else{node.material.color.setRGB(revertColor[0],revertColor[1],revertColor[2])}
      }
    })
  }
  if(cb){cb()}
  return {node: {scene: scene,renderer: renderer},popup: {scene: cssScene,renderer: cssRenderer}}
} // End Create function

window._3DATA = _3DATA;


