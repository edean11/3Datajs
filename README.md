3Datajs
=======

## A small, customizable javascript library built on threejs for visualizing data in 3d space


Installation
------------

### Dependencies
	1.  jQuery
	2.  lodash
	3.  threejs

> The threejs build should have the following folders/files in
> the 'build' folder in addition to the standard three.min.js:

	* build/controls/OrbitControls.js
	* build/renderers/CanvasRenderer.js
	* build/renderers/CSS3DRenderer.js
	* build/renderers/Projector.js
	* build/Detector.js

To Install 3Datajs, install the dependencies above into your project folder then include the 3data.js file or simply use bower as shown below:

``bower install 3datajs --save``

Using 3Datajs
-------------

There are two primary inputs 3datajs needs in order to create your 3D data scene:

1. JS Data Object
2. JS Options Object

### JS Data Object
This object holds all the relvant data that you would like to map.  The data object should contain unique id's for each data point (entered as keys of the data object), and within each of those keys should be the data that corresponds to that data point.  The only property required in each data point is called "links" and it contains an array of references to each unique id the data point links to.  If links are not desired, there are no requirements as to what must be in the data object.  See examples below for more details.

### JS Options Object
This object can contain a wide variety of available output options as defined by 3datajs.  Simply include the options property and the desired value in the options object and pass it into the main 3datajs function with the data object.  See below for details.

## Example

###### Sample Data Object With Name

```
data = {
	1: {
		name: 'test1'
	},
	2: {
		name: 'test2'
	},
	3: {
		name: 'test3'
	},
	4: {
		name: 'test4'
	},
	5: {
		name: 'test5'
	},
}
```

###### Sample Options Object

```
options = {
  //place the nodes in a random position
  positioningType: random
}

```

###### Creating the scene

Now that we have a data and options object, all we have to do to create a 3datajs scene is pass those two objects as arguments to the _3DATA.create() function

``_3DATA.create(data,options)``

Congratulations! You have just created your first 3datajs scene!

## Available Options

