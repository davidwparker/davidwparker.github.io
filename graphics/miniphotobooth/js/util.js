/*
 * WEBGL
 */
// Context for WebGL
function getContext(canvas) {
  return canvas.getContext('webgl', { preserveDrawingBuffer: true })
    || canvas.getContext('experimental-webgl', { preserveDrawingBuffer: true });
}

/*
 * SHADERS
 */
// WebGL Shader of a given Type
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  if (shader == null) {
    console.error('Error creating the shader with shader type: ' + type);
  }
  gl.shaderSource(shader, source);

  // compile shader and check compilation status
  gl.compileShader(shader);
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    console.error('Error while compiling the shader: ' + info);
    console.error('Error shader source: ' + source);
  }
  return shader;
}

// Create a WebGLProgram instance from two WebGLShaders.
function createProgramFromShaders(gl, vs, fs) {
  var program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);

  // link program and check link status
  gl.linkProgram(program);
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    console.error('Error linking the shader: ' + gl.getProgramInfoLog(program));
  }
  return program;
}

/*
* ANIMATION
*/
// Cross-browser requestAnimationFrame
(function () {
  if (window.requestAnimationFrame) return;

  var found = false;
  ['oRequestAnimationFrame',
    'webkitRequestAnimationFrame',
    'mozRequestAnimationFrame'].forEach(function (impl) {

      if (impl in window) {
        window.requestAnimationFrame = function (callback) {
          window[impl](function () {
            callback();
          });
        };
        found = true;
      }
    });
  if (!found) {
    window.requestAnimationFrame = function (callback) {
      setTimeout(function () {
        callback();
      }, 1000 / 60);
    };
  }
})();

/*
* CAMERA
*/
// Cross-browser setup camera
function initCamera(video, log) {
  var getUserMediaKey = ['getUserMedia', 'webkitGetUserMedia', 'mozGetUserMedia'],
    urlKey = ['URL', 'webkitURL', 'mozURL'],
    found = false,
    videoHandler = function (localMediaStream) {
      video.srcObject = window[urlKey[i]].createObjectURL(localMediaStream);
      video.play();
    },
    videoHandler2 = function (stream) {
      video.srcObject = stream;
      video.play();
    },
    errorHandler = function () {
      log.innerHTML = 'An error occurred while loading the camera. Please refresh and try again.';
    },
    key;

  for (var i = 0, l = getUserMediaKey.length; i < l; ++i) {
    key = getUserMediaKey[i];
    if (key in navigator) {
      if (i > 0) {
        navigator[key]({ video: true }, videoHandler, errorHandler);
      } else {
        navigator[key]({ video: true }, videoHandler2, errorHandler);
      }
      found = true;
      break;
    }
  }
  return found;
}

/*
* TEXTURES
*/
function setupTexture(gl) {
  var tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

/*
* Other
*/
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};
