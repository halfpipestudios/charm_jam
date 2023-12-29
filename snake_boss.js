const SnakeBossState = {
    Attack: "attack",
    PrepareAttack: "prepareAttack",
    Rest: "rest",
    Seek: "seek"
}

class SnakeBoss {

    nodes = [];

    constructor(pos) {
        this.pos = new Vec2(pos.x, pos.y);
        this.orientation = 0;
        this.linVel = 0;
        this.angVel = 0;
        
        this.maxAngVel = 3*Math.PI;
        this.maxAcc = 800;
        this.timeToTarget = 0.5;

        this.nodeCount = 50;
        this.nodeDistance = 30;
        this.sprite = new Sprite(this.pos, 50, 50, new Vec4(1, 1, 0, 1));

        this.state = SnakeBossState.Rest;
        this.timer = 0;
        

        let currentPos = pos;
        for(let i = 0; i < this.nodeCount; ++i) {
            this.nodes[i] = new Vec2(currentPos.x, currentPos.y);
            currentPos.y += this.nodeDistance;
        }
    }

    Update(target, dt) {
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

    ProcessDamageToPlayer(dt) {
        for(let i = 0; i < this.nodes.length; ++i) {
            let pos = this.nodes[i];
            let sprite = this.sprite;
            let min = Vec2Sub(pos, new Vec2(sprite.w/2, sprite.h/2));
            let max = Vec2Add(pos, new Vec2(sprite.w/2, sprite.h/2));
            let aabb = new AABB(min, max);

            if(TestAABBAABB(aabb, g.player.sprite.GetAABB())) {   
                g.player.DecreaseHealth(1);
            }

        }
    }

    Render(shader) {
        for(let i = 0; i < this.nodeCount; ++i) {
            let pos = this.nodes[i];
            this.sprite.pos = pos;
            this.sprite.Update(0.016);
            this.sprite.Render(shader);
        }
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
        this.nodes[0] = this.pos;
        for(let i = 1; i < this.nodeCount; ++i) {
            let toMe = Vec2Sub(this.nodes[i], this.nodes[i - 1]);
            let sqDist = Vec2Dot(toMe, toMe);
            let newPos = Vec2Add(this.nodes[i - 1], Vec2MulScalar(Vec2Normalize(toMe), this.nodeDistance));
            this.nodes[i] = newPos;
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