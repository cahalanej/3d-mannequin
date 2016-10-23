var renderer, selectedNode, nodes = [];
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 5000 );
camera.position.set( 0, 20, 150 );

var raycaster = new THREE.Raycaster(); // create once
var mouse = new THREE.Vector2(); // create once


setBackground();
setLights();
// var core = buildFigure(0, 20);
// var shoulder = buildFigure(5, 5);
// var arm = buildFigure(15, 10);

// shoulder.add(arm);
// core.add(shoulder);

var loader = new THREE.OBJLoader();

// load a resource
var objectMap = {};
_.each(config.mannequinLoader, function(bodySection, index){
	var isLast = index === 'head';

	loader.load(
		// resource URL
		bodySection.file_path,
		// Function when resource is loaded
		function ( object ) {
			_.each(object.children, function(node) {


				// set position offsets so that rotations happen about local center
				var position = new THREE.Vector3(bodySection.positionX, bodySection.positionY, bodySection.positionZ);
				node.position.set( position.x, position.y, position.z );
				node.name = bodySection.name;


				var parent = bodySection.parent
				if (!_.isEmpty(parent)) {
					objectMap[parent].add(node);
				}

				objectMap[node.name] = node;

				if (bodySection.is_joint) {
					node.material.color.setHex(0x9b1a5d);
					nodes.push(node);
				} else {
					node.material.color.setHex(0xb7b7b7);
				}
			});

			if (isLast) {
				scene.add(objectMap.root);
			}
		}
	);

});




setRenderer();

document.body.appendChild( renderer.domElement );
render();

var inMotion = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
selectedNode = nodes[0];
console.log(nodes);
initListeners();

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}

function setRenderer() {
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0xffffff);
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.renderReverseSided = false;
}

function buildFigure(offsetX, offsetY) {
	var geometry = new THREE.IcosahedronGeometry( 5, 0 );
	var material = new THREE.MeshLambertMaterial( { color: 0x9b1a5d } );
	var cube = new THREE.Mesh( geometry, material );

	cube.castShadow = true;
	cube.receiveShadow = true;
	// cube.rotation.y = -Math.PI/4;
	cube.position.x = offsetX;
	cube.position.y = (offsetY * Math.sqrt(3))/2;
	scene.add( cube );

	nodes.push(cube);

	return cube;
}

function setBackground() {
	// visually blurs where background meets ground
	scene.fog = new THREE.Fog( 0xffffff, 1, 3000 );

	// build floor
	var groundGeo = new THREE.PlaneBufferGeometry( 5000, 5000 );
	var groundMat = new THREE.MeshPhongMaterial( { color: 0xd9c09e, specular: 0x040404 } );
	var ground = new THREE.Mesh( groundGeo, groundMat);

	// allows light to cast shadow on the floor
	ground.receiveShadow = true;

	ground.rotation.x = -Math.PI/2;
	ground.position.y = 0;

	scene.add( ground );
}

function setLights() {
	// LIGHTS
	hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.2 );
	hemiLight.color.setHSL( 0.6, 1, 0.6 );
	hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	hemiLight.position.set( 0, 500, 0 );
	scene.add( hemiLight );


	dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.color.setHSL( 0.1, 1, 0.95 );
	dirLight.position.set( -1, 1.75, 1 );
	dirLight.position.multiplyScalar( 50 );
	scene.add( dirLight );
	dirLight.castShadow = true;
	dirLight.shadow.mapSize.width = 2048;
	dirLight.shadow.mapSize.height = 2048;
	var d = 50;
	dirLight.shadow.camera.left = -d;
	dirLight.shadow.camera.right = d;
	dirLight.shadow.camera.top = d;
	dirLight.shadow.camera.bottom = -d;
	dirLight.shadow.camera.far = 3500;
	dirLight.shadow.bias = -0.0001;
}

function toggleInMotion() {
	inMotion = !inMotion;
}

function initListeners() {
	/* */
	$(renderer.domElement).on('mousedown', function() {
		toggleInMotion();

		$(renderer.domElement).on('mousemove', _.throttle(dragNode, 30));
	});

	$(document).on('mouseup', function(){
		toggleInMotion();
		$(renderer.domElement).off('mousemove');
	});

	$(renderer.domElement).on('mousedown', selectNode);
}

function toRadians(deg) {
	var radians = deg * Math.PI/180;
	return radians;
}

function dragNode(e) {
	if (inMotion) {
    	var deltaMove = {
	        x: e.offsetX-previousMousePosition.x,
	        y: e.offsetY-previousMousePosition.y
	    };

        var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            )
        );

        selectedNode.quaternion.multiplyQuaternions(deltaRotationQuaternion, selectedNode.quaternion);

        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    }
}

function selectNode(event) {
	event.preventDefault();
	var selected = false;

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( nodes );

    _.each(nodes, function(node) {
		if (_.isEmpty(intersects) || node !== intersects[0].object) {
			node.material.color.setHex(0x9b1a5d);
		} else {
			selectedNode = intersects[0].object;
			selectedNode.material.color.setHex(0x1eb1af);
			selected = true;
		}
	});
}
