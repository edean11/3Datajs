
  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  var renderer  = new THREE.WebGLRenderer({
    antialias       : true, // to get smoother output
    preserveDrawingBuffer   : true  // to allow screenshot
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  var onRenderFcts= [];
  var scene = new THREE.Scene();
  var camera  = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
  camera.position.z = 150;

  var controls = new THREE.OrbitControls( camera );
    controls.damping = 0.2;
    controls.addEventListener( 'change', render );

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  function animate() {

    requestAnimationFrame(animate);
    controls.update();
    TWEEN.update();
    render();
  }

  var nodes = new THREE.Object3D();
    scene.add(nodes)

  init();
  render();

  function init() {
    /////////////////////////////
    //    add objects        //
    ////////////////////////////
    var geometry  = new THREE.SphereGeometry( 0.5,128,128 ),
        xDensity = 20,
        yDensity = 10,
        zDensity = 20;

    for(var i=0;i<100;i++){
      var material  = new THREE.MeshBasicMaterial({ wireframe: true, wireframeLinewidth: 0.1})
      material.color.setRGB(255,255,255);
      var mesh = new THREE.Mesh( geometry, material );
      mesh.position.x = ( Math.random() - 0.5 ) * 10 * xDensity;
      mesh.position.y = ( Math.random() - 0.5 ) * 10 * yDensity;
      mesh.position.z = ( Math.random() - 0.5 ) * 10 * zDensity;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      mesh.zoom = function(){console.log(this.uuid)}
        nodes.add(mesh)
        console.log(mesh);
    }

    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'mousemove', onMouseMove, false );
    window.addEventListener( 'dblclick', dblClickNode, false );

    animate();

  }

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

  function render(){
    renderer.render( scene, camera );
  }

  function dblClickNode( e ) {
    raycaster.setFromCamera( mouse, camera );
    nodes.traverse(function(node){
      if(node.material){
        node.material.color.setRGB(255,255,255);
      }else{}
    })
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( nodes.children );
    var children = nodes.children;
    var objPos = intersects[0].point;
    zoomIntoNode(intersects[0],objPos);
  }

  function zoomIntoNode(obj,pos){
    var x = pos.x,
        y = pos.y,
        z = pos.z;
    controls.target.set(x,y,z);
    if(obj.distance >= 5){
      var scaler = obj.distance/5;
      controls.dollyIn(scaler);
    }else{}
    controls.panLeft(-2);
    camera.updateProjectionMatrix();
    obj.object.material.color = new THREE.Color( 0xff0000 );
    render();
  }



