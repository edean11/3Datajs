
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

var projectNameKey = {
    threedatajs: '3Datajs',
    terminalColorCapture: 'Terminal Color Capture',
    spaceRace: 'Space Race'
}

function projectsPopup(projectName,imgSrc){
    var elem = document.createElement('div');
      elem.className = projectName+'Container';
      elem.innerHTML = '<p class="'+projectName+'Title projectTitle">'+projectNameKey[projectName]+'</p><img class="'+projectName+'" src="'+imgSrc+'"></img>';
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
        location: [-1.5,0,-6.2],
        rotation: [0,0,0]
    },
    profilePicCaption: {
        name: 'profile_pic_caption',
        popup: profilePicCaptionPopup(),
        location: [1,0,-6],
        rotation: [0,0,0]
    },
    threedatajs: {
        name: '3datajs',
        popup: projectsPopup('threedatajs',
            'https://s3.amazonaws.com/3datajs.com/images/Screen+Shot+2015-03-26+at+10.31.14+PM.png'),
        location: [6,1,-1.5],
        rotation: [0,-1.5,0]
    },
    terminal_color_capture: {
        name: 'terminalColorCapture',
        popup: projectsPopup('terminalColorCapture',
            'https://s3.amazonaws.com/edean11.github.io/projects/terminal_color_capture'),
        location: [6,1,1.5],
        rotation: [0,-1.5,0]
    },
    space_race: {
        name: 'spaceRace',
        popup: projectsPopup('spaceRace',
            'https://s3.amazonaws.com/edean11.github.io/projects/spacerace_start.png'),
        location: [6,-1,0],
        rotation: [0,-1.5,0]
    },
    background: {
        name: 'background',
        popup: infoPopup('background','fa fa-globe fa-5x'),
        location: [-1,2,6],
        rotation: [0,0,0]
    },
    skills: {
        name: 'skills',
        popup: infoPopup('skills','fa fa-sitemap fa-5x'),
        location: [1,2,6],
        rotation: [0,0,0]
    },
    interests: {
        name: 'interests',
        popup: infoPopup('interests','fa fa-connectdevelop fa-5x'),
        location: [0,-2,6],
        rotation: [0,0,0]
    },
    github: {
        name: 'github',
        popup: linksPopup('github','https://github.com/edean11','fa fa-github fa-5x'),
        location: [-6,2,1],
        rotation: [0,0,0]
    },
    linked_in: {
        name: 'linked_in',
        popup: infoPopup('linked_in','https://www.linkedin.com/pub/ed-dean/ba/9a2/852',
            'fa fa-linkedin-square fa-5x'),
        location: [-6,2,-1],
        rotation: [0,0,0]
    },
    email: {
        name: 'email',
        popup: infoPopup('email','mailto:edean1010@gmail.com','fa fa-envelope-o fa-5x'),
        location: [-6,-2,1],
        rotation: [0,0,0]
    },
    resume: {
        name: 'resume',
        popup: infoPopup('resume','https://s3.amazonaws.com/edean11.github.io/Dean%2C+Ed+Resume_2015.pdf',
            'fa fa-newspaper-o fa-5x'),
        location: [-6,-2,-1],
        rotation: [0,0,0]
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
    maxBound : 40000,
    backgroundType : 'color', //image or color
    backgroundColor : [[0,0,0],[1,1,1],[0,0,0],[1,1,1],[0,0,0],[0,0,0]],
    nodeRotationVar : 'rotation'
}

_3DATA.create(htmlElems,options);

_3DATA.getNodeScene().children[0].visible = false;

var camera = _3DATA.getCamera()[0]
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = -1;

var controls = _3DATA.getCamera()[1]
controls.target.x = 0;
controls.target.y = 0;
controls.target.z = -6;


//Nav Switches
function hideOtherIcons(location){
    _.forEach(locationArr,function(loc){
        var elem = '.nav-icon-'+loc;
        $(elem).hide()
    })
    var elem2 = '.nav-icon-'+location;
    $(elem2).show();
}

