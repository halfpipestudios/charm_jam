class Player {

    constructor(pos, weapon) {
        this.pos = pos;
        this.vel = new Vec2(0, 0);
        this.orientation = 0;
        this.radius = 25;
        this.sprite = new Sprite(this.pos, 50, 50, c.white);
        this.weapon = weapon;

        this.lastFaceDir = new Vec2(1, 0);
        this.head = new Sprite(this.pos, 25, 25, c.white);

        this.health = 4;
        this.maxHealth = 4;

        this.damageAnimationEnable      = false;
        this.damageAnimationDuration    = 0.8;
        this.damageAnimationCurrentTime = 0;
        this.dameAnimationSrcColor      = c.white;
        this.dameAnimationDesColor      = c.red;

        this.deathAnimationEnable = false;
        this.deathAnimationDuration = 8;
        this.deathAnimationCurrentTime = 0;
        this.deathAnimationTimer = 0;

    }

    Reset() {
        this.health = 4;
        this.pos = new Vec2(g.window_w/2, g.window_h/2);
        this.sprite.color = c.white;
        this.damageAnimationEnable = false;
        this.deathAnimationEnable = false;
        this.deathAnimationTimer = 0;
    }

    PlayerHitWall(aabb, normal, dt) {
        let ray = new Ray(this.pos, Vec2Normalize(this.vel));
        let t = IntersectRayAABB(ray, aabb);
        let d = Vec2MulScalar(this.vel, dt);
        if(t >= 0 && t*t < Vec2Dot(d, d)) {
            this.vel = Vec2Sub(this.vel, Vec2MulScalar(normal, Vec2Dot(normal, this.vel)));
        }
    }

    ProcessPlayerWallCollisions(dt) {
        // left wall
        let min = new Vec2(-10, -10);
        let max = new Vec2(10, g.window_h + 10);
        let aabb = new AABB(min, max);
        this.PlayerHitWall(aabb, new Vec2(1, 0, 0), dt);
        // right wall
        min = new Vec2(g.window_w-10, -10);
        max = new Vec2(g.window_w+10, g.window_h + 10);
        aabb = new AABB(min, max);
        this.PlayerHitWall(aabb, new Vec2(-1, 0, 0), dt);
        // top wall
        min = new Vec2(-10, g.window_h-10);
        max = new Vec2(g.window_w+10, g.window_h + 10);
        aabb = new AABB(min, max);
        this.PlayerHitWall(aabb, new Vec2(0, -1, 0), dt);
        // bottom wall
        min = new Vec2(-10, -10);
        max = new Vec2(g.window_w+10, 10);
        aabb = new AABB(min, max);
        this.PlayerHitWall(aabb, new Vec2(0, -1, 0), dt);
    }

    Update(dt) {

        let faceDir = new Vec2(0, 0);
        if(KeyDown(KeyCode.KEY_UP)) {
            faceDir.y = 1;
        }
        if(KeyDown(KeyCode.KEY_DOWN)) {
            faceDir.y = -1;
        }
        if(KeyDown(KeyCode.KEY_LEFT)) {
            faceDir.x = -1;
        }
        if(KeyDown(KeyCode.KEY_RIGHT)) {
            faceDir.x = 1;
        }

        if(Vec2Dot(faceDir, faceDir) <= 0.0) {
            faceDir = this.lastFaceDir;
        }

        let acc = new Vec2(0, 0);
        if(KeyDown(KeyCode.KEY_D)) {
            acc.x += 1;
        }
        if(KeyDown(KeyCode.KEY_A)) {
            acc.x -= 1;
        }
        if(KeyDown(KeyCode.KEY_W)) {
            acc.y += 1;
        }
        if(KeyDown(KeyCode.KEY_S)) {
            acc.y -= 1;
        }

        if(Vec2Dot(acc, acc) > 0.0) {
            acc = Vec2MulScalar(Vec2Normalize(acc), 1600);
        }

        if(this.deathAnimationEnable) {
             acc = new Vec2(0, 0);

            if(this.deathAnimationTimer === 0) {
                g.camera.ScreenShake();
            }

            this.deathAnimationTimer += dt;
            if(this.deathAnimationTimer >= 0.05) {
                this.deathAnimationTimer = 0;
            }
            
        }

        let currentOrientation = this.orientation;
        let targetOrientation = Vec2ToAngle(faceDir);
        let angularDist = targetOrientation - currentOrientation;
        angularDist = AdjustAngle(angularDist);
        let angVel = angularDist / 0.1;

        this.orientation += angVel * dt;

        let dir = new Vec2(Math.cos(this.orientation), Math.sin(this.orientation));

        this.vel = Vec2Add(this.vel, Vec2MulScalar(acc, dt));
        
        this.ProcessPlayerWallCollisions(dt);

        this.pos = Vec2Add(this.pos, Vec2MulScalar(this.vel, dt));

        this.PlayerCachFile();

        let damping = Math.pow(0.003, dt);
        this.vel = Vec2MulScalar(this.vel, damping);

        

        this.head.pos = Vec2Add(this.pos, Vec2MulScalar(dir, 25));
        this.head.rotation = -this.orientation;
        
        this.sprite.pos = this.pos;
        this.sprite.Update(dt);
        this.head.Update(dt);

        if(!this.deathAnimationEnable) {
            this.weapon.Update(this.pos, dir, dt);
        }
        
        this.lastFaceDir = faceDir;

        this.UpdateDamageAnimation(dt);
        this.UpdateDeathAnimation(dt);

    }

    Render(shader) {
        
        this.weapon.Render(shader);

        g.textureManager.BindTexture("pinguino");
        this.sprite.Render(shader);
        g.textureManager.BindTexture("gun");
        this.head.Render(shader);
    }

    PlayerCachFile() {
        if(TestCircleCircle(g.life.circle, this.GetCircle()) && g.life.active === true) {
            g.life.active = false;
            this.health++;
            if(this.health > this.maxHealth) {
                this.health = this.maxHealth;
            }
        }
    }

    DecreaseHealth(amount) {
        
        if(this.damageAnimationEnable) return;
        if(this.deathAnimationEnable) return;

        this.health = Math.max(this.health - amount, 0);
        this.PlayDamageAnimation();
        g.camera.ScreenShake();

        if(this.health == 0) {
            this.PlayDeathAnimation();
        }
    }

    PlayDamageAnimation()  {
        this.damageAnimationEnable = true;
        this.damageAnimationCurrentTime = 0;
    }

    UpdateDamageAnimation(dt) {
        if(!this.damageAnimationEnable) return;

        if(this.damageAnimationCurrentTime > this.damageAnimationDuration) {
            this.sprite.color = this.dameAnimationSrcColor;
            this.damageAnimationEnable = false;
            return;
        }

        let t = (Math.sin(this.damageAnimationCurrentTime * 100) + 1) / 2;
        this.sprite.color = Vec4Lerp(this.dameAnimationSrcColor, this.dameAnimationDesColor, t);
        this.damageAnimationCurrentTime += dt;
    }

    PlayDeathAnimation() {
        this.deathAnimationEnable = true;
        this.deathAnimationCurrentTime = 0;
        this.sprite.PlayDamageAnimation(this.deathAnimationDuration, c.red, 10);
    }

    UpdateDeathAnimation(dt) {
        if(!this.deathAnimationEnable) return;

        if(this.deathAnimationCurrentTime > this.deathAnimationDuration) {
            this.deathAnimationEnable = false;
            g.gameStateManager.SetState(GameState.Menu, null);
        }

        this.deathAnimationCurrentTime += dt;
    }

    GetCircle() {
        let circle = new Circle(this.pos, this.radius);
        return circle;
    }

}