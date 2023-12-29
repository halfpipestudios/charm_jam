const basicVertexShaderSrc = `
    attribute vec2 aVertexPosition;
    attribute vec2 aTexCoord;
    
    varying vec2 UVs;

    uniform mat4 Model;
    uniform mat4 View;
    uniform mat4 Proj;


    void main() {
        gl_Position = Proj * View * Model * vec4(aVertexPosition, 0, 1);
        UVs = aTexCoord;
    }
`;

const basicFragmentShaderSrc = `
    precision mediump float;

    varying vec2 UVs;

    uniform vec4 Color;
    uniform sampler2D Sampler;
    
    void main() {
        gl_FragColor  = texture2D(Sampler, UVs) * Color;
    }
`;


function CreateShader(src, type) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    let error = gl.getShaderInfoLog(shader);
    if(error  !== "") {
        alert("ERROR: Unable to compiling shader: " + error);
    }
    return shader;
}

class Shader {
    Initialize(vertSrc, fragSrc) {
        
        let vertShader = CreateShader(vertSrc, gl.VERTEX_SHADER);
        let fragShader = CreateShader(fragSrc, gl.FRAGMENT_SHADER)

        this.program = gl.createProgram();

        gl.attachShader(this.program, vertShader);
        gl.attachShader(this.program, fragShader);

        gl.linkProgram(this.program);
        let error = gl.getProgramInfoLog(this.program);
        if(error  !== "") {
            alert("ERROR: Unable to link Program: " + error);
        }

        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
    }

    Destroy() {
        this.program = undefined;
    }

    Bind() {
        gl.useProgram(this.program);
    }

    Unbind() {
        gl.useProgram(0);
    }

    GetUniformLocation(name) {
        let location = gl.getUniformLocation(this.program, name);
        return location;
    }

}