function flipArrowIconColor(){
    if($('.nav-icon-left').hasClass('nav-icon-left-white')){
        $('.nav-icon-left').removeClass('nav-icon-left-white').addClass('nav-icon-left-black')
        $('.nav-icon-right').removeClass('nav-icon-right-white').addClass('nav-icon-right-black')
    }else{
        $('.nav-icon-left').removeClass('nav-icon-left-black').addClass('nav-icon-left-white')
        $('.nav-icon-right').removeClass('nav-icon-right-black').addClass('nav-icon-right-white')
    }
}

function toggleProjectView(project){
    $('.projectDescriptionsContainer').toggleClass('hidden');
    $('.nav-icon-projects').css('display','none');
    if(project==='threedatajs'){
        $('.threedatajsDescription').removeClass('hidden');
        $('.terminalColorCaptureDescription').addClass('hidden');
        $('.spaceRaceDescription').addClass('hidden');
        $('.terminalColorCaptureContainer').addClass('hidden');
        $('.spaceRaceContainer').addClass('hidden');
    } else if(project==='terminalColorCapture'){
        $('.terminalColorCaptureDescription').removeClass('hidden');
        $('.threedatajsDescription').addClass('hidden');
        $('.spaceRaceDescription').addClass('hidden');
        $('.threedatajsContainer').addClass('hidden');
        $('.spaceRaceContainer').addClass('hidden');
    } else if(project==='spaceRace'){
        $('.spaceRaceDescription').removeClass('hidden');
        $('.threedatajsDescription').addClass('hidden');
        $('.terminalColorCaptureDescription').addClass('hidden');
        $('.threedatajsContainer').addClass('hidden');
        $('.terminalColorCaptureContainer').addClass('hidden');
    }
}

//Nav Tweens
function tweenCameraRight(target_location){
    if(target_location==='projects'){
        createjs.Tween.get(camera.position).to({
            x: 0,
            y: 10,
            z: 0},2000)
        .wait(300)
        .to({
            x: 0,
            y: 0,
            z: 0},2000)
        createjs.Tween.get(controls.target).to({
            x: -0.5,
            y: 0,
            z: -5}, 2000)
        .wait(300)
        .to({
            x: 5,
            y: 0,
            z: 0}, 2000)
    }
}

var locationArr = ['home','projects','info','links']
var locationIndex = 0;

$('.nav-icon-right').click(function(){
    flipArrowIconColor();
    if(locationIndex===3){
        locationIndex=0
    }else{
        locationIndex++;
    }
    tweenCameraRight(locationArr[locationIndex]);
    hideOtherIcons(locationArr[locationIndex]);
});


// .call(handleComplete);
//     function handleComplete() {
//         //Tween complete
//     }

var threedatajsScale = 'scale(1.3,2)';
var terminalColorCaptureScale = 'scale(1.7,2)'
var spaceRaceScale = 'scale(2.3,2)'

//Project Click Events
$('.closeProjectDescription').click(function(){
    $('body:hover .threedatajsContainer').css('transform','');
    $('body:hover .threedatajsContainer').css('-webkit-transform','');
    $('body:hover .terminalColorCaptureContainer').css('transform','');
    $('body:hover .terminalColorCaptureContainer').css('-webkit-transform','');
    $('body:hover .spaceRaceContainer').css('transform','');
    $('body:hover .spaceRaceContainer').css('-webkit-transform','');
    $('.threedatajsContainer').removeClass('hidden');
    $('.terminalColorCaptureContainer').removeClass('hidden');
    $('.spaceRaceContainer').removeClass('hidden');
    $('.projectDescriptionsContainer').removeClass('hidden');
    $('.nav-icon-projects').css('display','block');
    $('.projectDescriptionsContainer').toggleClass('hidden');
})

$('.threedatajsContainer').click(function(){
    $('body:hover .threedatajsContainer').css('transform',''+threedatajsScale+' translateY(200px)');
    toggleProjectView('threedatajs');
})

$('.terminalColorCaptureContainer').click(function(){
    $('body:hover .terminalColorCaptureContainer').css('transform',''+terminalColorCaptureScale+' translateY(200px) translateX(-600px)');
    toggleProjectView('terminalColorCapture');
})

$('.spaceRaceContainer').click(function(){
    $('body:hover .spaceRaceContainer').css('transform',''+spaceRaceScale+' translateY(-200px) translateX(-200px)');
    toggleProjectView('spaceRace');
})









