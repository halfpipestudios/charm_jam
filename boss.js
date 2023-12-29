class Boss {
    
    constructor() {
        
        this.pos = new Vec2(1280/2, 580);
        this.radius = 48;
        this.sprite = new Sprite(this.pos, this.radius*2, this.radius*2, c.gray2);

        let sawRadius = 32;
        let padding = 28;
        this.saws = [new Saw(this, sawRadius, new Vec2(this.radius+sawRadius*1+padding*1, 0)),
                     new Saw(this, sawRadius, new Vec2(this.radius+sawRadius*3+padding*2, 0)),
                     new Saw(this, sawRadius, new Vec2(this.radius+sawRadius*5+padding*3, 0)),
                     new Saw(this, sawRadius, new Vec2(this.radius+sawRadius*7+padding*4, 0)),

                     new Saw(this, sawRadius, new Vec2(-(this.radius+sawRadius*1+padding*1), 0)),
                     new Saw(this, sawRadius, new Vec2(-(this.radius+sawRadius*3+padding*2), 0)),
                     new Saw(this, sawRadius, new Vec2(-(this.radius+sawRadius*5+padding*3), 0)),
                     new Saw(this, sawRadius, new Vec2(-(this.radius+sawRadius*7+padding*4), 0))];
    

        this.minShotSpeed = 600;
        this.maxShotSpeed = 700;
        this.minTimeBetweenShots = 2.0;
        this.currentTime = 0;  
        
        this.timer = 0;
    }

    Reset() {
        let sawRadius = 32;
        let padding = 28;
        
        this.pos = new Vec2(1280/2, 580);
        this.saws = [new Saw(this, sawRadius, new Vec2(this.radius+sawRadius*1+padding*1, 0)),
            new Saw(this, sawRadius, new Vec2(this.radius+sawRadius*3+padding*2, 0)),
            new Saw(this, sawRadius, new Vec2(this.radius+sawRadius*5+padding*3, 0)),
            new Saw(this, sawRadius, new Vec2(this.radius+sawRadius*7+padding*4, 0)),

            new Saw(this, sawRadius, new Vec2(-(this.radius+sawRadius*1+padding*1), 0)),
            new Saw(this, sawRadius, new Vec2(-(this.radius+sawRadius*3+padding*2), 0)),
            new Saw(this, sawRadius, new Vec2(-(this.radius+sawRadius*5+padding*3), 0)),
            new Saw(this, sawRadius, new Vec2(-(this.radius+sawRadius*7+padding*4), 0))];
        
        //for(let i = 0; i < this.saws.length; ++i) {
        //    this.saws[i].Reset();
        //}
    }

    Update(dt) {

        this.timer += dt*0.5;

        let xOffset = Math.cos(this.timer) * 300;
        let yOffset = Math.sin (this.timer) * 100;

        this.pos = new Vec2(1280/2 + xOffset, 720*(3/4) + yOffset);
        
        if(this.currentTime >= this.minTimeBetweenShots) {
            let index = this.FindSawToShot();
            if(index > -1) {
                let rspeed = Math.random() * (this.maxShotSpeed - this.minShotSpeed) + this.minShotSpeed;
                let target = this.saws[index].CalculateTragetFromPlayer();
                this.saws[index].Shot(target, rspeed);
                this.currentTime = 0;
            }

            this.currentTime = 0;
        }

        this.currentTime += dt;

        for(let i = 0; i < this.saws.length; ++i) {
            this.saws[i].Update(dt);
        }

        this.sprite.pos = this.pos;
        this.sprite.Update();

    }

    Render() {
        
        this.sprite.Render(g.shader);

        for(let i = 0; i < this.saws.length; ++i) {
            this.saws[i].Render();
        }
    }

    FindSawToShot() {
        let count = 0;
        let index = Math.floor(Math.random() * this.saws.length);
        while(this.saws[index].state != SawState.Idle || this.saws[index].charming == true) {
            if(count == 4) return -1;
            index = (index + 1) % this.saws.length;
            count += 1;
        }

        return index;
    }

}