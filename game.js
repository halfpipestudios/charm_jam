var hero = undefined;
var enemy = undefined;

class Game {
    basicShader = undefined;

    Initialize() {

        let canvas = document.getElementById("glcanvas");
        var clientRect = canvas.getBoundingClientRect();

        soundManager = new SoundManager;

        this.basicShader = new Shader;
        this.basicShader.Initialize(basicVertexShaderSrc, basicFragmentShaderSrc);

        soundManager.AddSound("cave", "./assets/sound.wav", true);
        soundManager.AddSound("shoot", "./assets/Spell_01.wav", false);
        soundManager.AddSound("hit", "./assets/Trap_00.wav", false);

        hero = new Player(new Vec2(320, 60), new Pistol);
        enemy = new Sprite(new Vec2(320, 400), 200, 100, new Vec4(1.0, 0.5, 0, 1));

        this.basicShader.Bind();
        let identity = new Mat4;
        gl.uniformMatrix4fv(this.basicShader.GetUniformLocation("Model"), false, identity.m);
        gl.uniformMatrix4fv(this.basicShader.GetUniformLocation("View"), false, identity.m);

        let ortho = Mat4Orthographic(0, clientRect.right - clientRect.left, 0, clientRect.bottom - clientRect.top, 0, -100.0);
        gl.uniformMatrix4fv(this.basicShader.GetUniformLocation("Proj"), false, ortho.m);
    }

    Update(deltaTime) {
        hero.Update(deltaTime);
        enemy.Update(deltaTime);
    }

    Render() {
        enemy.Render(this.basicShader);
        hero.Render(this.basicShader);
    }

}