
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
        location: [-1.5,1.3,6],
        rotation: [0,-3.15,0]
    },
    skills: {
        name: 'skills',
        popup: infoPopup('skills','fa fa-sitemap fa-5x'),
        location: [1.5,1.3,6],
        rotation: [0,-3.15,0]
    },
    interests: {
        name: 'interests',
        popup: infoPopup('interests','fa fa-connectdevelop fa-5x'),
        location: [0,-1.3,6],
        rotation: [0,-3.15,0]
    },
    github: {
        name: 'github',
        popup: linksPopup('github','https://github.com/edean11','fa fa-github fa-5x'),
        location: [-6,1,1],
        rotation: [0,1.6,0]
    },
    linked_in: {
        name: 'linked_in',
        popup: linksPopup('linked_in','https://www.linkedin.com/pub/ed-dean/ba/9a2/852',
            'fa fa-linkedin-square fa-5x'),
        location: [-6,1,-1],
        rotation: [0,1.6,0]
    },
    email: {
        name: 'email',
        popup: linksPopup('email','mailto:edean1010@gmail.com','fa fa-envelope-o fa-5x'),
        location: [-6,-1,1],
        rotation: [0,1.6,0]
    },
    resume: {
        name: 'resume',
        popup: linksPopup('resume','https://s3.amazonaws.com/edean11.github.io/Dean%2C+Ed+Resume_2015.pdf',
            'fa fa-newspaper-o fa-5x'),
        location: [-6,-1,-1],
        rotation: [0,1.6,0]
    },
}

//Create Options Obj from list of 3DATAjs available properties

var options = {
    hasDblClickZoom : false,
    dblClickAppendPopup : false,
    autoAppendPopup : true,
    respondToWindowResizing : true,
    positioningType : 'defined', //random, automatic, grouped, or defined
    positioningVariable: 'location',
    nodePopupFunction : function(node){
         return node.popup;
    },
    maxBound : 200,
    backgroundType : 'color', //image or color
    // ['left','right','top','bottom','back','front']
    backgroundColor : [[1,1,1],[1,1,1],'0xc1cdc1','0xc1cdc1',[0,0,0],[0,0,0]],
    nodeRotationVar : 'rotation'
}

_3DATA.create(htmlElems,options);

_3DATA.getNodeScene().children[0].visible = false;

var homeCameraPos = {x: 0,y: 0,z: -1},
    homeNavCameraPos = {x: 2,y: 6,z: 0},
    homeControlsTarget = {x: 0,y: 0,z: -6};
var projectsCameraPos = {x: 1,y: 0,z: 0},
    projectsNavCameraPos = {x: 0,y: 6,z: 2},
    projectsControlsTarget = {x: 5,y: 0,z: 0};
var infoCameraPos = {x: 0,y: 0,z: 1},
    infoNavCameraPos = {x: -2,y: 6,z: 0},
    infoControlsTarget = {x: 0,y: 0,z: 6};
var linksCameraPos = {x: -1,y: 0,z: 0},
    linksNavCameraPos = {x: 0,y: 6,z: -2},
    linksControlsTarget = {x: -5,y: 0,z: 0};


var camera = _3DATA.getCamera()[0]
camera.position.x = homeCameraPos.x;
camera.position.y = homeCameraPos.y;
camera.position.z = homeCameraPos.z;

var controls = _3DATA.getCamera()[1]
controls.target.x = 0;
controls.target.y = 0;
controls.target.z = -6;


//Nav Switches
var locationArr = ['home','projects','info','links']
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
var oneSectionLeftKey = [3,0,1,2];
var twoSectionsLeftKey = [2,3,0,1];
var threeSectionsLeftKey = [1,2,3,0];
function tweenCameraRight(target_location){
    createjs.Tween.get(camera.position).to({
        x: target_location.step.x,
        y: target_location.step.y,
        z: target_location.step.z},1500)
    // .wait(300)
    .to({
        x: target_location.pos.x,
        y: target_location.pos.y,
        z: target_location.pos.z},1500)
    createjs.Tween.get(controls.target).to({
        x: locations[oneSectionLeftKey[locationIndex]].target.x,
        y: locations[oneSectionLeftKey[locationIndex]].target.y,
        z: locations[oneSectionLeftKey[locationIndex]].target.z}, 1500)
    // .wait(300)
    .to({
        x: target_location.target.x,
        y: target_location.target.y,
        z: target_location.target.z}, 1500)
}