allOptions = {
	rendererTarget: null,
    hasAmbientLight : true,
    hasDirectionalLight : false,
    showLinks : false,
    autoAppendPopup : false
    // random, automatic, grouped, or defined
    positioningType : 'automatic',
      //if automatic
      groupSize : 2,
      //if grouped
      groupingVariable: 'group',
      groupingDensity: 30,
      //if defined
      positioningVariable: 'position',
    nodeColorFunction : function(node){
        return node.color;
    },
    nodeSizeFunction : function(node){
        return node.links.length;
    },
    nodePopupFunction : function(node){
        return node.popup;
    },
    linkColorFunction : function(srcNode){
        return srcNode.linkColor;
    },
    dblClickFunction : function(clickedNode){
      return clickedNode.userData.nodeInfo.exampleFunction();
    }
    renderSizeWidth : null,
    renderSizeHeight : null,
    nodeSize : 2,
    nodeWidthSegments : 128,
    nodeHeightSegments : 128,
    maxBound : 10000,
    xSpread : 40,
    ySpread : 40,
    zSpread : 40,
    backgroundType : 'color', //image or color
    backgroundColor : [0,0,0],
    backgroundImage : 'http://i.imgur.com/x4egEw1.jpg',
    nodeColor : [0,1,0],
    nodeHighlightColor : [1,0,0],
    linkColor : [0,0,1],
    ambientLightColor : 0xffffff,
    directionalLightColor : 0xffffff,
    directionalLightPosX : 1,
    directionalLightPosY : 1,
    directionalLightPosZ : 1,
    meshPosX : 2+(2*1.5),
    meshPosY : -1,
    meshPosZ : -2,
    wireframeMesh: true,
    wireframeWidth: 1
}
```

- rendererTarget = If null, 3datajs append directly to the body of the html.  Otherwise, provide a jquery style selector to define the target of the data rendering (i.e. '#container')
- hasAmbientLight = boolean, defines if the scene has an ambient light
- hasDirectionalLight = boolean, defines if the scene has a directional light
- showLinks = boolean, defines if the links are shown in the scene
- autoAppendPopup = boolean, determines if the popups are appended for all nodes to start (true) or if they should only be appended when the node is selected (false)
- positioningType = this property has a large impact on how the data is positioned in the scene.  There are 4 possible choices:

	1. random - this is the easiest type to implement as it requires no other positioning properties to be defined.  It simply places all data points into the scene randomly, within the bounds set in the xSpread,ySpread and zSpread properties

	2. automatic - this method requires the links property on each data point as that property is how the position of each point is determined.  In this case, 3datajs will sort the data points(desc) by the number of links each has, it then chunks that data according to the groupSize defined and places the points in a random position (data points with the most links will grvitate towards the center while those with the least points will spread to the outside)

	3. grouped - this method allows the user to define which group a data point belongs to.  3datajs will place the points randomly onto the scene while ensuring the groups stay relatively together.  In this case, a 'groupingVariable' and a 'groupingDensity' must be defined.  The groupingVariable tells 3datajs the property name that defines how the data is grouped while the density determines how close the data points are to eachother (higher number is closer together)

	4. defined - this method allows the user to tell 3datajs exactly where each data point should be by including a position property in the data object.  The value of this position property must be an array of three values corresponding to the x,y, and z coordinates of that data point (i.e. [10,5,7]).  The 'positioningVariable' defines the property name that has the data point's position (so the property name doesn't have to be 'position')

- nodeColorFunction = this property should contain a function which returns a color value in RGB array form (i.e. [255,0,0]).  3datajs automatically provides each individual data point as an argument to this function, therefore allowing the user to define colors for each data point based off of any property contained in the data object.

- nodeSizeFunciton = similar to the nodeColorFunction, this property provides the individual data point as a built-in argument to this function.  In the example above, each data point's size is determined by how many links it has.

- nodePopupFunction = this function behaves similar to the two functions above, but in this case, it needs to return a dom element.  This dom element may contain anything the user desires and will determine what shows on each node when dblclicked

- linkColorFunction = similar to the above, this takes in each individual data point as an argument, thus allowing the user to color links based off of any property in the data set

- linkColorFunction = similar to the above, this takes in each individual data point as an argument, thus allowing the user to run any custom function upon the dblClick event. (note: the node argument for this function is slightly different than the above.  Console.log the result to find its structure)

- renderSizeWidth,renderSizeHeight = sets the width and height of the rendered scene, only used if a renderTarget was defined

- nodeSize = this is the default node size if a node size function returns undefined for any node

- nodeWidthSegments,nodeHeightSegments = this determines the resolution for each spherical node.  The higher the number, the higher the resolution **these properties have a significant effect on latency.  Unless high resolutions are required stay in the 8-64 range

- maxBound = determines the max camera position and the the background dimensions

- xSpread,ySpread,zSpread = determines how close together the nodes may be for each axis. The higher the number the more spread out the nodes will appear

- backgroundType = choose 'image' or 'color'.  This determines the background of the scene

- backgroundColor = RGB array (i.e. [0,255,0]) if 'color' was chosen for backgroundType

- backgroundImage = image URL if 'image' was chosen as the backgroundType

- nodeColor = default node color if nodeColorFunction returns undefined for any data point

- nodeHighlightColor = RGB array for the color of the node when selected

- linkColor = RGB array for the default link color if linkColorFunction returns undefined for any data point

- ambientLightColor = HEX color value for the color of the ambient light (if hasAmbientLight === true)

- directionalLightColor = HEX color value for the color of the directional light (if hasDirectionalLight === true)

- directionalLightPosX,directionalLightPosY,directionalLightPosZ = position of the directional light if hasDirectionalLight === true

- meshPosX,meshPosY,meshPosZ = position of the popup mesh relative to the node (i.e. 0,0,0 would be the center of the node)

- wireframeMesh = boolean, determines if the nodes should have wireframe material or not

- wireframeWidth = if wireframeMesh === true, this determines the width of each wireframe


## User Facing Functions

- _3DATA.create(data,options) = creates the scene with the data and options specified.  The return value is an object that contains: the data point scene and renderer as well as the popup scene and renderer.  These can be manipulated after the create function has been run to modify the scene as needed.  If modified, run the _3DATA.render() function specified below to show the changes

> Once the 3DATA.create() function has been called as seen
> above, the user will have access to a number of other
> functions that will help the user get the most out of
> their newly created scene

- _3DATA.render() = takes no arguments.  This function forces the re-rendering of the scene in order to show any changes made to the scene

- _3DATA.getCamera() = takes no arguments. This returns the camera object with all its useful properties to be examined or manipulated

- _3DATA.getNodeScene,_3DATA.getPopupScene,_3DATA.getNodeRenderer,_3DATA.getPopupRenderer = behave like getCamera() described above

- _3DATA.remove(objectName) = this removes the specified object from the scene.  Here, the user must specify the Object Name of the object to be removed.  This object name can be found/changed by digging through the node scene returned in the _3DATA.create() function

- _3DATA.search(key,value) = searches the scene for any objects matching the key,value pair provided.  It returns an array of all matching object and colors the matching nodes in the scene according to the defined nodeHighlightColor

- _3DATA.zoomNode(zoomObjMesh,zoomOut,showNodeInfo) = this allows the user to define and zoom into a specific node. You must provide the entire mesh of the node to be zoomed into, the amount you want to zoom out from that object once zoomed in (i.e. 10,100 etc.), and a boolean value of whether the popup displays when zoomed in

- _3DATA.zoomPosition(position,zoomOut) = this allows the user to zoom into any particular point in the scene.  Simply provide the position in an x,y,z array (i.e. [10,12,100]) and the amount to zoom out once zoomed in on that position

- _3DATA.revertColor(revertNode) = this allows the user to revert a node's color back to its original color.  Simply pass in the entire node object into the function.







