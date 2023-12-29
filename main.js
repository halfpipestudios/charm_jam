var gl = null;

function InitWebGL() {

    let canvas = document.getElementById("glcanvas");
    gl = canvas.getContext("webgl");

    if(gl === null) {
        alert("ERROR: Unable to initialize WebGL, your Browser or machine may not support it.");
        return null;
    }

    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(gl.TRUE);
    gl.depthFunc(gl.ALWAYS);  
    gl.disable(gl.CULL_FACE);
    //gl.cullFace(gl.NONE);

    return canvas;

}

class Engine {

    canvas = null;
    game = null;

    currentTime = 0;
    lastTime = 0;
    
    Start() {
        InputInitialize();
        this.canvas = InitWebGL();
        this.game = new Game;

        this.game.Initialize();

        this.currentTime = Date.now();
        this.lastTime = this.currentTime;
        
        this.Loop();
    }

    Loop() {
        this.currentTime = Date.now();
        let elapsed = this.currentTime - this.lastTime;
        this.lastTime = this.currentTime;

        let deltaTime = elapsed / 1000.0;

        this.game.Update(deltaTime);
        
        gl.clearColor(0.05, 0.05, 0.2, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        this.game.Render();

        InputPrepareForNextFrame();
        requestAnimationFrame(this.Loop.bind(this));
    }
}

function main() {
    let engine = new Engine;
    engine.Start();
}