function tweenCameraLeft(target_location){
    createjs.Tween.get(camera.position).to({
        x: target_location.pos.x,
        y: target_location.pos.y+2,
        z: target_location.pos.z},750)
    // .wait(300)
    .to({
        x: locations[oneSectionLeftKey[locationIndex]].pos.x,
        y: locations[oneSectionLeftKey[locationIndex]].pos.y+2,
        z: locations[oneSectionLeftKey[locationIndex]].pos.z},600)
    // .wait(300)
    .to({
        x: locations[twoSectionsLeftKey[locationIndex]].pos.x,
        y: locations[twoSectionsLeftKey[locationIndex]].pos.y+2,
        z: locations[twoSectionsLeftKey[locationIndex]].pos.z},400)
    // .wait(300)
    .to({
        x: locations[threeSectionsLeftKey[locationIndex]].pos.x,
        y: locations[threeSectionsLeftKey[locationIndex]].pos.y+2,
        z: locations[threeSectionsLeftKey[locationIndex]].pos.z},600)
    // .wait(300)
    .to({
        x: target_location.pos.x,
        y: target_location.pos.y,
        z: target_location.pos.z},750)

    createjs.Tween.get(controls.target).to({
        x: target_location.target.x,
        y: target_location.target.y+2,
        z: target_location.target.z},750)
    // .wait(300)
    .to({
        x: locations[oneSectionLeftKey[locationIndex]].target.x,
        y: locations[oneSectionLeftKey[locationIndex]].target.y+2,
        z: locations[oneSectionLeftKey[locationIndex]].target.z},600)
    // .wait(300)
    .to({
        x: locations[twoSectionsLeftKey[locationIndex]].target.x,
        y: locations[twoSectionsLeftKey[locationIndex]].target.y+2,
        z: locations[twoSectionsLeftKey[locationIndex]].target.z},400)
    // .wait(300)
    .to({
        x: locations[threeSectionsLeftKey[locationIndex]].target.x,
        y: locations[threeSectionsLeftKey[locationIndex]].target.y+2,
        z: locations[threeSectionsLeftKey[locationIndex]].target.z},600)
    // .wait(300)
    .to({
        x: target_location.target.x,
        y: target_location.target.y,
        z: target_location.target.z},750)
}

var locations = {
    0:{name:'home',pos: homeCameraPos, target: homeControlsTarget, step: homeNavCameraPos},
    1:{name:'projects',pos: projectsCameraPos, target: projectsControlsTarget, step: projectsNavCameraPos},
    2:{name:'info',pos: infoCameraPos, target: infoControlsTarget, step: infoNavCameraPos},
    3:{name:'links',pos: linksCameraPos, target: linksControlsTarget, step: linksNavCameraPos}
}
var locationIndex = 0;

$('.nav-icon-right').click(function(){
    flipArrowIconColor();
    if(locationIndex===3){
        locationIndex=0
    }else{
        locationIndex++;
    }
    tweenCameraRight(locations[locationIndex]);
    hideOtherIcons(locations[locationIndex].name);
});

$('.nav-icon-left').click(function(){
    flipArrowIconColor();
    if(locationIndex===0){
        locationIndex=3
    }else{
        locationIndex--;
    }
    tweenCameraLeft(locations[locationIndex]);
    hideOtherIcons(locations[locationIndex].name);
});

var threedatajsScale = 'scale(1.1,1.8)';
var terminalColorCaptureScale = 'scale(1.5,2)'
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
    $('body:hover .threedatajsContainer').css('transform',''+threedatajsScale+' translateY(200px) translateX(60px)');
    toggleProjectView('threedatajs');
})

$('.terminalColorCaptureContainer').click(function(){
    $('body:hover .terminalColorCaptureContainer').css('transform',''+terminalColorCaptureScale+' translateY(200px) translateX(-660px)');
    toggleProjectView('terminalColorCapture');
})

