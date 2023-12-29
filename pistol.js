class Bullet {
    constructor(pos) {
        this.pos = pos;
        this.vel = new Vec2(0, 0);
        this.sprite = new Sprite(this.pos, 10, 10, new Vec4(1, 1, 1, 1));
        this.firstCollision = true;
        
        this.damage = 10;
    
    }

    ProcessSnakeBossCollision(dt) {
        let ray = new Ray(this.pos, Vec2Normalize(this.vel));
        for(let i = 0; i < g.snakeBoss.nodes.length; ++i) {
            let pos = g.snakeBoss.nodes[i].pos;
            let sprite = g.snakeBoss.sprite;
            let min = Vec2Sub(pos, new Vec2(sprite.w/2, sprite.h/2));
            let max = Vec2Add(pos, new Vec2(sprite.w/2, sprite.h/2));
            let aabb = new AABB(min, max);

            let t = IntersectRayAABB(ray, aabb);
            let d = Vec2MulScalar(this.vel, dt);
            if(t >= 0 && t*t < Vec2Dot(d, d)) {
                this.sprite.color = new Vec4(1, 0, 0, 1);
                let randX = (Math.random() * 2.0 - 1) * 200.0;
                let randY = (Math.random() * 2.0 - 1) * 200.0;
                this.vel = new Vec2(randX, randY);
                if(this.firstCollision) {
                    g.snakeBoss.nodes[i].life--;
                    if(g.snakeBoss.nodes[i].life < 0) {
                        g.snakeBoss.nodes[i].life = 0;
                    }
                    this.firstCollision = false;
                }
            }

        }
    }

    ProcessBossCollision(dt) {
        // boss collision            
        let ray = new Ray(this.pos, Vec2Normalize(this.vel));

        let t = IntersectRayAABB(ray, g.boss.sprite.GetAABB());
        let d = Vec2MulScalar(this.vel, dt);
        if(t >= 0 && t*t < Vec2Dot(d, d)) {
            this.sprite.color = new Vec4(1, 0, 0, 1);
            let randX = (Math.random() * 2.0 - 1) * 200.0;
            let randY = (Math.random() * 2.0 - 1) * 200.0;
            this.vel = new Vec2(randX, randY);
            
            if(this.firstCollision) {
                this.firstCollision = false;
            }
            
        }

        // saw collision
        for(let i = 0; i < g.boss.saws.length; ++i) {
            let saw = g.boss.saws[i];

            let ray = new Ray(this.pos, Vec2Normalize(this.vel));
            let t = IntersectRayAABB(ray, saw.sprite.GetAABB());
            let d = Vec2MulScalar(this.vel, dt);
            if(t >= 0 && t*t < Vec2Dot(d, d)) {
                //g.soundManager.GetSound("hit").Stop();
                //g.soundManager.GetSound("hit").Play();
                this.sprite.color = new Vec4(1, 0, 0, 1);
                let randX = (Math.random() * 2.0 - 1) * 200.0;
                let randY = (Math.random() * 2.0 - 1) * 200.0;
                this.vel = new Vec2(randX, randY);

                if(this.firstCollision) {
                    saw.DecreaseHealth(this.damage);
                    this.firstCollision = false;
                }
            }
        }
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
        this.bullets[this.currentBullet].pos = pos;
        this.bullets[this.currentBullet].vel = vel;
        this.bullets[this.currentBullet].sprite.color = new Vec4(0, 1, 0, 1);
        this.bullets[this.currentBullet].firstCollision = true;
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
        
            if(this.timer >= 0.2) {
                this.Shoot(pos, Vec2MulScalar(dir, 800));
                this.timer = 0.0
            } 
        }

        for(let i = 0; i < this.bulletCount; ++i) {

            switch(g.gameStateManager.GetState()) {
                case GameState.Stage1:
                    this.bullets[i].ProcessBossCollision(dt);
                    break;
                case GameState.Stage2: 
                    this.bullets[i].ProcessSnakeBossCollision(dt);
                    break;
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