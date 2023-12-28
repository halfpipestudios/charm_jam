var hero = undefined;
var enemy = undefined;
var pistol = undefined;

class Pistol {
    constructor(pos) {
        this.pos = pos;
        this.bullets = [
            new Sprite(new Vec2(0, 0), new Vec2(0, 100), 10, 10, new Vec4(0.5, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 100), 10, 10, new Vec4(0.5, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 100), 10, 10, new Vec4(0.5, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 100), 10, 10, new Vec4(0.5, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 100), 10, 10, new Vec4(0.5, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 100), 10, 10, new Vec4(0.5, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 100), 10, 10, new Vec4(0.5, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 100), 10, 10, new Vec4(0.5, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 100), 10, 10, new Vec4(0.5, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 100), 10, 10, new Vec4(0.5, 0, 1, 1))            
        ];
        this.currentBullet = 0;
        this.timer = 0.0;
    }

    Shoot(pos) {
        this.bullets[this.currentBullet].pos = pos;
        this.bullets[this.currentBullet].vel = new Vec2(0, 100);
        this.currentBullet++;
        if(this.currentBullet >= 10) {
            this.currentBullet = 0;
        }
    }

    Update(pos, dt) {
        this.timer += dt;
    
        if(KeyDown(65)) {
            /*
            if(this.timer >= 0.2) {
                this.Shoot(new Vec2(pos.x, pos.y));
                this.timer = 0.0
            } 
            */

            for(let i = 0; i < 10; ++i) {
                this.bullets[i].pos.y += 100 * dt;
            }
        }

        /*
        for(let i = 0; i < 10; ++i) {
            this.bullets[i].pos = Vec2Add(this.bullets[i].pos, Vec2MulScalar(this.bullets[i].vel, dt));
        }
        */
    }

    Render(shader) {
        for(let i = 0; i < 10; ++i) {
            this.bullets[i].Render(shader);
        }
    }

}

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

        hero = new Sprite(new Vec2(320, 60), new Vec2(0, 0), 50, 50, new Vec4(0.5, 1, 0, 1));
        enemy = new Sprite(new Vec2(320, 400), new Vec2(0, 0), 200, 100, new Vec4(1.0, 0.5, 0, 1));
        pistol = new Pistol(hero.pos);

        this.basicShader.Bind();
        let identity = new Mat4;
        gl.uniformMatrix4fv(this.basicShader.GetUniformLocation("Model"), false, identity.m);
        gl.uniformMatrix4fv(this.basicShader.GetUniformLocation("View"), false, identity.m);

        let ortho = Mat4Orthographic(0, 640, 0, 480, 0, -100.0);
        gl.uniformMatrix4fv(this.basicShader.GetUniformLocation("Proj"), false, ortho.m);
    }

    Update(deltaTime) {

        if(KeyDown(KeyCode.KEY_LEFT)) {
            hero.pos.x -= 100 * deltaTime;
        }

        if(KeyDown(KeyCode.KEY_RIGHT)) {
            hero.pos.x += 100 * deltaTime;
        }

        if(KeyDown(KeyCode.KEY_UP)) {
            hero.pos.y += 100 * deltaTime;
        }

        if(KeyDown(KeyCode.KEY_DOWN)) {
            hero.pos.y -= 100 * deltaTime;
        }

        hero.Update(deltaTime);
        enemy.Update(deltaTime);
        pistol.Update(hero.pos, deltaTime);
    }

    Render() {
        hero.Render(this.basicShader);
        enemy.Render(this.basicShader);
        pistol.Render(this.basicShader);
    }

}