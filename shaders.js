const basicVertexShaderSrc = `
    attribute vec4 aVertexPosition;
    
    uniform mat4 Model;
    uniform mat4 View;
    uniform mat4 Proj;

    void main() {
        gl_Position = Proj * View * Model * aVertexPosition;
    }
`;

const basicFragmentShaderSrc = `
    precision mediump float;

    uniform vec4 Color;
    
    void main() {
        gl_FragColor = Color;
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