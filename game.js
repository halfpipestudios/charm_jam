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

    boss : null,
    player : null,

    ui : null,

}

function InitGlobals() {
    g.shader.Initialize(basicVertexShaderSrc, basicFragmentShaderSrc);

    g.soundManager.AddSound("cave", "./assets/sound.wav", true);
    g.soundManager.AddSound("shoot", "./assets/Spell_01.wav", false);
    g.soundManager.AddSound("hit", "./assets/Trap_00.wav", false);

    g.player = new Player(new Vec2(320, 60), new Pistol);
    g.boss = new Boss();

    g.ui = new Ui();
}

class Game {
    Initialize() {

        InitGlobals();

        let canvas = document.getElementById("glcanvas");
        var clientRect = canvas.getBoundingClientRect();

        let identity = new Mat4;
        let ortho = Mat4Orthographic(0, clientRect.right - clientRect.left, 0, clientRect.bottom - clientRect.top, 0, -100.0);

        g.shader.Bind();
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("Model"), false, identity.m);
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("View"), false, identity.m);
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("Proj"), false, ortho.m);
    }

    Update(deltaTime) {
        g.player.Update(deltaTime);
        g.boss.Update(deltaTime);
        g.ui.Update(deltaTime);
    }

    Render() {
        g.player.Render(g.shader);
        g.boss.Render();
        g.ui.Render();
    }

}