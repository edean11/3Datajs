// Create Library Object

var _3DATA = {VERSION: '0.1'};

// Main Create Function

_3DATA.create = function(data,optionsObj,cb){

  ///////////////////////////////////
  ///////// GET OPTIONS /////////////
  ///////////////////////////////////

    //target
    var rendererTarget = optionsObj.rendererTarget,
    //object booleans
    hasAmbientLight = optionsObj.hasAmbientLight,
    hasDirectionalLight = optionsObj.hasDirectionalLight,
    autoRotate = optionsObj.autoRotate || false,
    hasDblClickZoom = optionsObj.hasDblClickZoom,
    zoomAutoRotate = optionsObj.zoomAutoRotate || false,
    dblClickAppendPopup = optionsObj.dblClickAppendPopup || true,
    showLinks = optionsObj.showLinks,
    autoAppendPopup = optionsObj.autoAppendPopup,
    respondToWindowResizing = optionsObj.respondToWindowResizing || false,
    // class assignment
    popupRendererContainerClass = optionsObj.popupRendererContainerClass || 'popupRendererContainer',
    // camera controls
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
      //if carousel
      carouselSize = optionsObj.carouselSize || 1,//radius
      carouselOrientation = optionsObj.carouselOrientation || 'horizontal',//or vertical
      carouselAutoRotateMesh = optionsObj.carouselAutoRotateMesh || true,
      carouselCameraLock = optionsObj.carouselCameraLock || true,
    //general variables
    nodeColorFunction = optionsObj.nodeColorFunction || null,
    //formatting of nodeSize depends on geometryType
      //requires one value for sphere, array of three values for Box
    nodeSizeFunction = optionsObj.nodeSizeFunction || null,
    nodePopupFunction = optionsObj.nodePopupFunction || null,
    linkColorFunction = optionsObj.linkColorFunction || null,
    dblClickFunction = optionsObj.dblClickFunction || null,
    customGeometryFunction = optionsObj.customGeometryFunction,
    //geometry
    geometryTypeFunction = optionsObj.geometryTypeFunction || null,
    defaultGeometryType = optionsObj.defaultGeometryType || 'Sphere'
    //render size
    renderSizeWidth = optionsObj.renderSizeWidth || window.innerWidth,
    renderSizeHeight = optionsObj.renderSizeHeight || window.innerHeight,
    //node size(format depends on geometryType)
    nodeSize = optionsObj.nodeSize || 1, //pass in an array of three values if geometryType = Box
    //node resolution
    nodeWidthSegments = optionsObj.nodeWidthSegments || 32,
    nodeHeightSegments = optionsObj.nodeHeightSegments || 32,
    nodeDepthSegments = optionsObj.nodeHeightSegments || 32, //only used in box geometry
    //node rotation
    nodeRotationVar = optionsObj.nodeRotationVar || null,
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
    backgroundRotationX = optionsObj.backgroundRotationX || 0,
    backgroundRotationY = optionsObj.backgroundRotationY || 0,
    backgroundRotationZ = optionsObj.backgroundRotationZ || 0,
    //color defaults
    nodeColor = optionsObj.nodeColor || [0,1,0],
    nodeHighlightColor = optionsObj.nodeHighlightColor || null,
    linkColor = optionsObj.linkColor || [0,0,1],
    ambientLightColor = optionsObj.ambientLightColor || 0xffffff,
    directionalLightColor = optionsObj.directionalLightColor || 0xffffff,
    //directional light pos
    directionalLightPosX = optionsObj.directionalLightPosX || 1,
    directionalLightPosY = optionsObj.directionalLightPosY || 1,
    directionalLightPosZ = optionsObj.directionalLightPosZ || 1,
    //mesh
    materialType = optionsObj.materialType || 'Basic',
    meshPosX = optionsObj.meshPosX || 0,
    meshPosY = optionsObj.meshPosY || 0,
    meshPosZ = optionsObj.meshPosZ || 0,
    wireframeMesh = optionsObj.wireframeMesh || false,
    wireframeWidth = optionsObj.wireframeWidth || 1;


  ////////////////////////////////////////////////
  ///////// PROCESS DATA AND OPTIONS /////////////
  ////////////////////////////////////////////////

  // Random Positioning Type /////////////////////

    function getRandomNodePos(mesh,xDens,yDens,zDens){
      mesh.position.x = (Math.random() - 0.5) * 10 * xDens;
      mesh.position.y = (Math.random() - 0.5) * 10 * yDens;
      mesh.position.z = (Math.random() - 0.5) * 10 * zDens;
    }

  ////////////////////////////////////////////////

  // Automatic Positioning Type //////////////////

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
    //find outer bounds for automatic positioning
    function findFullBound(mesh,groupNum,totalGroups){
      var posArr = []
      posArr.push(10*(xSpread*(groupNum/totalGroups)));
      posArr.push(10*(ySpread*(groupNum/totalGroups)));
      posArr.push(10*(zSpread*(groupNum/totalGroups)));
      return posArr;
    }

    //get automatic pos
    function getRandomNodePosGroup(mesh,groupNum,totalGroups){
      var pos = findFullBound(mesh,groupNum,totalGroups);
      mesh.position.x = (Math.random() - 0.5)*pos[0];
      mesh.position.y = (Math.random() - 0.5)*pos[1];
      mesh.position.z = (Math.random() - 0.5)*pos[2];
    }

  ////////////////////////////////////////////////

  // Grouped Positioning Type ////////////////////

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

    //using the maxBound and groupingDensity provided, find the bounds for each group
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

  ////////////////////////////////////////////////

  ///// Carousel Positioning Type ////////////////

  function getCarouselPos(mesh,objNum,totalObjs){
    var alpha = Math.PI*2/totalObjs
    if(objNum === '0'){
      mesh.position.x = 0;
      mesh.position.y = 0;
      mesh.position.z = Math.cos(0)*carouselSize;
    }else if(carouselOrientation == 'vertical'){
      mesh.position.x = 0;
      mesh.position.y = Math.sin(alpha*objNum)*carouselSize;
      mesh.position.z = Math.cos(alpha*objNum)*carouselSize;
      if(carouselAutoRotateMesh){
        mesh.rotation.x = alpha*objNum*-1;
      }
    }else if(carouselOrientation == 'horizontal'){
      mesh.position.x = Math.sin(alpha*objNum)*carouselSize;
      mesh.position.y = 0;
      mesh.position.z = Math.cos(alpha*objNum)*carouselSize;
      if(carouselAutoRotateMesh){
        mesh.rotation.y = alpha*objNum;
      }
    }
    return mesh;
  }

  ////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
///////////////// CREATE NODE OBJECTS ///////////////////////
/////////////////////////////////////////////////////////////

    function createGeometryType(geometryName,nSize){
      if(geometryName === 'Sphere'){
          var geom = new THREE.SphereGeometry( nSize,nodeWidthSegments,nodeHeightSegments);
          return geom;
        }
        else if(geometryName === 'Box'){
          var geom = new THREE.BoxGeometry(nSize[0], nSize[1], nSize[2], nodeWidthSegments, nodeHeightSegments, nodeDepthSegments)
          return geom;
        } else if(geometryName === 'Custom'){
          var geom = customGeometryFunction();
          return geom;
      }
    }

    function createNodeMesh(val,nodeSize,nodeColor,isWireframe,wireframeWidth){
      var computedGeom = function(){
        if(geometryTypeFunction){
          return geometryTypeFunction(val);
        }else {return defaultGeometryType}
      }
      var geometry  = createGeometryType(computedGeom(),nodeSize);
      var material  = function(){
        if(materialType === 'Basic'){
          var mat = new THREE.MeshBasicMaterial({ wireframe: isWireframe, wireframeLinewidth: wireframeWidth});
          if(nodeColor[1] === 'x'){mat.color = new THREE.Color().setHex(nodeColor)}else{mat.color = new THREE.Color(nodeColor[0],nodeColor[1],nodeColor[2])};
          return mat
        } else if(materialType === 'Lambert'){
          var mat = new THREE.MeshLambertMaterial({ wireframe: isWireframe, wireframeLinewidth: wireframeWidth});
          if(nodeColor[1] === 'x'){mat.color = new THREE.Color().setHex(nodeColor)}else{mat.color = new THREE.Color(nodeColor[0],nodeColor[1],nodeColor[2])};
          return mat
        } else if(materialType === 'Phong'){
          var mat = new THREE.MeshPhongMaterial({ wireframe: isWireframe, wireframeLinewidth: wireframeWidth});
          if(nodeColor[1] === 'x'){mat.color = new THREE.Color().setHex(nodeColor)}else{mat.color = new THREE.Color(nodeColor[0],nodeColor[1],nodeColor[2])};
          return mat
        } else {console.log('invalid material type')}
      }
      var mesh = new THREE.Mesh(geometry, material());
      return mesh;
    }

    function createNodeFunction(val,key){
      var nColor = function(){if(nodeColorFunction && nodeColorFunction(val)){return nodeColorFunction(val)}else{return nodeColor}}
      var nSize = function(){if(nodeSizeFunction && nodeSizeFunction(val)){return nodeSizeFunction(val)}else{return nodeSize}}
      var mesh = createNodeMesh(val,nSize(),nColor(),wireframeMesh,wireframeWidth);
      val._nodeColor = [nColor()[0],nColor()[1],nColor()[2]];
      val.mesh = mesh;
      mesh.userData.nodeInfo = val;
      mesh.getUUID = function(){return this.uuid}
      return mesh;
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
      var linkColor = function(){if(typeof linkColorFunction === 'function'){return linkColorFunction(id)}else{return linkColor}}
      if(linkColor()[1]==='x'){linkMaterial.color.setHex(linkColor())}
        else{linkMaterial.color.setRGB(linkColor()[0],linkColor()[1],linkColor()[2])}
      var pos1 = id.mesh.position;
      var linkGeometry = new THREE.Geometry();
        linkGeometry.vertices.push(new THREE.Vector3(pos1.x, pos1.y, pos1.z));
        linkGeometry.vertices.push(new THREE.Vector3(pos2.x, pos2.y, pos2.z));
      var linkLine = new THREE.Line(linkGeometry, linkMaterial);
      linkLine.sourceNode = id.mesh;
      linkLine.destNode = mesh2;
      scene.add(linkLine);
    }

    function appendLinks(iterator,length,data){
      if(iterator === length && showLinks){
        _.forEach(data,function(val,key){
          findLinkedPos(data,key);
        });
      }
    }

    function determineAppendPopup(mesh){
      if(autoAppendPopup){
        appendPopup(mesh,false)
      }
    }

    function rotateMesh(mesh,val){
      if(nodeRotationVar && val[nodeRotationVar]){
        mesh.rotation.x = val[nodeRotationVar][0];
        mesh.rotation.y = val[nodeRotationVar][1];
        mesh.rotation.z = val[nodeRotationVar][2];
      }
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
          rotateMesh(mesh,val);
          appendLinks(iterator,_.keys(data).length,data)
          nodes.add(mesh);
          determineAppendPopup(mesh)
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
            rotateMesh(mesh,node)
            nodes.add(mesh);
            cb(mesh,key);
            determineAppendPopup(mesh);
          });
          appendLinks(groupIterator, chunkedData.length, data)
          groupIterator++;
        });
      } else if(positioningType === 'grouped'){
        var groupedData = groupData(data);
        var groupedDataPos = findGroupPos(groupedData)
        _.forEach(groupedData,function(group,groupNumber){
          _.forEach(group,function(node,nodeKey){
            var mesh = createNodeFunction(node,nodeKey);
            placeGroupPos(mesh,groupedDataPos,groupNumber)
            mesh.updateMatrix();
            mesh.matrixAutoUpdate = false;
            rotateMesh(mesh,node);
            nodes.add(mesh);
            cb(mesh,nodeKey);
            determineAppendPopup(mesh);
          });
          appendLinks(groupIterator,_.keys(groupedData).length,data);
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
          rotateMesh(mesh,val);
          appendLinks(iterator,_.keys(data).length,data);
          nodes.add(mesh);
          determineAppendPopup(mesh);
          cb(mesh,key);
          iterator++;
        });
      } else if(positioningType == 'carousel'){
        var index = 0
        for(var key in data){
          var val = data[key]
          var mesh = createNodeFunction(val,key);
          var positionedMesh = getCarouselPos(mesh,index,Object.keys(data).length);
          rotateMesh(mesh,val);
          nodes.add(positionedMesh);
          appendLinks(iterator,_.keys(data).length,data);
          determineAppendPopup(mesh);
          index++;
        };
      } else{console.log('You must define a positioning type')}
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

    var camera  = new THREE.PerspectiveCamera(45, renderSizeWidth / renderSizeHeight, 0.01, maxBound+200);
    camera.position.z = maxBound/5;
    //Initialize Orbit Controls
    var controls = new THREE.OrbitControls(camera);
    controls.maxDistance = (maxBound/5);
      controls.zoomSpeed = zoomSpeed;
      controls.addEventListener('change', render);
      if(autoRotate){
        controls.autoRotate = true;
      }
      if(positioningType === 'carousel' && carouselCameraLock && carouselOrientation === 'horizontal'){
        controls.noPan = true;
        controls.noZoom = true;
        controls.minPolarAngle = 1.6073009183012759;
        controls.maxPolarAngle = 1.6073009183012759;
      }

  //Action!//

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      render();
    }

  // Skybox

    function addSkyBox(skyBox){
      skyBox.name = 'skyBox';
      skyBox.scale.x = -1;
      skyBox.rotation.x = backgroundRotationX;
      skyBox.rotation.y = backgroundRotationY;
      skyBox.rotation.z = backgroundRotationZ;
      scene.add(skyBox);
    }

    function setSkyMatColor(skyMat,bgColor){
      if(bgColor[1] === 'x'){
        skyMat.color.setHex(bgColor)
      }else{
        skyMat.color.setRGB(bgColor[0],bgColor[1],bgColor[2])
      }
    }

    function createSkyBox(){
      var skyGeometry = new THREE.BoxGeometry(maxBound,maxBound,maxBound);
      if(backgroundType==='image'){
        THREE.ImageUtils.crossOrigin = '';
        if(typeof(backgroundImage)==='object'){
          var material1 = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(backgroundImage[0]) } );
          var material2 = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(backgroundImage[1]) } );
          var material3 = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(backgroundImage[2]) } );
          var material4 = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(backgroundImage[3]) } );
          var material5 = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(backgroundImage[4]) } );
          var material6 = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(backgroundImage[5]) } );
          var materials = [material1, material2, material3, material4, material5, material6];
          var skyFaceMaterial = new THREE.MeshFaceMaterial( materials );
          var skyBox = new THREE.Mesh(skyGeometry, skyFaceMaterial);
          addSkyBox(skyBox);
        }else{
          var skyMaterial = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture(backgroundImage)});
          var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
          addSkyBox(skyBox);
        }
      }else{
        if(typeof(backgroundColor)==='object' && backgroundColor.length > 3){
          var material1 = new THREE.MeshBasicMaterial();
            setSkyMatColor(material1,backgroundColor[0])
          var material2 = new THREE.MeshBasicMaterial();
            setSkyMatColor(material2,backgroundColor[1])
          var material3 = new THREE.MeshBasicMaterial();
            setSkyMatColor(material3,backgroundColor[2])
          var material4 = new THREE.MeshBasicMaterial();
            setSkyMatColor(material4,backgroundColor[3])
          var material5 = new THREE.MeshBasicMaterial();
            setSkyMatColor(material5,backgroundColor[4])
          var material6 = new THREE.MeshBasicMaterial();
            setSkyMatColor(material6,backgroundColor[5])
          var materials = [material1, material2, material3, material4, material5, material6];
          var skyFaceMaterial = new THREE.MeshFaceMaterial( materials );
          var skyBox = new THREE.Mesh(skyGeometry, skyFaceMaterial);
          addSkyBox(skyBox);
        }else{
          var skyMaterial = new THREE.MeshBasicMaterial();
          setSkyMatColor(skyMaterial,backgroundColor);
          var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
          addSkyBox(skyBox);
        }
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
    createNodes(data,function(mesh,id){});

    //Trigger Event Listeners
      window.addEventListener( 'resize', onWindowResize, false );
      //Updates mouseX and mouseY coords
      window.addEventListener( 'mousemove', onMouseMove, false );
      //zoom into dbl clicked node and grab/append node info
      window.addEventListener( 'dblclick', dblClickNode, false );

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
    if(nodeHighlightColor&&nodeHighlightColor[1] === 'x'){obj.object.material.color.setHex(nodeHighlightColor)}
      else if(nodeHighlightColor){obj.object.material.color.setRGB(nodeHighlightColor[0],nodeHighlightColor[1],nodeHighlightColor[2])}
    if(zoomAutoRotate){
      controls.autoRotate = true;
    }
    render();
  }

  //Create Scene, Renderer, and Mesh for Appending to Scene
  var cssScene = new THREE.Scene(),
      cssRenderer = new THREE.CSS3DRenderer();
      cssRenderer.setSize(renderSizeWidth,renderSizeHeight);
      cssRenderer.domElement.style.position = 'absolute';
      cssRenderer.domElement.className = popupRendererContainerClass;
      if(rendererTarget){
        var nodeRenderTargetPos = $(rendererTarget).children('canvas').offset();
        cssRenderer.domElement.style.top = nodeRenderTargetPos.top;
        cssRenderer.domElement.style.left = nodeRenderTargetPos.left;
      } else {cssRenderer.domElement.style.top = 0}

  //Create Plane Mesh
  var lastPlaneMeshName = [];
  function createMesh(pos,rotation,remove){
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
      planeMesh.rotation.x = rotation.x;
      planeMesh.rotation.y = rotation.y;
      planeMesh.rotation.z = rotation.z;
      planeMesh.name = 'planeMesh';
    scene.add(planeMesh);
    lastPlaneMeshName.push(planeMesh.name);
    return planeMesh;
  }

  //Create DOM Element
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
    cssObject.rotation.set(planeMesh.rotation.x,planeMesh.rotation.y,planeMesh.rotation.z);
    cssObject.name = 'cssObject';
    lastCssObjectName.push(cssObject.name);
    cssObject.scale.multiplyScalar(1/350);
    cssScene.add(cssObject);
    return cssObject;
  }

  var objIterator = 0;
  _3DATA.cssObj = {};

  function appendPopup(node,remove){
    //set cssMesh position
    var cssPos = node.position;
    cssPos.x += meshPosX;
    cssPos.y += meshPosY;
    cssPos.z += meshPosZ;
    var cssRot = node.rotation;
    //render css3D
    var cssMesh = createMesh(cssPos,cssRot,remove);
    var cssObj = createDomElement(nodePopupFunction(node.userData.nodeInfo),cssMesh,remove);
    document.body.appendChild(cssRenderer.domElement);
    cssRenderer.render(cssScene,camera);
    _3DATA.cssObj[objIterator] = [cssObj,cssMesh]
    objIterator++;
  }

  //Render scene and camera
  function render(){
    renderer.render( scene, camera );
    cssRenderer.render(cssScene,camera);
  }

  //Initialize and Render the Page!
  init();
  render();

  //-----------------//
  // Event Listeners //
  //-----------------//

  function onWindowResize() {
    camera.aspect = renderSizeWidth/renderSizeHeight;
    camera.updateProjectionMatrix();
    if(respondToWindowResizing){
      rSizeWidth = optionsObj.renderSizeWidth || window.innerWidth;
      rSizeHeight = optionsObj.renderSizeHeight || window.innerHeight;
      renderer.setSize(rSizeWidth,rSizeHeight);
      cssRenderer.setSize(rSizeWidth,rSizeHeight);
    }
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
    // calculate objects intersecting the picking ray
    raycaster.setFromCamera(mouse,camera);
    var intersects = raycaster.intersectObjects(nodes.children);
    if(hasDblClickZoom){
      var children = nodes.children;
      var objPos = intersects[0].object.position;
      revertColor(lastClickedNode);
      lastClickedNode = intersects[0];
      //zoom into object
      zoomIntoNode(intersects[0]);
    }
    if(dblClickAppendPopup){
      //append popup
      appendPopup(intersects[0].object,true);
    }
    if(typeof dblClickFunction === 'function'){dblClickFunction(intersects[0].object)}else{};
  }

  //revert node to default color
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

  _3DATA.search = function(searchKey,searchValue,highlightFound){
    var foundNodes = [];
    function object3DID(){
      for(var i=0;i<scene.children.length-1;i++){
        if(scene.children[i].type==='Object3D'){return i}
      }
    }
    _.forEach(scene.children[object3DID()].children,function(val,key){
      var nodeInfo = val.userData.nodeInfo;
      var nodeSearchKey = nodeInfo[searchKey];
      if(nodeSearchKey === searchValue){
        if(highlightFound){
          if(revertColor[1]==='x'){val.material.color.setHex(revertColor)}
          else{val.material.color.setRGB(revertColor[0],revertColor[1],revertColor[2])}
        }
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
      var cssRot = zoomObjMesh.rotation;
      //set cssMesh position
      cssPos.x += meshPosX;
      cssPos.y += meshPosY;
      cssPos.z += meshPosZ;
      //render css3D
      var cssMesh = createMesh(cssPos,cssRot,true);
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

  _3DATA.appendPopup = function(node,remove){
    //set cssMesh position
    var cssPos = node.position;
    cssPos.x += meshPosX;
    cssPos.y += meshPosY;
    cssPos.z += meshPosZ;
    var cssRot = node.rotation;
    //render css3D
    var cssMesh = createMesh(cssPos,cssRot,remove);
    var cssObj = createDomElement(nodePopupFunction(node.userData.nodeInfo),cssMesh,remove);
    document.body.appendChild(cssRenderer.domElement);
    cssRenderer.render(cssScene,camera);
    _3DATA.cssObj[objIterator] = [cssObj,cssMesh]
    objIterator++;
  }

  _3DATA.getCamera = function(){
    return [camera,controls];
  }

  _3DATA.getSkyBox = function(){
    var skyBox = scene.getObjectByName('skyBox');
    return skyBox;
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

  _3DATA.remove = function(objectName, sceneType){
    if(sceneType === 'node'){
      var deleteObject = scene.getObjectByName(objectName);
      scene.remove(deleteObject);
    } else {
      var deleteObject = cssScene.getObjectByName(objectName);
      cssScene.remove(deleteObject);
    }
    render();
  }

  _3DATA.removePopup = function(meshName,popupName){
    if(meshName&&popupName){
      var popupObjectMesh = scene.getObjectByName ( meshName, true );
      var popupObject = cssScene.getObjectByName ( popupName, true );
      scene.remove(popupObjectMesh);
      cssScene.remove(popupObject);
    }else{
      var popupObjectMesh = scene.getObjectByName ( 'planeMesh', true );
      var popupObject = cssScene.getObjectByName ( 'cssObject', true );
      scene.remove(popupObjectMesh);
      cssScene.remove(popupObject);
    }
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

  _3DATA.stopAutoRotate = function(){
    controls.autoRotate = false;
  }

  if(cb){cb()}
  return {node: {scene: scene,renderer: renderer},popup: {scene: cssScene,renderer: cssRenderer}}
} // End Create function

window._3DATA = _3DATA;


