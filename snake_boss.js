const SnakeBossState = {
    Attack: "attack",
    PrepareAttack: "prepareAttack",
    Rest: "rest",
    Seek: "seek"
}

class SnakeBoss {

    

    constructor() {
        let scale = 1.5;

        this.nodes = [];
        this.nodeCount = 30;
        this.nodeDistance = 35 * scale;

        this.Reset();
        
        this.maxAngVel = 3*Math.PI;
        this.maxAcc = 800;
        this.timeToTarget = 0.5;
        let w = 50 * scale;
        this.sprite = new Sprite(this.pos, w, w, c.white);

        this.state = SnakeBossState.Rest;
        this.timer = 0;

    }

    Update(target, dt) {

        let snakeWasKill = 0;
        for(let i = 0; i < this.nodeCount; ++i) {
            if(g.snakeBoss.nodes[i].life == 0 && g.snakeBoss.nodes[i].alive) {
                g.snakeBoss.nodes[i].color = c.green;
                g.snakeBoss.nodes[i].alive = false;
            }
            if(!g.snakeBoss.nodes[i].life) {
                snakeWasKill++;
            }
        }

        if(snakeWasKill === this.nodeCount) {
            g.gameStateManager.PopState();
        }
 
        let tar = new Vec2(target.x, target.y);
        switch(this.state) {
            case SnakeBossState.Attack:
                this.ProcessSnakeAttackState(tar, dt);
                break;
            case SnakeBossState.PrepareAttack:
                this.ProcessSnakePrepareAttackState(tar, dt);
                break;
            case SnakeBossState.Rest:
                this.ProcessSnakeRestState(tar, dt);
                break;
            case SnakeBossState.Seek:
                this.ProcessSnakeSeekState(tar, dt);
                break;
        }
        this.ProcessSnakeBody();
        this.ProcessDamageToPlayer(dt);

        this.timer += dt;
    }

    Reset() {
        this.nodes = [];
        this.pos = new Vec2(1280/2, 720)
        this.orientation = 0;
        this.linVel = 0;
        this.angVel = 0;
        let currentPos = new Vec2(this.pos.x, this.pos.y);
        for(let i = 0; i < this.nodeCount; ++i) {
            this.nodes.push({
                 pos: new Vec2(currentPos.x, currentPos.y),
                 orientation: 0,
                 color: c.white,
                 life: 3,
                 alive: true});
            currentPos.y += this.nodeDistance;
        }
        let stop = 0;
    }

    ProcessDamageToPlayer(dt) {
        for(let i = 0; i < this.nodes.length; ++i) {
            if(this.nodes[i].alive || i == 0) {
                let pos = this.nodes[i].pos;
                let sprite = this.sprite;
                let circle = new Circle(pos, sprite.w*0.45);
                if(TestCircleCircle(circle, g.player.GetCircle())) {   
                    g.player.DecreaseHealth(1);
                }
            }
        }
    }

    Render(shader) {

        let ogW = this.sprite.w;
        let ogH = this.sprite.h;

        g.textureManager.BindTexture("snake_bad_tail");
        this.sprite.pos = this.nodes[this.nodeCount - 1].pos;
        this.sprite.rotation = -(this.nodes[this.nodeCount - 1].orientation + Math.PI/2);
        this.sprite.color = this.nodes[this.nodeCount - 1].color;
        this.sprite.w = ogW * 1.4;
        this.sprite.h = ogH * 1.4;
        this.sprite.Update(0.016);
        this.sprite.Render(shader);

        g.textureManager.BindTexture("snake_bad_body");
        for(let i = this.nodeCount - 2; i >= 1; --i) {
            this.sprite.pos = this.nodes[i].pos;
            this.sprite.rotation = -(this.nodes[i].orientation + Math.PI/2);
            this.sprite.color = this.nodes[i].color;
            this.sprite.w = ogW;
            this.sprite.h = ogH;
            this.sprite.Update(0.016);
            this.sprite.Render(shader);
        }

        g.textureManager.BindTexture("snake_bad_head");
        this.sprite.pos = this.nodes[0].pos;
        this.sprite.rotation = -(this.nodes[0].orientation + Math.PI/2);
        this.sprite.color = this.nodes[0].color;
        this.sprite.w = ogW * 1.6;
        this.sprite.h = ogH * 1.6;
        this.sprite.Update(0.016);
        this.sprite.Render(shader);

        this.sprite.rotation = 0;
        this.sprite.w = ogW;
        this.sprite.h = ogH;

    }

    ProcessSnakeAttackState(tar, dt) {

        let d = Vec2Sub(tar, this.pos);
        if(Vec2Dot(d, d) <= 4000) {
            this.state = SnakeBossState.Rest;
        }

        this.maxAngVel = 30*Math.PI;
        this.maxAcc = 1600;
        this.timeToTarget = 0.2;

        this.ProcessSnakeMovement(tar, dt);
    }

    ProcessSnakePrepareAttackState(tar, dt) {
        
        if(this.timer >= 4.0) {
            this.state = SnakeBossState.Attack;
            this.timer = 0;
        }

        this.maxAngVel = 3*Math.PI;
        this.maxAcc = 800;
        this.timeToTarget = 0.3;
        tar = new Vec2(10000, 10000);
        this.ProcessSnakeMovement(tar, dt);
    }

    ProcessSnakeRestState(tar, dt) {

        if(this.timer >= 8.0) {
            let rand = Math.floor(Math.random() * 3);
            if(rand % 2 == 0) {
                this.state = SnakeBossState.Seek;
            }
            else
            {
                this.state = SnakeBossState.PrepareAttack;
            }
            this.timer = 0;
        }

        this.maxAngVel = 3*Math.PI;
        this.maxAcc = 800;
        this.timeToTarget = 2.0;
        this.ProcessSnakeMovement(tar, dt);
    }

    ProcessSnakeSeekState(tar, dt) {

        if(this.timer >= 8.0) {
            this.state = SnakeBossState.Rest;
            this.timer = 0;
        }

        this.maxAngVel = 3*Math.PI;
        this.maxAcc = 800;
        this.timeToTarget = 0.5;
        this.ProcessSnakeMovement(tar, dt);
    }


    ProcessSnakeBody() {
        this.nodes[0].pos = this.pos;
        this.nodes[0].orientation = this.orientation;
        for(let i = 1; i < this.nodeCount; ++i) {
            let toMe = Vec2Sub(this.nodes[i].pos, this.nodes[i - 1].pos);
            let sqDist = Vec2Dot(toMe, toMe);
            let newPos = Vec2Add(this.nodes[i - 1].pos, Vec2MulScalar(Vec2Normalize(toMe), this.nodeDistance));
            this.nodes[i].pos = newPos;
            let dir = Vec2Normalize(Vec2Sub(this.nodes[i - 1].pos, this.nodes[i].pos));
            this.nodes[i].orientation = Vec2ToAngle(dir);
        }
    }

    ProcessSnakeMovement(target, dt) {
        let steering = Seek(this.pos, this.orientation, target, this.maxAngVel, this.maxAcc, this.timeToTarget);
        this.linVel += steering.linear * dt;
        this.angVel = steering.angular;
        this.orientation += this.angVel * dt;
        let dir = AngleToVec2(this.orientation);
        let vel = Vec2MulScalar(dir, this.linVel * dt);
        this.pos = Vec2Add(this.pos, vel);
        let damping = Math.pow(0.1, dt);
        this.linVel *= damping;
    }

}