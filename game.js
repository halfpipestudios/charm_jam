var c = {
    gray1:  new Vec4(124/255, 124/255, 124/255, 1),
    gray2:  new Vec4(64/255, 64/255, 64/255, 1),
    green:  new Vec4(0, 1, 0, 1),
    green1: new Vec4(0.5, 1, 0, 1),
    red:    new Vec4(1, 0, 0, 1),

}

var g = {

    window_w : 1280,
    window_h : 720,

    shader : new Shader(),
    soundManager : new SoundManager(),
    textureManager: new TextureManager(),

    boss : null,
    player : null,
    snakeBoss: null,

    ui : null,

    gameStateManager: null,

    timer: 0

}

function InitGlobals() {
    g.shader.Initialize(basicVertexShaderSrc, basicFragmentShaderSrc);

    g.soundManager.AddSound("cave", "./assets/sound.wav", true);
    g.soundManager.AddSound("shoot", "./assets/Spell_01.wav", false);
    g.soundManager.AddSound("hit", "./assets/Trap_00.wav", false);

    g.textureManager.AddTexture("bullet", "./assets/bullet.png");

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
    Initialize() {

        InitGlobals();

        let identity = new Mat4;
        let ortho = Mat4Orthographic(0, g.window_w,
                                     0, g.window_h,
                                     0.0, 100.0);
        let view = Mat4Translate(0, 0, 0);

        g.shader.Bind();
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("Model"), false, identity.m);
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("View"), false, view.m);
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("Proj"), false, ortho.m);
    }

    Update(deltaTime) {
        g.timer += deltaTime;
        switch(g.gameStateManager.GetState()) {
            case GameState.Menu:
                if(KeyJustDown(KeyCode.KEY_1)) {
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
                g.player.Render(g.shader);
                g.boss.Render();
                break;
            case GameState.Stage2: 
                g.player.Render(g.shader);
                g.snakeBoss.Render(g.shader);
                break;
        }

        g.ui.Render();
    }

}