
const SawState = {
    Idle:      "idle",
    Shoting:   "shoting",
    Returning: "returning",
}

class Saw {

    constructor(parent, offset) {

        this.parent = parent;
        this.offset = offset;
        
        this.start = Vec2Add(this.parent.pos, this.offset);
        this.end = new Vec2;
        
        this.pos = this.start;

        this.speed = 0;
        this.enableTime = 0;
        this.currentTime = 0;

        this.hitOnce = false;

        this.state = SawState.Idle;

        this.sprite = new Sprite(this.pos,32, 32, new Vec4(0.7, 0.3, 0, 1));
        
    }

    Shot(target, speed) {
        if(speed < 0.001) return;

        if(this.state != SawState.Idle) return; 
        this.state = SawState.Shoting;
        
        this.speed = speed;
        this.end.x = target.x;
        this.end.y = target.y;
        
        this.currentTime = 0;
        this.enableTime = Vec2Sub(this.end, this.start).length() / this.speed;
    }

    Update(dt) {
        
        this.start = Vec2Add(this.parent.pos, this.offset);

        switch(this.state) {
            case SawState.Idle:
                this.ProcessIdleState(dt);
                break;
            case SawState.Shoting:
                this.ProcessShottingState(dt);
                break;
            case SawState.Returning:
                this.ProcessReturningState(dt);
                break;
        }

        this.sprite.pos = this.pos;
        this.sprite.Update();

    }

    Render() {
        this.sprite.Render(g.shader);
    }
    
    ProcessIdleState(dt) {
        this.pos = this.start;

        let hero = g.hero;
        //if(!this.hitOnce && TestCircleAABB(this.GetCircle(), hero.GetAABB())) {   
            // TODO: reduce hero health!!!!
        //    this.hitOnce = true;
        //}

    }

    ProcessShottingState(dt) {

        if(this.currentTime > this.enableTime) {
            this.currentTime = 0;
            this.enableTime = 0;
            this.end = this.pos;
            this.state = SawState.Returning;
            return;
        }
        
        let dir = Vec2Normalize(Vec2Sub(this.end, this.start));
        this.pos = Vec2Add(this.start, Vec2MulScalar(dir, this.speed * this.currentTime));
        this.currentTime += dt;

        let hero = g.hero;
        //if(!hitOnce && TestCircleAABB(this.GetCircle(), hero.GetAABB())) {   
            // TODO: reduce hero health!!!!
        //    this.hitOnce = true;
        //}
    }

    ProcessReturningState(dt) {
        
        if(this.currentTime >= 1) {
            this.currentTime = 0;
            this.hitOnce = false;
            this.state = SawState.Idle;
            return;
        }

        let dir = Vec2Sub(this.start, this.end);
        this.pos = Vec2Add(this.end, Vec2MulScalar(dir, this.EaseInOutQuad(this.currentTime)));
        this.currentTime += dt * 1;

    }

    EaseInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    CalculateTragetFromPlayer(dt) {
        let result = Vec2;
        result = g.player.pos;
        return result;
    }


}