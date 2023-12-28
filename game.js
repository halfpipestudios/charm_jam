var hero = undefined;
var enemy = undefined;
var pistol = undefined;

class Pistol {
    constructor(pos) {
        this.pos = pos;
        this.bullets = [
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(0.5, 1, 1, 1)),
            new Sprite(new Vec2(0, 0), new Vec2(0, 0), 10, 10, new Vec4(1, 0, 1, 1)),            
        ];
        this.currentBullet = 0;
        this.timer = 0.0;
    }

    Shoot(pos, vel) {
        this.bullets[this.currentBullet].pos = pos;
        this.bullets[this.currentBullet].vel = vel;
        this.bullets[this.currentBullet].color = new Vec4(0, 1, 0, 1);

        this.currentBullet++;
        if(this.currentBullet >= 50) {
            this.currentBullet = 0;
        }
    }

    Update(pos, dt) {
        this.timer += dt;
    
        if(MouseDown(MouseCode.MOUSE_LEFT)) {
        
            if(this.timer >= 0.02) {
                let mouseP = new Vec2(MouseX(), 480 - MouseY());
                let dir = Vec2MulScalar(Vec2Normalize(Vec2Sub(mouseP, pos)), 800.0);
                this.Shoot(new Vec2(pos.x, pos.y), dir);
                this.timer = 0.0
            } 
        }

        for(let i = 0; i < 50; ++i) {

            // collision test
            let aabb = new AABB(new Vec2(220, 350), new Vec2(420, 450));
            let ray = new Ray(this.bullets[i].pos, Vec2Normalize(this.bullets[i].vel));
            let t = IntersectRayAABB(ray, aabb);
            let d = Vec2MulScalar(this.bullets[i].vel, dt);
            if(t >= 0 && t*t < Vec2Dot(d, d)) {
                this.bullets[i].color = new Vec4(1, 0, 0, 1);
                let randX = Math.random() * 2.0 - 1;
                let randY = Math.random() * 2.0 - 1;
                this.bullets[i].vel = new Vec2(randX * 400, randY * 400);
            }

            this.bullets[i].pos = Vec2Add(this.bullets[i].pos, Vec2MulScalar(this.bullets[i].vel, dt));
            this.bullets[i].Update(dt);
        }
        
    }

    Render(shader) {
        for(let i = 0; i < 50; ++i) {
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
            hero.pos.x -= 200 * deltaTime;
        }

        if(KeyDown(KeyCode.KEY_RIGHT)) {
            hero.pos.x += 200 * deltaTime;
        }

        if(KeyDown(KeyCode.KEY_UP)) {
            hero.pos.y += 200 * deltaTime;
        }

        if(KeyDown(KeyCode.KEY_DOWN)) {
            hero.pos.y -= 200 * deltaTime;
        }

        hero.Update(deltaTime);
        enemy.Update(deltaTime);
        pistol.Update(hero.pos, deltaTime);
    }

    Render() {
        enemy.Render(this.basicShader);
        pistol.Render(this.basicShader);
        hero.Render(this.basicShader);
    }

}