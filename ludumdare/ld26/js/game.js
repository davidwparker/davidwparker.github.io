/**************************************
 * Copyright: David Parker
 * Ludum Dare 26: Minimalist Moe
 *
 * TODO:
 *   add graphics -> http://glsl.heroku.com/e#8379.0
 *   add sound -> started...
 *   add more levels...
 *   fix (remove) fired shots after level complete
 *   fix bounding box collision detection
 **************************************/
// Do everything after jQuery detects DOM is loaded
$(document).ready(function() {
    // Check for webgl
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    // DEBUG
    var DEBUG=false;

    // CONSTANTS
    // States
    var STATES = {
        LOADING:"loading",  // before game
        GAME:"game",        // during game
        PAUSE:"pause",      // paused game
        LEVEL:"level",      // between levels
        GAMEOVER:"gameover",// game over (dead or win)
    };
    
    // Enemy types
    //    [life,damage,speed,radius,corners]
    var ENEMIES = {
        "triangle_easy":[10,0.02,3,20,3],
        "triangle_med":[40,0.05,2,35,3],
        "triangle_hard":[100,0.1,1,45,3],
        "square_easy":[20,0.04,2.8,25,4],
        "square_med":[70,0.08,1.6,35,4],
        "square_hard":[140,0.14,1.1,50,4],
        "penta_easy":[40,0.05,4,40,5],
        "penta_med":[100,0.18,2.6,45,5],
        "penta_hard":[300,0.4,1.9,50,5],
        "hex_easy":[80,0.12,2.5,45,6],
        "hex_med":[150,0.24,2.0,50,6],
        "hex_hard":[400,0.6,1.5,60,6],
    };

    // Level data
    var LEVELS = [
        // index = level
        // [[types, quantity]]
        [["triangle_easy",10],["square_easy",5],["triangle_med",3],["square_hard",5]],
        [["square_easy",10],["triangle_med",5],["triangle_med",3],["triangle_hard",3],["square_med",5],["square_hard",2]],
        [["square_med",6],["penta_easy",5],["penta_med",3],["square_hard",5],["hex_easy",2],["penta_med",5],["penta_hard",2]],
        [["square_hard",6],["penta_med",5],["penta_hard",3],["square_hard",1],["hex_easy",2],["hex_med",5],["hex_hard",1]],
        [["penta_easy",6],["penta_med",5],["penta_hard",5],["hex_med",5],["hex_hard",2],["penta_hard",10],["hex_hard",3]],
        [["penta_easy",20],["hex_easy",15],["penta_med",10],["penta_hard",5],["hex_med",5],["hex_hard",5]],
    ];
    
    // Audio
    var mute=false, explosionAudio=[null,null,null,null,null], nextExplosion=0;

    // Images
    var imgMoe = THREE.ImageUtils.loadTexture("img/moe-smile.png");

    // UI
    var $container=$("#game"),
    containerWidth=1200+600,
    containerHeight=500+200,
    $start=$("#start"),
    $level=$("#level"),
    $pause=$("#pause"),
    $resume=$("#resume"),
    $reset=$("#reset"),
    $mute=$("#mute"),
    mouse={x:0,y:0};

    // Universe
    var stats, camera, scene, projector, renderer, animID;

    // Minimalist Moe game object
    var MM;

    /*
     * Buttons clicks and event handlers
     */
    $start.click(function() {startGame();return false;});
    $level.click(function() {nextLevel();return false;});
    $pause.click(function() {pauseGame();return false;});
    $resume.click(function(){resumeGame();return false;});
    $reset.click(function() {resetGame();return false;});
    $mute.click(function() {muteGame();return false;});

    function startGame() {
        $start.addClass("hide");
        $pause.removeClass("hide");
        MM.state = STATES.GAME;
        registerEventListeners();
        addGameObjectsToScene();
        updateUI();
        animate();
    }

    function nextLevel() {
        $level.addClass("hide");
        $pause.removeClass("hide");
        MM.state = STATES.GAME;
        registerEventListeners();
        addGameObjectsToScene();
        updateUI();
    }

    function pauseGame() {
        $pause.addClass("hide");
        $resume.removeClass("hide");
        MM.state = STATES.PAUSE;
        unregisterEventListeners();
    }
    
    function resumeGame() {
        $resume.addClass("hide");
        $pause.removeClass("hide");
        MM.state = STATES.GAME;
        registerEventListeners();
    }

    function resetGame() {
        $start.removeClass("hide");
        $pause.addClass("hide");
        $resume.addClass("hide");
        MM.init();
        updateUI();
        render();
        cancelAnimationFrame(animID);
        unregisterEventListeners();
    }
    
    function muteGame() {
        if (mute) $mute.text("Mute");
        else      $mute.text("Unmute");
        mute = !mute;
    }

    /*
     * Game states
     */
    function levelComplete() {
        MM.state = STATES.LEVEL;
        MM.wave = 1;
        MM.level++;
        MM.levelTotal = 0;
        MM.levelKills = 0;
        unregisterEventListeners();
        // game over, you win
        if (MM.level > LEVELS.length) {
            gameover(true);
            return;
        }
        $level.removeClass("hide");
        $pause.addClass("hide");
        $resume.addClass("hide");
        render();
    }

    function gameover(win) {
        MM.state = STATES.GAMEOVER;
        var text = "";
        if (win) text = "TOTAL VICTORY!!!";
        else     text = "Moe is DEAD!";
        $("#game-life").text(text);
        alert(text + "\nYou had a total of " + MM.kills + " kill" + (MM.kills === 1 ? " " : "s ") + "for a total score of " + MM.score + "!");
        resetGame();
    }

    /*
     * Event listeners
     */
    function registerEventListeners() {
	document.addEventListener('mousedown', mouseDown, false);
    }

    function unregisterEventListeners() {
        document.removeEventListener('mousedown', mouseDown, false);
    }

    /******
     * Mouse functionality
     ******/
    function mouseDown(event) {
	event.preventDefault();
	mouse.x = (event.clientX / containerWidth) * 2 - 1;
	mouse.y = - (event.clientY / containerHeight) * 2 + 1;
	var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

        // use raycaster to determine click position of bullet
	projector.unprojectVector(vector, camera);
        var direction = vector.sub(camera.position).normalize();
	var ray = new THREE.Raycaster(camera.position, direction);
        var distance = -camera.position.z / direction.z;
        var pos = camera.position.clone().add(direction.multiplyScalar(distance));
        createBullet(pos);
    }

    /******
     * Audio functionality
     ******/
    function playExplosion() {
        if (!mute) {
            // not loading assets properly yet...
            if (explosionAudio[nextExplosion] !== null) {
	        explosionAudio[nextExplosion].pause();
	        explosionAudio[nextExplosion].currentTime = 0.0;
	        explosionAudio[nextExplosion].volume = 0.7 + Math.random() * 0.1;
	        explosionAudio[nextExplosion].play();
            }
	    nextExplosion = (nextExplosion + 1) % explosionAudio.length;
        }
    }

    /*******************************************
     * Start everything here!
     *******************************************/
    init();

    /*******************************************
     * INITIALIZATION
     *******************************************/
    // All initialization should go here
    function init() {
        initAssets();
        initSceneCameraProjectorRenderer();
        initStats();
        initGame();
    }

    function initAssets() {
	setupLoad(new Audio(), "audio/Explosion1.wav", function(aud) {
	    explosionAudio[0] = aud;
	});
	setupLoad(new Audio(), "audio/Explosion2.wav", function(aud) {
	    explosionAudio[1] = aud;
	});
	setupLoad(new Audio(), "audio/Explosion3.wav", function(aud) {
	    explosionAudio[2] = aud;
	});
	setupLoad(new Audio(), "audio/Explosion4.wav", function(aud) {
	    explosionAudio[3] = aud;
	});
	setupLoad(new Audio(), "audio/Explosion5.wav", function(aud) {
	    explosionAudio[4] = aud;
	});
    }

    function initSceneCameraProjectorRenderer() {
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(
            $container.width()/-2,$container.width()/2,
            $container.height()/2,$container.height()/-2,
            0,101 // no real depth, just for camera depth (helps with raycasting)
        );
        camera.position.set(0,0,100);
        scene.add(camera);
	projector = new THREE.Projector();
        renderer = new THREE.WebGLRenderer();
        renderer.setSize($container.width(), $container.height());
        $container.append(renderer.domElement);
    }

    function initStats() {
        if (DEBUG) {
	    stats = new Stats();
	    stats.domElement.style.position = 'absolute';
	    stats.domElement.style.top = '0px';
	    $("body").append(stats.domElement);
        }
    }

    // initializes the game and house and moe objects required for the game
    function initGame() {
        MM = MM || {
            enemies:[],
            bullets:[],
            init: function() {
                this.reset();
                this.initHome();
                this.initMoe();
                return this;
            },

            reset: function() {
                this.state = STATES.LOADING;
                this.life = 100;
                this.score = 0;
                this.level = 1;
                this.wave = 1;
                this.levelKills = 0;
                this.levelTotal = 0;
                this.kills = 0;
                this.home = null;
                this.moe = null;
                this.resetEnemies();
                this.resetBullets();
                this.enemies = [];
                this.bullets = [];
            },
            resetBullets: function() {
                for (var i=0; i<this.bullets.length; i++) {
                    this.bullets[i].reset();
                }
                this.bullets = [];
                return this.bullets;
            },
            resetEnemies: function() {
                for (var i=0; i<this.enemies.length; i++) {
                    this.enemies[i].reset();
                }
                this.enemies = [];
                return this.enemies;
            },

            // home to defend
            initHome: function() {
                var h = {
                    "name":"home",
                    "active":true,
                    "background":true,
                    "pos":{"x":0-$container.width()/2,"y":0},
                    "height":500,
                    "width":100,
                    init: function(_this) {
                        this.geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);
                        this.material = new THREE.MeshBasicMaterial({color:0x5C5C5C, wireframe:false});
                        this.mesh = new THREE.Mesh(this.geometry, this.material);
                        this.mesh.position.set(this.pos.x+this.width/2,this.pos.y,-1);
                        _this.home = this;
                    }
                }.init(this);
            },

            // the man in action
            initMoe: function() {
                var moe = {
                    "name":"moe",
                    "active":true,
                    "pos":{"x":0-$container.width()/2,"y":0},
                    "radius":50,
                    "init": function(_this) {
                        this.geometry = new THREE.CircleGeometry(this.radius,32);
		        this.material = new THREE.MeshBasicMaterial({map:imgMoe});
                        this.mesh = new THREE.Mesh(this.geometry, this.material);
                        this.mesh.position.set(this.pos.x+this.radius,this.pos.y,0);
                        _this.moe = this;
                    }
                }.init(this);
            }
        }.init();
    }

    /*******************************************
     * Object creation (enemies, bullets)
     *******************************************/
    // Adds all game objects (non-bullets) to the scene
    function addGameObjectsToScene() {
        // background objects
        scene.add(MM.home.mesh);

        // moe
        scene.add(MM.moe.mesh);

        // enemies
        getEnemiesForLevel(LEVELS[MM.level-1]); // level is 1-based
        for (var i=0; i<MM.enemies.length; i++) {
            if (MM.enemies[i].active === true) {
                scene.add(MM.enemies[i].mesh);
            }
        }
    }

    function getEnemiesForLevel(waves) {
        // == level,wave,[enemy,number]
        //    LEVELS[0][0][0] // enemy
        //    LEVELS[0][0][1] // number
        MM.levelTotal = 0; // total number of enemies on level

        // for every wave
        for (var i=0; i<waves.length; i++) {
            var wave = waves[i];            // wave data [enemy,number]
            MM.levelTotal += wave[1];

            // for every singel enemy in the wave
            for (var j=0; j<wave[1]; j++) {

                // get the enemy type for that level
                var enemy = ENEMIES[wave[0]],
                rot = randomArbitrary(-1,1), // random +/- for rotation
                rotB = randomArbitrary(0,1), // does rotate?

                // get random x and y spacing and create position
                xSpace = getRandomXSpacing(i,waves,j),
                ySpace = getRandomYSpacing(),
                pos = new THREE.Vector3(xSpace,ySpace,0.0);

                // create it based on data
                createEnemy(pos,rot,rotB,enemy,i+1);
            }
        }
    }
    
    function getRandomXSpacing(waveNumber,waves,enemyNumber) {
        var inWave = 1,
        startSpace = $container.width()-150,
        minXSpace = 75;
        if (waveNumber > 0) inWave = waves[waveNumber-1][1]; // number from previous
        if (inWave > 8) inWave = 8;                          // max
        var waveSpace = inWave*minXSpace+150;
        return startSpace+ minXSpace*enemyNumber + waveSpace*waveNumber;
    }

    function getRandomYSpacing() {
        var rand = randomArbitrary(0,1); // top/bottom
        var randSpace = randomInt(1,5);
        var minYSpace = 50;
        var by = 0; // 10%
        if (rand > 0.55)      by = 1;  // 45%
        else if (rand < 0.46) by = -1; // 45%
        var ySpace = minYSpace*randSpace*by;
        if      (ySpace < 0-$container.height()/2+20) ySpace = 0-$container.height()/2+20;
        else if (ySpace >  +$container.height()/2-20) ySpace =  +$container.height()/2-20;
        return ySpace;
    }

    /*******************************************
     * bullets
     *******************************************/
    function createBullet(pos) {
        var b = {
            "name":"bullet",
            "active":true,
            "pos":{"x":0-$container.width()/2,"y":0},
            "radius":10,
            "speed":-10,
            "damage":10,
            init: function() {
                this.originPoint = MM.moe.mesh.position.clone();
                this.clickPoint = pos;
                this.dir = this.originPoint.sub(this.clickPoint).normalize();
                this.speedX = this.speed*this.dir.x;
                this.speedY = this.speed*this.dir.y;
                this.geometry = new THREE.CircleGeometry(this.radius,32);
                this.material = new THREE.MeshBasicMaterial({color:0x000000, wireframe:true});
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                this.mesh.position.set(this.pos.x+this.radius+50,this.pos.y,0);
                MM.bullets.push(this);
                scene.add(this.mesh);
            },
            update: function() {
                if (this.active === true) {
                    // update bullet from position vector towards direction vector
                    this.mesh.position.x += this.speedX;
                    this.mesh.position.y += this.speedY;

                    // check offscreen (just sides)
                    // if so, inactivate, remove from array and remove from scene
                    if (this.mesh.position.x >  $container.width()/2 ||
                        this.mesh.position.x < -$container.width()/2) {
                        this.reset();
                        return;
                    }

                    // iterate enemies
                    for (var j=0; j<MM.enemies.length;j++) {
                        var enemy = MM.enemies[j];

                        // only active enemies
                        if (enemy.active) {
                            var bb = enemy.geometry.boundingBox;

                            /*
                              collision detection:
                              -- poor man collision checking origin of bullet with bounding box of
                              -- enemy plus radius instead of the ray... 
                              -- Three.js intersection isn't being very good at the moment.
                            */
                            if (this.mesh.position.x < enemy.mesh.position.x+bb.max.x+this.radius/2 &&
                                this.mesh.position.x > enemy.mesh.position.x+bb.min.x-this.radius/2 &&
                                this.mesh.position.y < enemy.mesh.position.y+bb.max.y+this.radius/2 &&
                                this.mesh.position.y > enemy.mesh.position.y+bb.min.y-this.radius/2) {

                                // hit something!
                                // decrement life and check if killed
                                enemy.life -= this.damage;
                                playExplosion();
                                if (enemy.life <= 0) {
                                    MM.score += enemy.totalLife;
                                    ++MM.kills;
                                    ++MM.levelKills;
                                    enemy.reset();
                                    updateUI();

                                    // if killed last enemy on level
                                    if (MM.levelKills === MM.levelTotal) levelComplete();
                                }

                                // remove bullet
                                this.reset();
                                break;
                            } // collision detection
                        } // active enemy
                    } // for enemies loop
                } // active bullet

                else {
                    this.reset();
                }
            }, // update
            reset: function() {
                this.active = false;
                scene.remove(this.mesh)
            }
        }.init();
        return b;
    }

    /*******************************************
     * Enemy
     *******************************************/
    function randomHex() {
        var r = randomInt(0,15);
        if (r === 10) 
            r = "a";
        else if (r === 11)
            r = "b";
        else if (r === 12)
            r = "c";
        else if (r === 13)
            r = "d";
        else if (r === 14)
            r = "e";
        else if (r === 15)
            r = "f";
        return r;
    }
    function randomRGB() {
        var r1 = randomHex(),
        r2 = randomHex(),
        g1 = randomHex(),
        g2 = randomHex(),
        b1 = randomHex(),
        b2 = randomHex(),
        color = "#"+r1+r2+g1+g2+b1+b2;
        return color;
    }
    
    function createEnemy(pos,rot,rotB,enemy,wave) {
        var e = {
            "name":"enemy",
            "active":true,
            "pos":pos,
            "rot":rot,
            "rotB":rotB,
            "totalLife":enemy[0],
            "life":enemy[0],
            "damage":enemy[1],
            "speed":enemy[2],
            "radius":enemy[3],
            "corners":enemy[4],
            "wave":wave,

            // initialize an enemy
            init: function() {
                this.geometry = new THREE.CircleGeometry(this.radius,this.corners);
                this.material = new THREE.MeshBasicMaterial({color:randomRGB(),wireframe:false});
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                this.mesh.position.set(this.pos.x,this.pos.y,0);
                this.geometry.computeBoundingBox();
                this.homeside = 0-$container.width()/2+MM.home.width+this.radius/2,
                MM.enemies.push(this);
            },

            // update and do position stuff
            update: function() {

                // active enemies only
                if (this.active === true) {

                    // move and rotate
                    this.mesh.position.x -= this.speed;
                    if (this.rotB >= 0.3) this.mesh.rotation.z += (this.rot > 0 ? 0.01 : -0.01);

                    // check if hitting home, stop moving if so
                    if (this.mesh.position.x <= this.homeside) {
                        this.mesh.position.x = this.homeside;

                        // we are hit, take damage and update UI
                        MM.life -= this.damage;
                        updateUI();

                        // check if dead
                        if (MM.life <= 0) gameover(false);
                    }

                    // check for upcoming wave
                    if (this.mesh.position.x < $container.width()/2+200 &&
                        this.wave > MM.wave) {
                        MM.wave = this.wave;
                        updateUI();
                    }
                } // active enemy
                
                else {
                    this.reset();
                }
            },
            reset: function() {
                this.active = false;
                scene.remove(this.mesh)
            }
        }.init();
        return e;
    }

    /**********
     * animation, updating, and rendering
     **********/
    // animate as long as in game state
    function animate() {
        animID = requestAnimationFrame(animate);
        if (MM.state === STATES.GAME) {
            update();
	    render();
        }

        if (DEBUG) stats.update();
    }

    // update game objects
    function update() {
        // update active enemy objects
        for (var i=0; i<MM.enemies.length; i++) {
            MM.enemies[i].update(i);
        }

        // update active bullet objects
        for (var i=0; i<MM.bullets.length; i++) {
            MM.bullets[i].update(i);
        }
    }

    // update user information
    function updateUI() {
        $("#game-life").text(Math.round(MM.life) + "%");
        $("#game-level").text(MM.level);
        if (MM.levelTotal > 0) $("#game-percent").text(Math.round(MM.levelKills/MM.levelTotal*100) + "%");
        else                   $("#game-percent").text("0%");
        $("#game-wave").text(MM.wave);
        $("#game-kills").text(MM.kills);
        $("#game-score").text(MM.score);
    }

    // render the scene!
    function render() {
        renderer.render(scene,camera);
    }
});
