class Projectile {

    constructor(pos) {
        
        this.start = pos;
        
        this.pos   = pos;
        this.dir = new Vec2(0, 0)

        this.speed = 0;
        this.enable = false;
        this.enableTime = 0;
        this.currentTime = 0;
        
    }

    Shot(target, speed) {
        if(speed < 0.001) return;

        this.speed = speed;
        this.dir = Vec2Normalize(Vec2Sub(target, this.start));
        
        this.currentTime = 0;
        this.enableTime = Vec2Sub(target, this.start).length() / this.speed;
        this.enable = true;
    }

    Update(dt) {
        if(this.enable == false) return;

        if(this.currentTime > this.enableTime) {
            this.enable = false;
            this.currentTime = 0;
            this.enableTime = 0;
            this.pos = this.start;
            return;
        }

        this.pos = Vec2Add(this.start, Vec2MulScalar(this.dir, this.speed * this.currentTime));
        this.currentTime += dt;

    }

    Render() {
        
    }

}