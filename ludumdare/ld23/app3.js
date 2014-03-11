$(function() {
    // Check for webgl
    if (! Detector.webgl) Detector.addGetWebGLMessage();

    // Universe
    var container
    , stats
    , camera
    , scene
    , projector
    , renderer;

    // Particles
    var particles = []
    , geometry
    , colors = []
    , materials;

    // Textures/Sprites/Shaders
    var uniform
    , sprite1 = THREE.ImageUtils.loadTexture("planet1.png")
    , sprite2 = THREE.ImageUtils.loadTexture("planet2.png")
    , sprite3 = THREE.ImageUtils.loadTexture("planet3.png")
    , sprite4 = THREE.ImageUtils.loadTexture("planet4.png")
    , sprites = [sprite1,sprite2,sprite3,sprite4];

    // Interactions
    // Mouse
    var mouse = {x:0,y:0};
    // Keyboard
    var keyboard = new THREEkb.KeyboardState()
    , shown = false;

    // Display
    var radius = 100
    , theta = 0;

    // Game
    var clock = new THREE.Clock()
    , tg = {"time":5
	    ,"destroyed":0
	    ,"highscore":0}
    , selectedTime = 5;

    // Modals
    var $gameoverModal = $('#gameoverModal')
    , $helpModal = $('#helpModal')
    , $pregameModal = $('#pregameModal');
    var btnPrimary = ".btn-primary";

    /*********
     * MODALS
     *********/
    $gameoverModal.find(btnPrimary).click(function(e){
	selectedTime = $(this).attr('data-time');
	$gameoverModal.modal("hide");
	eventListeners();
	init();
	e.preventDefault();
    });
    $helpModal.find(btnPrimary).click(function(e){
	$helpModal.modal("hide");
	e.preventDefault();
    });
    $pregameModal.find(btnPrimary).click(function(e){
	selectedTime = $(this).attr('data-time');
	$pregameModal.modal("hide");
	init();
	animate();
	e.preventDefault();
    });

    /********
     * START IT
     ********/
    function begin() {
	$pregameModal.modal({keyboard:false});
	$("#play-btn5").focus();
    }

    begin();

    function resetGame() {
	tg.time = selectedTime;
	tg.destroyed = 0;
	material = "";
    }

    function eventListeners() {
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mousedown', onDocumentMouseDown, false);
    }

    function init() {
	// reset game
	resetGame();

	// event listeners
	eventListeners();

	// container
	var $contents = $('#contents');
	if ($contents.length > 0)
	    $contents.remove();
	container = document.createElement('div');
	container.id = "contents";
	document.body.appendChild(container);

	// scene and camera
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 300, 500);
	scene.add(camera);

	// let there be light
	var light = new THREE.DirectionalLight(0xffffff, 2);
	light.position.set(1, 1, 1).normalize();
	scene.add(light);
	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(-1, -1, -1).normalize();
	scene.add(light);

	// 1000 worlds to destroy
	geometry = new THREE.SphereGeometry(10, 16, 16);
	uniform = {
	    time:{type:"f",value:1.0}
	    , resolution:{type:"v2",value:new THREE.Vector2()}
	}; 
	for (var i = 0; i < 1000; i ++) {
	    var rand = random(0,10);
	    var material;
	    var obj;
	    if (rand == 1) {
		material = new THREE.ShaderMaterial({
		    uniforms:uniform
		    , vertexShader: document.getElementById('vertexShader').textContent
		    , fragmentShader: document.getElementById('fragmentShader1').textContent
		});
	    } else if (rand == 2) {
		material = new THREE.ShaderMaterial({
		    uniforms:uniform
		    , vertexShader: document.getElementById('vertexShader').textContent
		    , fragmentShader: document.getElementById('fragmentShader2').textContent
		});
	    } else if (rand == 4) {
		material = new THREE.ShaderMaterial({
		    uniforms:uniform
		    , vertexShader: document.getElementById('vertexShader').textContent
		    , fragmentShader: document.getElementById('fragmentShader4').textContent
		});
	    } else if (rand > 4) {
		var val = Math.round(Math.random()*(sprites.length-1));
		var texture = sprites[val];
		material = new THREE.MeshLambertMaterial({
		    color: Math.random() * 0xffffff
		    , map:texture
		});
	    }
	    obj = new THREE.Mesh(geometry, material);
	    // position = translation
	    obj.position.x = Math.random() * 800 - 400;
	    obj.position.y = Math.random() * 800 - 400;
	    obj.position.z = Math.random() * 800 - 400;

	    // rotation
	    obj.rotation.x = Math.random() * 6;
	    obj.rotation.y = Math.random() * 6;
	    obj.rotation.z = Math.random() * 6;

	    // scale
	    var scale = Math.random() * 2 + 1;
	    obj.scale.set(scale,scale,scale);
	    // add world to scene
	    scene.add(obj);
	}

	// projector
	projector = new THREE.Projector();

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.sortObjects = false;
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	// stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);
    }

    /******
     * Mouse functionality
     ******/
    function onDocumentMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	$('#debug-mouse').text(mouse.x + " " + mouse.y);
    }

    function onDocumentMouseDown(event) {
	event.preventDefault();
	var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	projector.unprojectVector(vector, camera);
	var ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());
	var intersects = ray.intersectObjects(scene.children);
	if (intersects.length > 0) {
	    particleExplosion(intersects[0]);
	    scene.remove(intersects[0].object);
	    tg.destroyed++;
	}
    }

    /******
     * Keyboard functionality
     *****/
    function keyboardActions() {
	if(keyboard.pressed("h")) {
	    $helpModal.modal("show");
	}
    }

    /******
     * particles
     ******/
    function particleExplosion(obj) {
	// particles
	var partClock = new THREE.Clock()
	geometry = new THREE.Geometry();
	// create ton of random particles
	for (i = 0; i < 5000; i++) {
	    // random position
	    var max = 1, min = -1;
	    var numX = random(max,min)
	    , numY = random(max,min)
	    , numZ = random(max,min)
	    , objposition = obj.object.position // original position
	    // new position
	    , px = objposition.x + numX*Math.random()*5
	    , py = objposition.y + numY*Math.random()*5
	    , pz = objposition.z + numZ*Math.random()*5
	    , particle = new THREE.Vector3(px,py,pz)
	    // original velocity
	    , vx = 0, vy = 0, vz = 0
	    // difference from original to new position
	    , dx = px/objposition.x, dy = py/objposition.y, dz = pz/objposition.z;
	    // set velocity
	    if (px > objposition.x) vx = Math.random()*2+dx;
	    else vx = -2*Math.random()-dx;
	    if (py > objposition.y) vy = Math.random()*2+dy;
	    else vy = -2*Math.random()-dy;
	    if (pz > objposition.z) vz = Math.random()*2+dz;
	    else vz = -2*Math.random()-dz;
	    particle.velocity = new THREE.Vector3(vx,vy,vz);
	    // add to geometry
	    geometry.vertices.push(particle);
	}
	var size = 1
	, color = [Math.random()+1,Math.random(),Math.random()];
	materials = new THREE.ParticleBasicMaterial({size: size});
	materials.color.setHSV(color[0], color[1], color[2]);
	particles = new THREE.ParticleSystem(geometry, materials);
	particles.start = partClock.start()
	particles.clock = partClock;
	scene.add(particles);
    }

    function random(max,min) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /******
     * animate
     ******/
    function animate() {
	requestAnimationFrame(animate);
	render();
	keyboardActions();
	stats.update();
    }

    function render() {
	uniform.time.value += 0.05;

	var delta = clock.getDelta();
	theta += 0.2;
	camera.position.x = radius * Math.sin(theta * Math.PI / 360);
	camera.position.y = radius * Math.sin(theta * Math.PI / 360);
	camera.position.z = radius * Math.cos(theta * Math.PI / 360);
	camera.lookAt(scene.position);

	// move the particles
	for (i = 0; i < scene.children.length; i ++) {
	    var object = scene.children[i];
	    if (object instanceof THREE.ParticleSystem) {
		var elapsed = object.clock.getElapsedTime();
		if (elapsed > 3) {
		    scene.remove(object);
		}
		else {
		    for (var k = 0; k < object.geometry.vertices.length; k++) {
			var part = object.geometry.vertices[k];
			part.x += part.velocity.x;
			part.y += part.velocity.y;
			part.z += part.velocity.z;
		    }
		    object.geometry.verticesNeedUpdate = true;
		}
	    }
	}
	updateScore(delta);
	renderer.render(scene, camera);
    }

    /******
     * Game housekeeping
     ******/
    function updateScore(delta) {
	tg.time -= delta
	// game over
	if (tg.time < 0) {
	    document.removeEventListener('mousemove', onDocumentMouseMove, false);
	    document.removeEventListener('mousedown', onDocumentMouseDown, false);
	    $('.tg-game-end-destroyed').text(tg.destroyed);
	    $("#play-again-btn" + selectedTime).focus();
	    $gameoverModal.modal("show");
	}
	else {
	    // game on
	    var tm = Math.round(tg.time*100)/100;
	    $('#tg-time').text(tm);
	    $('#tg-destroyed').text(tg.destroyed);
	    if (tg.destroyed > tg.highscore) tg.highscore = tg.destroyed;
	    $('#tg-highscore').text(tg.highscore);
	}
    }
});
