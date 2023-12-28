class Bullet {
    constructor(pos) {
        this.pos = pos;
        this.vel = new Vec2(0, 0);
        this.sprite = new Sprite(this.pos, 10, 10, new Vec4(1, 1, 1, 1));
    }

    Update(dt) {
        this.sprite.pos = this.pos;
        this.sprite.Update(dt);
    } 
    
    Render(shader) {
        this.sprite.Render(shader);
    }

}

class Pistol {
    
    bullets = [];
    constructor() {
        this.pos = new Vec2(0, 0);
        this.bulletCount = 50;
        this.currentBullet = 0;
        this.timer = 0.0;
        for(let i = 0; i < this.bulletCount; ++i) {
            this.bullets[i] = new Bullet(this.pos);
        }
    }

    Shoot(pos, vel) {
        g.soundManager.GetSound("shoot").Stop();
        g.soundManager.GetSound("shoot").Play();
        this.bullets[this.currentBullet].pos = pos;
        this.bullets[this.currentBullet].vel = vel;
        this.bullets[this.currentBullet].sprite.color = new Vec4(0, 1, 0, 1);
        this.currentBullet++;
        if(this.currentBullet >= this.bulletCount) {
            this.currentBullet = 0;
        }
    }

    Update(pos, dir, dt) {
        this.timer += dt;
    
        if(KeyDown(KeyCode.KEY_UP) ||
           KeyDown(KeyCode.KEY_DOWN) ||
           KeyDown(KeyCode.KEY_LEFT) ||
           KeyDown(KeyCode.KEY_RIGHT)) {
        
            if(this.timer >= 0.1) {
                this.Shoot(pos, Vec2MulScalar(dir, 800));
                this.timer = 0.0
            } 
        }

        for(let i = 0; i < this.bulletCount; ++i) {

            // collision test
            let aabb = new AABB(new Vec2(220, 350), new Vec2(420, 450));
            let ray = new Ray(this.bullets[i].pos, Vec2Normalize(this.bullets[i].vel));
            let t = IntersectRayAABB(ray, aabb);
            let d = Vec2MulScalar(this.bullets[i].vel, dt);
            if(t >= 0 && t*t < Vec2Dot(d, d)) {
                g.soundManager.GetSound("hit").Stop();
                g.soundManager.GetSound("hit").Play();
                this.bullets[i].sprite.color = new Vec4(1, 0, 0, 1);
                let randX = Math.random() * 2.0 - 1;
                let randY = Math.random() * 2.0 - 1;
                this.bullets[i].vel = Vec2MulScalar(this.bullets[i].vel, -0.2);
            }

            this.bullets[i].pos = Vec2Add(this.bullets[i].pos, Vec2MulScalar(this.bullets[i].vel, dt));
            this.bullets[i].Update(dt);
        }
        
    }

    Render(shader) {
        for(let i = 0; i < this.bulletCount; ++i) {
            this.bullets[i].Render(shader);
        }
    }

}