$('.spaceRaceContainer').click(function(){
    $('body:hover .spaceRaceContainer').css('transform',''+spaceRaceScale+' translateY(-200px) translateX(-200px)');
    toggleProjectView('spaceRace');
})

// Info Events

function toggleInfoView(info){
    $('.infoDescriptionsContainer').toggleClass('hidden');
    $('.closeInfoDescription').toggleClass('hidden');
    if(info==='background'){
        $('.backgroundDescription').removeClass('hidden');
        $('.interestsDescription').addClass('hidden');
        $('.skillsDescription').addClass('hidden');
        $('.interestsContainer').addClass('hidden');
        $('.skillsContainer').addClass('hidden');
    } else if(info==='skills'){
        $('.skillsDescription').removeClass('hidden');
        $('.interestsDescription').addClass('hidden');
        $('.backgroundDescription').addClass('hidden');
        $('.interestsContainer').addClass('hidden');
        $('.backgroundContainer').addClass('hidden');
    } else if(info==='interests'){
        $('.interestsDescription').removeClass('hidden');
        $('.backgroundDescription').addClass('hidden');
        $('.skillsDescription').addClass('hidden');
        $('.backgroundContainer').addClass('hidden');
        $('.skillsContainer').addClass('hidden');
    }
}

function resetInfoStyles(className){
    $(className).css('color','');
    $(className).css('background-color','');
    $(className).css('border','');
    $(className).css('animation','rearrangeBackground 5s ease-in-out infinite');
    $(className).css('-webkit-animation','rearrangeBackground 5s ease-in-out infinite');
    $(className).css('-moz-animation','rearrangeBackground 5s ease-in-out infinite');
    $('body:hover '+className).css('animation','');
    $('body:hover '+className).css('-webkit-animation','');
    $('body:hover '+className).css('-moz-animation','');
    $('.backgroundContainer').removeClass('hidden');
    $('.skillsContainer').removeClass('hidden');
    $('.interestsContainer').removeClass('hidden');
    $('.infoDescriptionsContainer').toggleClass('hidden');
    $('.closeInfoDescription').toggleClass('hidden');
}

$('.closeInfoDescription').click(function(){
    $('body:hover .backgroundContainer').css('transform','');
    $('body:hover .backgroundContainer').css('-webkit-transform','');
    $('body:hover .skillsContainer').css('transform','');
    $('body:hover .skillsContainer').css('-webkit-transform','');
    $('body:hover .interestsContainer').css('transform','');
    $('body:hover .interestsContainer').css('-webkit-transform','');
    resetInfoStyles('.backgroundContainer');
    resetInfoStyles('.skillsContainer');
    resetInfoStyles('.interestsContainer');
})

$('.backgroundContainer').click(function(){
    $('body:hover .backgroundContainer').css('transform','translateY(-40px) translateX(-525px)');
    $('.backgroundContainer').css('animation','none');
    $('.backgroundContainer').css('-webkit-animation','none');
    $('.backgroundContainer').css('-moz-animation','none');
    $('.backgroundContainer').css('color','black');
    $('.backgroundContainer').css('background-color','white');
    $('.backgroundContainer').css('border','10px solid tomato');
    toggleInfoView('background');
})

$('.skillsContainer').click(function(){
    $('body:hover .skillsContainer').css('transform','translateY(-40px) translateX(525px)');
    $('.skillsContainer').css('animation','none');
    $('.skillsContainer').css('-webkit-animation','none');
    $('.skillsContainer').css('-moz-animation','none');
    $('.skillsContainer').css('color','black');
    $('.skillsContainer').css('background-color','white');
    $('.skillsContainer').css('border','10px solid tomato');
    toggleInfoView('skills');
})

$('.interestsContainer').click(function(){
    $('body:hover .interestsContainer').css('transform','translateY(-950px) translateX(0px)');
    $('.interestsContainer').css('animation','none');
    $('.interestsContainer').css('-webkit-animation','none');
    $('.interestsContainer').css('-moz-animation','none');
    $('.interestsContainer').css('color','black');
    $('.interestsContainer').css('background-color','white');
    $('.interestsContainer').css('border','10px solid tomato');
    toggleInfoView('interests');
})






