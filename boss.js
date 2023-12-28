class Boss {
    
    constructor() {
        
        this.pos = new Vec2(1280/2, 580);
        this.sprite = new Sprite(this.pos, 32, 32, new Vec4(1, 0, 0, 1));

        this.saws = [new Saw(this, new Vec2(-160, 0)),
                     new Saw(this, new Vec2(-128, 0)),
                     new Saw(this, new Vec2(-96, 0)),
                     new Saw(this, new Vec2(-64, 0)),
                     new Saw(this, new Vec2( 64, 0)),
                     new Saw(this, new Vec2( 96, 0)),
                     new Saw(this, new Vec2( 128, 0)),
                     new Saw(this, new Vec2( 160, 0))];
    

        this.minShotSpeed = 700;
        this.maxShotSpeed = 800;
        this.minTimeBetweenShots = 0.6;
        this.currentTime = 0;  
        
        this.timer = 0;
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
        while(this.saws[index].state != SawState.Idle) {
            if(count == 4) return -1;
            index = (index + 1) % this.saws.length;
            count += 1;
        }

        if(index < 0) return 0;
        if(index >=this.saws.length) return this.saws.length - 1;

        return index;
    }

}