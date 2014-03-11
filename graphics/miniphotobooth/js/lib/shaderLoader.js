// NOTE Shader Loader requires jQuery and signals.js
var ShaderLoader = ShaderLoader || {};
ShaderLoader.Shaders = ShaderLoader.Shaders || {};

var slFragmentShaders = $('script[type="x-shader/x-fragment"]');
var slVertexShaders = $('script[type="x-shader/x-vertex"]');
var slShaderCount = slFragmentShaders.length + slVertexShaders.length;

if(!signals) throw new Error("You must include signals.js");
ShaderLoader.Shaders.loadedSignal = new signals.Signal();

function checkForComplete() {
    if(!slShaderCount) {
	ShaderLoader.Shaders.loadedSignal.dispatch();
    }
}
function loadShader(shader, type) {
    var $shader = $(shader);
    $.ajax({
	url: $shader.data('src'),
	dataType: 'text',
	context: {
	    name: $shader.data('name'),
	    type: type
	},
	complete: processShader
    });
}
function processShader(jqXHR, textStatus) {
    slShaderCount--;
    if(!ShaderLoader.Shaders[this.name]) {
	ShaderLoader.Shaders[this.name] = {
	    vertex: '',
	    fragment: ''
	};
    }
    ShaderLoader.Shaders[this.name][this.type] = jqXHR.responseText;
    checkForComplete();
}
for(var f = 0; f < slFragmentShaders.length; f++) {
    loadShader(slFragmentShaders[f], 'fragment');
}
for(var v = 0; v < slVertexShaders.length; v++) {
    loadShader(slVertexShaders[v], 'vertex');
}
checkForComplete();
// Export for globals
var SL = ShaderLoader;
SL.S = SL.Shaders;
