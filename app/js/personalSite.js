
//Create HTML Popups for Each Section

function profilePicPopup(){
    var elem = document.createElement('div');
      elem.className = 'profilePicContainer';
      elem.innerHTML = '<img class="profilePic" src="https://s3.amazonaws.com/edean11.github.io/092+IBIS+12052013.jpg"></img>';
      return elem;
}

function profilePicCaptionPopup(){
    var elem = document.createElement('div');
      elem.className = 'profilePicCaptionContainer';
      elem.innerHTML = '<p class="profileCaption">Hello, my name is Ed Dean.'+
      '  I am a Full Stack developer with a focus on front end web development.</p>';
      return elem;
}

function projectsPopup(projectName,imgSrc){
    var elem = document.createElement('div');
      elem.className = projectName+'Container';
      elem.innerHTML = '<img class="'+projectName+'" src="'+imgSrc+'"></img>';
      return elem;
}

function infoPopup(sectionName,iconClass){
    var elem = document.createElement('div');
      elem.className = sectionName+'Container';
      elem.innerHTML = '<i class="'+iconClass+'"></i>';
      return elem;
}

function linksPopup(linkName,link,iconClass){
    var elem = document.createElement('div');
      elem.className = linkName+'Container';
      elem.innerHTML = '<a href="'+link+'" class="'+iconClass+'"></a>';
      return elem;
}

//Create HTML data object with corresponding popups

var htmlElems = {
    profilePic: {
        name: 'profile_pic',
        popup: profilePicPopup(),
        location: [-1.5,0,-5.1]
    },
    profilePicCaption: {
        name: 'profile_pic_caption',
        popup: profilePicCaptionPopup(),
        location: [1,0,-5]
    },
    threedatajs: {
        name: '3datajs',
        popup: projectsPopup('3Datajs',
            'https://s3.amazonaws.com/3datajs.com/images/Screen+Shot+2015-03-26+at+10.31.14+PM.png'),
        location: [5,2,-1]
    },
    terminal_color_capture: {
        name: 'terminal_color_capture',
        popup: projectsPopup('terminal_color_capture',
            'https://s3.amazonaws.com/edean11.github.io/projects/terminal_color_capture'),
        location: [5,2,1]
    },
    space_race: {
        name: 'space_race',
        popup: projectsPopup('space_race',
            'https://s3.amazonaws.com/edean11.github.io/projects/spacerace_start.png'),
        location: [5,-2,0]
    },
    background: {
        name: 'background',
        popup: infoPopup('background','fa fa-globe fa-5x'),
        location: [-1,2,5]
    },
    skills: {
        name: 'skills',
        popup: infoPopup('skills','fa fa-sitemap fa-5x'),
        location: [1,2,5]
    },
    interests: {
        name: 'interests',
        popup: infoPopup('interests','fa fa-connectdevelop fa-5x'),
        location: [0,-2,5]
    },
    github: {
        name: 'github',
        popup: linksPopup('github','https://github.com/edean11','fa fa-github fa-5x'),
        location: [-5,2,1]
    },
    linked_in: {
        name: 'linked_in',
        popup: infoPopup('linked_in','https://www.linkedin.com/pub/ed-dean/ba/9a2/852',
            'fa fa-linkedin-square fa-5x'),
        location: [-5,2,-1]
    },
    email: {
        name: 'email',
        popup: infoPopup('email','mailto:edean1010@gmail.com','fa fa-envelope-o fa-5x'),
        location: [-5,-2,1]
    },
    resume: {
        name: 'resume',
        popup: infoPopup('resume','https://s3.amazonaws.com/edean11.github.io/Dean%2C+Ed+Resume_2015.pdf',
            'fa fa-newspaper-o fa-5x'),
        location: [-5,-2,-1]
    },
}

//Create Options Obj from list of 3DATAjs available properties

var options = {
    hasDblClickZoom : false,
    autoAppendPopup : true,
    respondToWindowResizing : true,
    positioningType : 'defined', //random, automatic, grouped, or defined
    positioningVariable: 'location',
    nodePopupFunction : function(node){
         return node.popup;
    },
    maxBound : 1000,
    backgroundType : 'color', //image or color
    backgroundColor : [[0,0,0],[1,1,1],[0,0,0],[1,1,1],[0,0,0],[0,0,0]],
}

_3DATA.create(htmlElems,options);

_3DATA.getNodeScene().children[0].visible = false;

var camera = _3DATA.getCamera()[0]
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

var controls = _3DATA.getCamera()[1]

$('.nav-icon-right').click(function(){
    createjs.Tween.get(camera.position).to({
        x: 0,
        y: 10,
        z: 0},5000)
    .wait(500)
    .to({
        x: 0,
        y: 0,
        z: 0},5000)

    createjs.Tween.get(controls.target).to({
        x: -0.5,
        y: 0,
        z: -5}, 5000)
    .wait(500)
    .to({
        x: 5,
        y: 0,
        z: 0}, 5000)
    // new TWEEN.Tween( controls.target ).to( {
    //     x: -0.5,
    //     y: 0,
    //     z: -5}, 600 )
    //   .easing( TWEEN.Easing.Sinusoidal.EaseInOut).start();
})



// .call(handleComplete);
//     function handleComplete() {
//         //Tween complete
//     }










