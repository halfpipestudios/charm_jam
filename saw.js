
const SawState = {
    Idle:      "idle",
    Shoting:   "shoting",
    Returning: "returning",
}

class Saw {

    constructor(pos) {

        this.pos = pos;
        
        this.start = pos;
        this.end = Vec2;

        this.speed = 0;
        this.enableTime = 0;
        this.currentTime = 0;

        this.state = SawState.Idle;
        
    }

    Shot(target, speed) {
        if(this.state != SawState.Idle) return; 
        this.state = SawState.Shotting;
        
        if(speed < 0.001) return;

        this.speed = speed;
        
        this.start = pos;
        this.end = target;
        
        this.currentTime = 0;
        this.enableTime = Vec2Sub(this.end, this.start).length() / this.speed;
        this.enable = true;
    }

    Update(dt) {

        switch(this.state) {
            case SawState.Idle:
                ProcessIdleState();
                break;
            case SawState.Shotting:
                ProcessShottingState();
                break;
            case SawState.Returning:
                ProcessReturningState();
                break;
        }

    }

    Render() {
        
    }
    
    ProcessIdleState() {
        // NOTE: When the saw is idle there is no need to update the position
    }

    ProcessShottingState() {

        if(this.currentTime > this.enableTime) {
            this.currentTime = 0;
            this.enableTime = 0;
            this.state = SawState.Returning;
            return;
        }
        
        let dir = Vec2Normalize(Vec2Sub(this.end, this.start));
        this.pos = Vec2Add(this.start, Vec2MulScalar(dir, this.speed * this.currentTime));
        this.currentTime += dt;
    }

    ProcessReturningState() {
        
        if(currentTime >= 1) {
            this.currentTime = 0;
            this.enableTime = 0;
            this.state = SawState.Idle;
            return;
        }

        let dir = Vec2Sub(this.start, this.end);
        this.pos = Vec2Add(this.start, Vec2MulScalar(dir, this.speed * this.currentTime));
        this.currentTime += dt;

    }

}
