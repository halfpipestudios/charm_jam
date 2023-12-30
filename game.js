var c = {
    white:  new Vec4(1, 1, 1, 1),
    gray1:  new Vec4(124/255, 124/255, 124/255, 1),
    gray2:  new Vec4(64/255, 64/255, 64/255, 1),
    green:  new Vec4(0, 1, 0, 1),
    green1: new Vec4(0.5, 1, 0, 1),
    red:    new Vec4(1, 0, 0, 1),
    blue:   new Vec4(144/255, 181/255, 255/255, 1),
    overflow: new Vec4(5, 5, 5, 1),

}

var g = {

    window_w : 1280,
    window_h : 720,

    shader : new Shader(),
    soundManager : new SoundManager(),
    textureManager: new TextureManager(),

    camera : null,

    boss : null,
    player : null,
    snakeBoss: null,

    ui : null,

    gameStateManager: null,

    timer: 0,

    gpuBuffer: null

}

function LoadQuadToGPU() {
    let verticesTexCoords = new Float32Array([
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 0.0,
    ]);
    let n = 4;

    // Initialize gpu buffer
    g.gpuBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, g.gpuBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(0);

    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
    gl.enableVertexAttribArray(1); 
}

function InitGlobals() {
    g.shader.Initialize(basicVertexShaderSrc, basicFragmentShaderSrc);

    g.soundManager.AddSound("cave", "./assets/sound.wav", true);
    g.soundManager.AddSound("shoot", "./assets/Spell_01.wav", false);
    g.soundManager.AddSound("hit", "./assets/Trap_00.wav", false);

    g.textureManager.AddTexture("bullet", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/bullet1.png");
    g.textureManager.AddTexture("life", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/life.png");
    g.textureManager.AddTexture("snake_bad_head", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/snake_bad_head.png");
    g.textureManager.AddTexture("snake_bad_body", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/snake_bad_body.png");
    g.textureManager.AddTexture("snake_bad_tail", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/snake_bad_tale.png");

    g.textureManager.AddTexture("snake_cute_head", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/snake_cute_head.png");
    g.textureManager.AddTexture("snake_cute_body", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/snake_cute_body.png");
    g.textureManager.AddTexture("snake_cute_tail", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/snake_cute_tale.png");

    g.textureManager.AddTexture("tuto", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/tuto1.png");
    g.textureManager.AddTexture("pinguino", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/penguin.png");
    g.textureManager.AddTexture("grid", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/grid.png");
    g.textureManager.AddTexture("gun", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/gun.png");

    g.textureManager.AddTexture("saw", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/saw.png");
    g.textureManager.AddTexture("boss", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/boss.png");
    g.textureManager.AddTexture("flower", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/flower.png");
    g.textureManager.AddTexture("ship", "https://raw.githubusercontent.com/halfpipestudios/charm_jam/main/assets/ship.png");
    
    LoadQuadToGPU();
    
    g.camera = new Camera();

    g.player = new Player(new Vec2(320, 60), new Pistol);
    g.boss = new Boss();
    g.snakeBoss = new SnakeBoss();

    g.ui = new Ui();

    g.gameStateManager = new GameStateManager();
}

const GameState = {
    Menu: "menu",
    Defeated: "defeated",
    Pause: "pause",
    Stage1: "stage1",
    Stage2: "stage2",
}

class GameStateManager {
    constructor() {
        this.state = {state: GameState.Menu, onEnter: null};
        this.stack = [];
    }

    SetState(state, callback) {
        this.stack.push({state: this.state.state, onEnter: this.state.onEnter});
        this.state.state = state;
        this.state.onEnter = callback;
        if(this.state.onEnter !== null) this.state.onEnter();
    }

    GetState() {
        return this.state.state;
    }

    PopState() {
        this.state = this.stack.pop();
        if(this.state.onEnter !== null) this.state.onEnter();
    }
}

class Game {

    constructor() {
        this.backgournd = new Sprite(new Vec2(g.window_w/2, g.window_h/2), g.window_w+64, g.window_h+64, c.white);
    }

    Initialize() {

        InitGlobals();

        let identity = new Mat4;
        let ortho = Mat4Orthographic(0, g.window_w,
                                     0, g.window_h,
                                     0.0, 100.0);
        let view = g.camera.GetViewMatrix();

        g.shader.Bind();
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("Model"), false, identity.m);
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("View"), false, view.m);
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("Proj"), false, ortho.m);
    }

    Update(deltaTime) {
        g.timer += deltaTime;
        
        g.camera.Update(deltaTime);

        switch(g.gameStateManager.GetState()) {
            case GameState.Menu:
                if(KeyJustDown(KeyCode.KEY_1) || KeyJustDown(KeyCode.KEY_SPACE)) {
                    g.gameStateManager.SetState(GameState.Stage1, () => {
                        g.boss.Reset();
                        g.player.Reset();
                    });
                }
                if(KeyJustDown(KeyCode.KEY_2)) {
                    g.gameStateManager.SetState(GameState.Stage2, () => {
                        g.snakeBoss.Reset();
                        g.player.Reset();
                    });
                }
                break;
            case GameState.Defeated:
                break;
            case GameState.Pause: 
                break;
            case GameState.Stage1:
                g.player.Update(deltaTime);
                g.boss.Update(deltaTime);
                break;
            case GameState.Stage2: 
                g.player.Update(deltaTime);
                g.snakeBoss.Update(g.player.pos, deltaTime);
                break;
        }

        g.ui.Update(deltaTime);
    }

    Render() {

        switch(g.gameStateManager.GetState()) {
            case GameState.Menu:
                break;
            case GameState.Defeated:
                break;
            case GameState.Pause: 
                break;
            case GameState.Stage1:
                g.textureManager.BindTexture("grid");
                this.backgournd.Render(g.shader);
                g.boss.Render();
                g.player.Render(g.shader);
                break;
            case GameState.Stage2: 
                g.textureManager.BindTexture("grid");
                this.backgournd.Render(g.shader);
                g.snakeBoss.Render(g.shader);
                g.player.Render(g.shader);
                break;
        }

        g.ui.Render();
    }

}