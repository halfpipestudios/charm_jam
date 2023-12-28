var g = {

    shader : new Shader(),
    soundManager : new SoundManager(),

    boss : new Boss(),
    
    player : null,
    enemy : null

}

function InitGlobals() {
    g.shader.Initialize(basicVertexShaderSrc, basicFragmentShaderSrc);

    g.soundManager.AddSound("cave", "./assets/sound.wav", true);
    g.soundManager.AddSound("shoot", "./assets/Spell_01.wav", false);
    g.soundManager.AddSound("hit", "./assets/Trap_00.wav", false);

    g.player = new Player(new Vec2(320, 60), new Pistol);
    g.enemy = new Sprite(new Vec2(320, 400), 200, 100, new Vec4(1.0, 0.5, 0, 1));
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
        g.enemy.Update(deltaTime);

        g.boss.Update(deltaTime);

    }

    Render() {
        g.enemy.Render(g.shader);
        g.player.Render(g.shader);

        g.boss.Render();
    }

}