var sprite = undefined;

class Game {

    soundManager = undefined;
    basicShader = undefined;

    Initialize() {
        this.soundManager = new SoundManager;

        this.basicShader = new Shader;
        this.basicShader.Initialize(basicVertexShaderSrc, basicFragmentShaderSrc);

        this.soundManager.AddSound("cave", "./assets/sound.wav", true);

        let a = new Vec2(2, 2);
        let b = new Vec2(1, 2);

        let c = Vec2Sub(a, b);

        console.log(c);

        sprite = new Sprite(new Vec2(55, 50), new Vec2(0, 0), 100, 100, null);

        this.basicShader.Bind();
        let identity = new Mat4;
        gl.uniformMatrix4fv(this.basicShader.GetUniformLocation("Model"), false, identity.m);
        gl.uniformMatrix4fv(this.basicShader.GetUniformLocation("View"), false, identity.m);

        let ortho = Mat4Orthographic(0, 640, 0, 480, 0, -100.0);
        gl.uniformMatrix4fv(this.basicShader.GetUniformLocation("Proj"), false, ortho.m);

    }

    Update(deltaTime) {

        if(KeyDown(KeyCode.KEY_LEFT)) {
            sprite.pos.x -= 100 * deltaTime;
        }

        if(KeyDown(KeyCode.KEY_RIGHT)) {
            sprite.pos.x += 100 * deltaTime;
        }

        if(KeyDown(KeyCode.KEY_UP)) {
            sprite.pos.y += 100 * deltaTime;
        }

        if(KeyDown(KeyCode.KEY_DOWN)) {
            sprite.pos.y -= 100 * deltaTime;
        }

        if(KeyJustDown(65)) {
            console.log("Key A down");
            this.soundManager.GetSound("cave").Play();
        }

        sprite.Update(deltaTime);
    }

    Render() {
        sprite.Render(this.basicShader);
    }

}