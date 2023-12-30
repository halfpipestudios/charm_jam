class Boss {
    
    constructor() {
        
        this.pos = new Vec2(1280/2, 580);
        let scale = 0.9;
        this.radius = 96 * scale;
        this.sprite = new Sprite(this.pos, this.radius*2, this.radius*2, c.white);

        this.sawRadius = 64 * scale;
        this.padding = 28 * scale;
        this.saws = [new Saw(this, this.sawRadius, new Vec2(this.radius+this.sawRadius*1+this.padding*1, 0)),
                     new Saw(this, this.sawRadius, new Vec2(this.radius+this.sawRadius*3+this.padding*2, 0)),
                     new Saw(this, this.sawRadius, new Vec2(this.radius+this.sawRadius*5+this.padding*3, 0)),
                     new Saw(this, this.sawRadius, new Vec2(this.radius+this.sawRadius*7+this.padding*4, 0)),

                     new Saw(this, this.sawRadius, new Vec2(-(this.radius+this.sawRadius*1+this.padding*1), 0)),
                     new Saw(this, this.sawRadius, new Vec2(-(this.radius+this.sawRadius*3+this.padding*2), 0)),
                     new Saw(this, this.sawRadius, new Vec2(-(this.radius+this.sawRadius*5+this.padding*3), 0)),
                     new Saw(this, this.sawRadius, new Vec2(-(this.radius+this.sawRadius*7+this.padding*4), 0))];
    
        this.shipContainer = [];
        for(let i = 0; i < this.saws.length; ++i) {
            let d = this.sawRadius*2+this.padding;
            this.shipContainer.push(new Sprite(this.saws[i].pos, d, d, c.white));
        }

        this.minShotSpeed = 600;
        this.maxShotSpeed = 700;
        this.minTimeBetweenShots = 1.4;
        this.currentTime = 0;  
        
        this.timer = 0;

        this.defeted = false;
        this.defetedTime = 0;
        this.defetedDuration = 8;

        this.preparingSaw = false;

    }

    Reset() {
        
        this.currentTime = 0;

        this.defeted = false;
        this.defetedTime = 0;

        this.pos = new Vec2(1280/2, 580);
        this.saws = [new Saw(this, this.sawRadius, new Vec2(this.radius+this.sawRadius*1+this.padding*1, 0)),
            new Saw(this, this.sawRadius, new Vec2(this.radius+this.sawRadius*3+this.padding*2, 0)),
            new Saw(this, this.sawRadius, new Vec2(this.radius+this.sawRadius*5+this.padding*3, 0)),
            new Saw(this, this.sawRadius, new Vec2(this.radius+this.sawRadius*7+this.padding*4, 0)),

            new Saw(this, this.sawRadius, new Vec2(-(this.radius+this.sawRadius*1+this.padding*1), 0)),
            new Saw(this, this.sawRadius, new Vec2(-(this.radius+this.sawRadius*3+this.padding*2), 0)),
            new Saw(this, this.sawRadius, new Vec2(-(this.radius+this.sawRadius*5+this.padding*3), 0)),
            new Saw(this, this.sawRadius, new Vec2(-(this.radius+this.sawRadius*7+this.padding*4), 0))];

    }

    Update(dt) {

        this.timer += dt*0.5;
  
        if(!this.defeted) {

            let xOffset = Math.cos(this.timer) * 300;
            let yOffset = Math.sin (this.timer) * 100;
    
            this.pos = new Vec2(1280/2 + xOffset, 720*(3/4) + yOffset);
  
        } else {
            let s = 20;
            let center = new Vec2(g.window_w/2, g.window_h/2);
            let dir = Vec2Normalize(Vec2Sub(center, this.pos));
            this.pos = Vec2Add(this.pos, Vec2MulScalar(dir, dt * s));
        }
        
        if(this.currentTime >= this.minTimeBetweenShots) {
            let index = this.FindSawToShot();
            if(index > -1) {
                let rspeed = Math.random() * (this.maxShotSpeed - this.minShotSpeed) + this.minShotSpeed;
                let target = this.saws[index].CalculateTragetFromPlayer();
                this.saws[index].PrepareAndShot(target, rspeed);
                this.currentTime = 0;
            }

            this.currentTime = 0;
        }

        this.currentTime += dt;

        if(this.defeted) {
            if(this.defetedTime > this.defetedDuration) {

                let nextState = {state: GameState.Stage2, onEnter: () => {
                    g.soundManager.StopSounds();
                    g.soundManager.GetSound("level2").Play();
                    g.snakeBoss.Reset();
                    g.player.Reset();
                    g.life.Reset();
                }}

                g.interlude.SetNextStateAndTexture(nextState, "intro2");
                g.gameStateManager.SetState(GameState.Interlude, null);

            }

            this.pos.x = this.pos.x + (Math.random() * 2 - 1) * 10;
            this.pos.y = this.pos.y + (Math.random() * 2 - 1) * 10;

            this.defetedTime += dt;
        }

        this.preparingSaw = false;
        let charmingSawCount = 0;
        for(let i = 0; i < this.saws.length; ++i) {
            this.saws[i].Update(dt);
            if(this.saws[i].charming === true) ++charmingSawCount;
            if(this.saws[i].state === SawState.Preparing) this.preparingSaw = true;
        }

        if(this.preparingSaw) {
            this.pos.x = this.pos.x + (Math.random() * 2 - 1) * 4;
            this.pos.y = this.pos.y + (Math.random() * 2 - 1) * 4;
        }

        if(!this.defeted && charmingSawCount === this.saws.length) {
            this.defeted = true
            this.defetedTime = 0;
        };

        for(let i = 0; i < this.shipContainer.length; ++i) {
            this.shipContainer[i].pos = this.saws[i].start;
            this.shipContainer[i].Update(dt);
        }


        this.sprite.pos = this.pos;
        this.sprite.Update();

    }

    Render() {
        
        if(this.defeted) {
            g.textureManager.BindTexture("boss_cute");
        } else if(this.preparingSaw) {
            g.textureManager.BindTexture("boss_angry");
        } else {
            g.textureManager.BindTexture("boss");
        }

        this.sprite.Render(g.shader);

        for(let i = 0; i < this.shipContainer.length; ++i) {
            g.textureManager.BindTexture("ship");
            this.shipContainer[i].Render(g.shader);
        }

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