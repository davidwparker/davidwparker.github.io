$(function() {
    // Various vars used for the gameplay
    // universe
    var container, stats;
    var camera, scene, projector, renderer, objects, theta = 0;

    // animation
    var isAnimated = true;

    // light
    var light, lightObject;

    // mouse move and down
    var mouse = { x: 0, y: 0 }, INTERSECTED, isUserInteracting = false;

    // keyboard
    var keyboard = new THREEkb.KeyboardState(), shown = false;

    // game-data
    var pnames = ["Orion","Earth","Persephenne","Mercurial","Rommulin","Venus","Mars","Eros","Gaspra","Id","Jovian","Jupiter","Kale","Sponde","Orthosie","Euporie","Helike","Kore","Helene","Pandora","Calypso","Ymir","Fenrir","Uranus","Miranda","Cordelia","Ophelia","Prospero","Neptune","Triton","Proteus","Pluto"]
    , psizes = {"tiny":0.8,"small":1.4,"medium":1.6,"large":1.9,"huge":2.3}
    , cplanet = {"id":-1,"name":"","size":0,"population":0,"believers":0};

    // user-data
    var user = {"turn":0,"believers":0,"planets":0};

    // modals
    var $helpModal = $('#helpModal')
    , $pregameModal = $('#pregameModal')
    , $planetModal = $('#planetModal');

    begin();

    /*********
     * MODALS
     *********/
    $helpModal.find(".btn-primary").click(function(e){
	$helpModal.modal("hide");
	e.preventDefault();
    });
    $pregameModal.find(".btn-primary").click(function(e){
	$pregameModal.modal("hide");
	updateTGStatus();
	init();
	animate();
	e.preventDefault();
    });
    $planetModal.find(".nothing").click(function(e){
	$planetModal.modal("hide");
	e.preventDefault();
    }).end().find(".btn-primary").click(function(e){
	$planetModal.modal("hide");
	resolveMiracle();
	e.preventDefault();
    });

    /*******
     * Initialization Functions
     *******/
    function begin() {
	$pregameModal.modal();
	$("#play-btn").focus();
    }
    function init() {
	// event listeners
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );

	container = document.createElement('div');
	document.body.appendChild(container);

	// scene size and camera attributes
	var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight,
	VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 1,
	FAR = 10000;

	// scene and camera
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE,ASPECT,NEAR,FAR);
	camera.position.set(0, 300, 500);
	scene.add(camera);

	// projector
	projector = new THREE.Projector();

	// WebGL renderer
	renderer = new THREE.WebGLRenderer();
	renderer.sortObjects = false;
	renderer.setSize(WIDTH, HEIGHT);
	container.appendChild(renderer.domElement);

	// objects (X worlds)
	objects = [];
	// create a new mesh with sphere geometry
	// set up the sphere vars
	var radius = 20, segments = 16, rings = 16;
	var geometry = new THREE.SphereGeometry(radius, segments, rings);
	var min = 1, max = 1;
	for (var i=0; i < 500; i++) {
	    var object = new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}));
	    object.name = {"id":i
			   , "name":pnames[Math.round(Math.random()*(pnames.length-1))]+" "+i
			   , "population":i*100+100
			   , "believers":1}

	    object.position.x = Math.random() * 800 - 400;
	    object.position.y = Math.random() * 800 - 400;
	    object.position.z = Math.random() * 800 - 400;
	    object.scale.x = Math.random() * 2 + 1;
	    object.scale.y = Math.random() * 2 + 1;
	    object.scale.z = Math.random() * 2 + 1;
	    //	    object.position.set(-i*50-100,0,Math.random()*i*100);
	    max = 0.5*i;
	    //var scale = Math.floor(Math.random() * (max - min + 1)) + min;
	    //object.scale.set(scale,scale,scale);
	    scene.add(object);
	    objects.push(object);
	}

	// light
	lightObject = new THREE.Mesh(new THREE.SphereGeometry(60,32,32),
				     new THREE.MeshBasicMaterial({color: 0xffffff}));
	lightObject.position.set(0,0,0)
	scene.add(lightObject);
	light = new THREE.PointLight(0xffffff, 1);
	scene.add(light);

	// stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);

	tgTotals();
    }

    /******
     * animate
     ******/
    function animate() {
	requestAnimationFrame( animate );
	render();
	keyboardActions();
	stats.update();
    }

    /******
     * render (draw) everything
     ******/
    function render() {
	var timer = 0.0001 * Date.now();
	// rotate each planet itself
/*
  for ( var i = 0, l = objects.length; i < l; i ++ ) {
	    var object = objects[i];
	    object.rotation.x += 0.01;
	    object.rotation.y += 0.005;
	}
*/
	// poor man's rotation... 
	// TODO: make this rotate the actual planets and not the camera
	theta += 0.2;

	camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
	camera.position.y = radius * Math.sin( theta * Math.PI / 360 );
	camera.position.z = radius * Math.cos( theta * Math.PI / 360 );
	camera.lookAt( scene.position );

//	camera.position.x = Math.cos(timer) * 1000;
//	camera.position.z = Math.sin(timer) * 1000;
//	camera.lookAt( scene.position );

	// find intersections for mouse over
	/*
	  var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	  projector.unprojectVector( vector, camera );
	  var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	  var intersects = ray.intersectObjects( objects );
	  if ( intersects.length > 0 ) {
	  if ( INTERSECTED != intersects[ 0 ].object ) {
	  if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
	  INTERSECTED = intersects[ 0 ].object;
	  INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
	  INTERSECTED.material.color.setHex( 0xff0000 );
	  }
	  } else {
	  if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
	  INTERSECTED = null;
	  }
	*/
	// Move light to ensure all objects are properly lit
	light.position.x = lightObject.position.x;
	light.position.y = lightObject.position.y;
	light.position.z = lightObject.position.z;
	// Render!
	renderer.render( scene, camera );
    }

    /******
     * Mouse functionality
     ******/
    function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    function onDocumentMouseDown( event ) {
	event.preventDefault();
	var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	projector.unprojectVector(vector, camera);
	var ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());
	var intersects = ray.intersectObjects(objects);
	if (intersects.length > 0) {
	    var obj = intersects[0].object;
	    planetModal(obj);
	}
    }

    /******
     * Keyboard functionality
     *****/
    function keyboardActions() {
	if(keyboard.pressed("h")) {
	    $helpModal.modal("show");
	} else if (keyboard.pressed("enter")) {
	    $helpModal.modal("show");
	} else if (keyboard.pressed("t")) {
	    // keyboard is super fast... kind of buggy-ish looking
	    $('.tg-sidebar').toggle();
	}
    }

    /******
     * Planet data
     ******/
    function setPlanetData(planet) {
//	alert(planet.name.believers + " " + cplanet.believers + " " + user.believers);
	cplanet.id = planet.name.id;
	cplanet.name = planet.name.name;
	cplanet.size = planetSize(planet.scale.x);
	cplanet.population = planet.name.population;
	cplanet.believers = planet.name.believers;
	$planetModal.find('.planet-name').text(cplanet.name)
	$planetModal.find('.planet-size').text(cplanet.size)
	$planetModal.find('.planet-population').text(cplanet.population)
	$planetModal.find('.planet-believers').text(cplanet.believers)
    }

    function planetModal(planet) {
	setPlanetData(planet);
	$planetModal.modal()
    }

    function planetSize(size) {
	if (size < psizes.small) {
	    return "tiny";
	} else if (size < psizes.medium) {
	    return "small";
	} else if (size < psizes.large) {
	    return "medium";
	} else if (size < psizes.huge) {
	    return "large";
	} else if (size >= psizes.huge) {
	    return "huge";
	}
    }

    /******
     * TG Status
     ******/
    function resolveMiracle() {
	if (user.believers > cplanet.believers) {
	    cplanet.believers += 50;
	    if (cplanet.believers > cplanet.population) cplanet.believers = cplanet.population;
	    objects[cplanet.id].name.population = cplanet.population;
	    objects[cplanet.id].name.believers = cplanet.believers;
	}
	
	user.turn++;
	tgTotals();
    }

    function tgTotals() {
	var cbelievers = 0, cplanets = 0;
	for (var i = 0; i < objects.length; i++) {
	    // total believers
	    cbelievers += objects[i].name.believers;
	    // total planets
	    var believersP = objects[i].name.believers / objects[i].name.population;
	    // planet owned if 70% believers
	    if (believersP > 0.7) cplanets++;
	}
	user.believers = cbelievers;
	user.planets = cplanets;
	updateTGStatus();
    }

    function updateTGStatus() {
	$('.tg-turn').text(user.turn);
	$('.tg-planets').text(user.planets);
	$('.tg-believers').text(user.believers);
    }

});
