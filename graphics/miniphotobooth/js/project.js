/**************************************
 * David Parker
 * CSCI 7000: Advanced Graphics
 * Project: MiniPhotoBooth
 **************************************
 *
 * Code Organization:
 *
 * Globals
 * Init
 * --Camera
 * --Shaders
 * --Positions
 * --Textures
 * --UI
 * Render
 * Utility
 **************************************/
// Do everything after jQuery detects DOM is loaded
$(function() {
    // Check for webgl
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    // Globals
    var $video = $("#video"), 
    video = $video[0],
    log = $("#log")[0],

    // main canvas and picture preview canvas
    $canvas = $("#canvas"), canvas = $canvas[0],
    $preview = $("#preview"), preview = $preview[0],

    // 4x mini-canvases
    $canvas1, $canvas2, $canvas3, $canvas4,
    $canvases = $(".canvases"),
    $canvasText = $(".canvas-text"),
    drawCanvases = false,

    // buttons
    $btnFX = $("#effects"),
    $btnFirst = $("#firstPage"),
    $btnPrev = $("#prevPage"),
    $btnNext = $("#nextPage"),
    $btnLast = $("#lastPage"),
    $btnPhoto = $("#photo"),
    $btnSave = $("#save"),
    $btnCam = $("#cam"),

    // effects
    $act = $("#active"),
    $fx = $(".effects"),
    page=0, // page #
    pageData = [
        ["none","sharpen","blur","pixelated"],    // page 1
        ["gray","negative","sepia","glow"],       // page 3
        ["sobel","dilation","erosion","prewitt"], // page 2
        ["squeeze","bubble","mirror","twirl"],    // page 4
        ["thermal","darkness","light","self"]     // page 5
    ],

    // other
    gl = getContext(canvas), // webgl context
    img={},     // image to display
    rgb={},     // rgb values
    mouse={"lastX":0,"lastY":0}, // mouse position
    shaders={}; // shader list and list to use

    // Ensure shaders are loaded then start
    SL.Shaders.loadedSignal.add(init);

    // All initialization should go here
    function init() {
        initCamera(video, log); // in util.js
        initShaders();
        initPosition();
        initTextures();
        initUI();
    }

    // Creates the shader programs into a JS object
    function initShaders() {
        shaders = {
            "use":[],
            "none":SL.S.copy.fragment,
            "copy":SL.S.copy.fragment,
            "blur":SL.S.blur.fragment,
            "dilation":SL.S.dilation.fragment,
            "erosion":SL.S.erosion.fragment,
            "sharpen":SL.S.sharpen.fragment,
            "laplacian":SL.S.laplacian.fragment,
            "sobel":SL.S.sobel.fragment,
            "prewitt":SL.S.prewitt.fragment,
            "gray":SL.S.gray.fragment,
            "negative":SL.S.negative.fragment,
            "sepia":SL.S.sepia.fragment,
            "glow":SL.S.glow.fragment,
            "twirl":SL.S.polar_pre.fragment + SL.S.twirl.fragment + SL.S.polar_end.fragment,
            "squeeze":SL.S.polar_pre.fragment + SL.S.squeeze.fragment + SL.S.polar_end.fragment,
            "bubble":SL.S.polar_pre.fragment + SL.S.bubble.fragment + SL.S.polar_end.fragment,
            "mirror":SL.S.mirror.fragment,
            "thermal":SL.S.thermal.fragment,
            "darkness":SL.S.darkness.fragment,
            "light":SL.S.light.fragment,
            "pixelated":SL.S.pixelated.fragment,
            "self":SL.S.self.fragment
        };
    }

    // Position data for WebGL camera
    function initPosition() {
        img.buffer = gl.createBuffer();
        img.vertices = [-1,-1, +1,-1, -1,+1, -1,+1, +1,-1, +1,+1]; // two triangles to make a rect
    }

    function initTextures() {
        img.texture = setupTexture(gl);    // set properties for the texture
        img.imgTexture = setupTexture(gl); // for photo image
    }

    function initUI() {
        // Register click events
        $btnFX.click(function(event) {handleEffectsButtonClick(event);});
        $btnFirst.click(function(event) {page =0; handlePageClick(event);});
        $btnPrev.click(function(event) {page -=1; handlePageClick(event);});
        $btnNext.click(function(event) {page +=1; handlePageClick(event);});
        $btnLast.click(function(event) {page =pageData.length-1; handlePageClick(event);});
        $btnPhoto.click(function(event) {handlePhotoButtonClick(event);});
        $btnCam.click(function(event) {handleCamButtonClick(event);});
        $btnSave.click(function(event) {handleSaveButtonClick(event);});
        $canvas.click(function(event) {handleCanvasClick(this,event);});
        $canvases.click(function(event) {handleCanvasesClick(this,event);});
        $(document).on("click","a.activeFX",function(event) {return handleActiveClick(this,event);});

        // Hide UI
        $canvas.addClass("hide");
        $preview.addClass("hide");
        $btnCam.addClass("hide");
        $btnPhoto.addClass("hide");
        $btnSave.addClass("hide");

        // Active
        $act.text("none");
    }

    /*
     * Click events
     */
    function handleEffectsButtonClick(event) {
        // Initial click- move video element off screen and now render to main canvas
        $video.css({opacity:0.0,top:"-1000px",left:"-1000px",position:"absolute"});

        // UI
        $canvas.css({opacity:0.0}).addClass("hide");
        $preview.css({opacity:0.0}).addClass("hide");
        $fx.addClass("hide");
        $btnCam.addClass("hide");
        $btnPhoto.addClass("hide");
        $btnSave.addClass("hide");
        $btnFirst.removeClass("hide");
        $btnPrev.removeClass("hide");
        $btnNext.removeClass("hide");
        $btnLast.removeClass("hide");
        setPagination(page);

        // create canvases
        setCanvases();
    }

    function handlePageClick(event) {
        setPagination(page);
        setCanvases();
    }

    function handlePhotoButtonClick(event) {
        // UI
        $canvas.css({opacity:0.0}).addClass("hide");
        $preview.css({opacity:1.0}).removeClass("hide");
        $fx.removeClass("hide");
        $btnCam.removeClass("hide");
        $btnSave.removeClass("hide");

        // IMAGE
        preview.getContext('2d').drawImage(canvas,0,0);
    }

    function handleCamButtonClick(event) {
        // UI
        setCanvasShow();
    }

    function handleSaveButtonClick(event) {
        // UI
        setCanvasShow();

        // perform save
        preview.toBlob(function(blob) {
            saveAs(
                blob,
                "miniphotobooth.png"
            );
        }, "image/png");
    }

    function handleCanvasClick(_this,event) {
        // track mouse click position for squeeze, twirl, and bubble
        var offset = $(_this).offset(); 
        var relX = event.pageX - offset.left;
        var relY = event.pageY - offset.top;
        mouse.lastX = -(relX - canvas.width/2) / (canvas.width/2);
        mouse.lastY = -(relY - canvas.height/2) / (canvas.height/2);
    }

    function handleCanvasesClick(_this,event) {
        // UI
        setCanvasShow();
        $canvasText.addClass("hide");
        $btnPhoto.removeClass("hide");
        $btnFirst.addClass("hide");
        $btnPrev.addClass("hide");
        $btnNext.addClass("hide");
        $btnLast.addClass("hide");

        // render main canvas
        drawCanvases = false;
        var _shader = $(_this).data("type");
        var found = false;
        for (var i=0; i<shaders.use.length; i++) {
            if (_shader === shaders.use[i]) {
                found = true;
            }
        }
        if (!found) shaders.use.push(_shader);
        setActive();
        renderP(canvas);

        // cleanup old canvases
        $canvas1.remove();
        $canvas2.remove();
        $canvas3.remove();
        $canvas4.remove();
        $canvas1 = $canvas2 = $canvas3 = $canvas4 = undefined;
    }

    function handleActiveClick(_this,event) {
        var shader = $(_this).parent().data("shader");
        $(_this).parent().remove();

        // none left active
        if ($act.children().length == 0) {
            $act.text("none");
            shaders.use = [];
            shaders.use.push("none");
        } 
        // some active, splice
        else {
            var index;
            for (var i=0; i<shaders.use.length; i++) {
                if (shaders.use[i] == shader) {
                    index = i;
                    break;
                }
            }
            shaders.use.splice(index,1);
        }
        renderP(canvas);
        return false;
    }

    /*
     * Set UI
     */
    function setPagination(page) {
        page = page.clamp(0,pageData.length-1);
        // first page
        if (page === 0) {
            $btnFirst.attr("disabled","disabled");
            $btnPrev.attr("disabled","disabled");
            $btnNext.removeAttr("disabled");
            $btnLast.removeAttr("disabled");
        }
        // last page
        else if (page === pageData.length-1) {
            $btnFirst.removeAttr("disabled");
            $btnPrev.removeAttr("disabled");
            $btnNext.attr("disabled","disabled");
            $btnLast.attr("disabled","disabled");
        }
        // other pages
        else {
            $btnFirst.removeAttr("disabled");
            $btnPrev.removeAttr("disabled");
            $btnNext.removeAttr("disabled");
            $btnLast.removeAttr("disabled");
        }
    }

    function setCanvasShow() {
        $canvas.css({opacity:1.0}).removeClass("hide");
        $preview.css({opacity:0.0}).addClass("hide");
        $fx.removeClass("hide");
        $btnCam.addClass("hide");
        $btnSave.addClass("hide");
    }

    function setCanvases() {
        if ((page < 0) || (page > pageData.length-1)) return;

        // draw canvases
        drawCanvases = true;
        
        // cleanup old canvases
        if ($canvas1 !== undefined) {
            $canvas1.remove();
            $canvas2.remove();
            $canvas3.remove();
            $canvas4.remove();
            $canvas1 = $canvas2 = $canvas3 = $canvas4 = undefined;
        }

        // make new canvases
        $canvas1 = $canvases.last().clone(true);
        $canvas2 = $canvases.last().clone(true);
        $canvas3 = $canvases.last().clone(true);
        $canvas4 = $canvases.last().clone(true);
        $(".main").append($canvas1).append($canvas2);
        $(".main2").append($canvas3).append($canvas4);

        // set data
        $canvas1.data("type",pageData[page][0]);
        $canvas2.data("type",pageData[page][1]);
        $canvas3.data("type",pageData[page][2]);
        $canvas4.data("type",pageData[page][3]);
        renderM(buildProgram(pageData[page][0]),canvas,$canvas1[0]);
        renderM(buildProgram(pageData[page][1]),canvas,$canvas2[0]);
        renderM(buildProgram(pageData[page][2]),canvas,$canvas3[0]);
        renderM(buildProgram(pageData[page][3]),canvas,$canvas4[0]);

        // draw canvases text and position
        $canvasText.removeClass("hide");
        var $canvas1text = $("#canvas1text"),
        $canvas2text = $("#canvas2text"),
        $canvas3text = $("#canvas3text"),
        $canvas4text = $("#canvas4text");
        $canvas1text.text(pageData[page][0]);
        $canvas2text.text(pageData[page][1]);
        $canvas3text.text(pageData[page][2]);
        $canvas4text.text(pageData[page][3]);
        $canvas1text.position({my:"center",at:"center bottom-10",of:$canvas1});
        $canvas2text.position({my:"center",at:"center bottom-10",of:$canvas2});
        $canvas3text.position({my:"center",at:"center bottom-10",of:$canvas3});
        $canvas4text.position({my:"center",at:"center bottom-10",of:$canvas4});
    }

    function setActive() {
        // NOTE: if want max number of filters, use code below
        /*if (shaders.use.length === 3) {shaders.use.splice(0,1);}*/
        $act.text("");

        // add active shader text
        for (var i=0; i<shaders.use.length; i++) {
            // create a, span
            var $x = $(document.createElement('a'));
            $x.attr("href","#").addClass("activeFX").text(" [x] ");
            var $span = $(document.createElement('span'))
                .text(shaders.use[i] + " ").data("shader",shaders.use[i]).append($x);
            if ($act.text() === "none") {
                $act.text("").append($span);
            } else {
                $act.append($span);
            }
        }
    }

    /**
     * Rendering
     */
    function buildProgram(_shader) {
        // dynamically build fragment shader
        var frag = SL.S.pre.fragment + SL.S.copy.fragment;
        var polarAdded = false;
        var haloAdded = false;
        for (var i=0; i<shaders.use.length; i++) {
            // determine if polar_pre_pre needs to be added
            if (!polarAdded && (
                shaders.use[i] === "twirl" || 
                shaders.use[i] === "squeeze" || 
                shaders.use[i] === "bubble")) {
                polarAdded = true;
                frag += SL.S.polar_pre_pre.fragment;
            }

            // determine if halo needs to be added
            if (!haloAdded && (
                shaders.use[i] === "darkness" || 
                shaders.use[i] === "light")) {
                haloAdded = true;
                frag += SL.S.halo.fragment;
            }

            frag += shaders[shaders.use[i]];
        }
        
        // _shader is provided on mini canvases
        // if _shader is present and not in use, add it
        if (_shader) {
            var found = false;
            for (var i=0; i<shaders.use.length; i++) {
                if (_shader === shaders.use[i]) {
                    found = true;
                }
            }
            // haven't found it, add it
            if (!found) {
                // double check polar and halo redefinitions
                if (!polarAdded && (
                    _shader === "twirl" || 
                    _shader === "squeeze" || 
                    _shader === "bubble")) {
                    polarAdded = true;
                    frag += SL.S.polar_pre_pre.fragment;
                }

                if (!haloAdded && (
                    _shader === "darkness" || 
                    _shader === "light")) {
                    haloAdded = true;
                    frag += SL.S.halo.fragment;
                }

                frag += shaders[_shader];
            }
        }
        frag += SL.S.end.fragment;

        // one or more shaders, dynamically create program
        var program = createProgramFromShaders(
            gl,
            createShader(gl, gl.VERTEX_SHADER, SL.S.simple.vertex),
            createShader(gl, gl.FRAGMENT_SHADER, frag)
        )
        return program;
    }

    function renderP(ele) {
        var program = buildProgram();
        if (!program) return;

        // set program to use
        gl.useProgram(program);

        // set position attribute data
        gl.bindBuffer(gl.ARRAY_BUFFER, img.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(img.vertices), gl.STATIC_DRAW);

        // attribute
        var position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        // animate sequence
        window.requestAnimationFrame(function animate() {
            
            // program has to be set every frame
            gl.useProgram(program);
            // uniforms
            var width = gl.getUniformLocation(program, 'width');
            var height = gl.getUniformLocation(program, 'height');
            rgb.r = gl.getUniformLocation(program, 'r');
            rgb.g = gl.getUniformLocation(program, 'g');
            rgb.b = gl.getUniformLocation(program, 'b');
            mouse.mouse = gl.getUniformLocation(program, 'mouse');

            // set uniform data
            gl.viewport(0, 0, ele.width, ele.height);
            gl.uniform1f(width, ele.width);
            gl.uniform1f(height, ele.height);
            gl.uniform1f(rgb.r, $("#R").val());
            gl.uniform1f(rgb.g, $("#G").val());
            gl.uniform1f(rgb.b, $("#B").val());
            gl.uniform2f(mouse.mouse, mouse.lastX, mouse.lastY);

            // get number of passes and draw
            var passes = $("#passes").val() || 1;
            // FIXME: BUG for %2
            if (passes % 2 == 0) passes++;
            for (var i=0; i<passes; i++) {
                if (i == 0) {
                    // Alway bind texture to the video the first time
                    gl.bindTexture(gl.TEXTURE_2D, img.texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 
                                  gl.RGBA, gl.UNSIGNED_BYTE, video);

                } else {
                    // Bind to imgTexture for each extra pass
                    gl.bindTexture(gl.TEXTURE_2D, img.imgTexture);
                    gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 
                                      0, 0, ele.width, ele.height, 0);
                }
                gl.drawArrays(gl.TRIANGLES, 0, 6);  // draw rectangle
            }

            // request next frame to render
            window.requestAnimationFrame(animate);
        });
    }

    function renderM(program,ele,extra) {
        // set program to use
        gl.useProgram(program);

        // set position attribute data
        gl.bindBuffer(gl.ARRAY_BUFFER, img.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(img.vertices), gl.STATIC_DRAW);

        // attribute
        var position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        // animate sequence
        window.requestAnimationFrame(function animate() {
            
            // program has to be set every frame for mini-canvases
            gl.useProgram(program);
            // uniforms
            var width = gl.getUniformLocation(program, 'width');
            var height = gl.getUniformLocation(program, 'height');
            rgb.r = gl.getUniformLocation(program, 'r');
            rgb.g = gl.getUniformLocation(program, 'g');
            rgb.b = gl.getUniformLocation(program, 'b');
            mouse.mouse = gl.getUniformLocation(program, 'mouse');

            // set uniform data
            gl.viewport(0, 0, ele.width, ele.height);
            gl.uniform1f(width, ele.width);
            gl.uniform1f(height, ele.height);
            gl.uniform1f(rgb.r, $("#R").val());
            gl.uniform1f(rgb.g, $("#G").val());
            gl.uniform1f(rgb.b, $("#B").val());
            gl.uniform2f(mouse.mouse, mouse.lastX, mouse.lastY);

            // get number of passes and draw
            var passes = $("#passes").val() || 1;
            // FIXME: BUG for %2
            if (passes % 2 == 0) passes++;
            for (var i=0; i<passes; i++) {
                if (i == 0) {
                    // Alway bind texture to the video the first time
                    gl.bindTexture(gl.TEXTURE_2D, img.texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 
                                  gl.RGBA, gl.UNSIGNED_BYTE, video);

                } else {
                    // Bind to imgTexture for each extra pass
                    gl.bindTexture(gl.TEXTURE_2D, img.imgTexture);
                    gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 
                                      0, 0, ele.width, ele.height, 0);
                }
                gl.drawArrays(gl.TRIANGLES, 0, 6);  // draw rectangle
            }

            // draw mini-canvases
            extra.getContext('2d').drawImage(canvas,0,0);
            
            // request next frame to render
            window.requestAnimationFrame(animate);
        });
    }


});
