class Life {
    constructor() {
        this.circle = new Circle(new Vec2(0, 0), 25);
        this.sprite = new Sprite(new Vec2(0, 0), 50, 50, new Vec4(0.5, 1, 0.5, 1));
        this.spawnTime = 10.0;
        this.active = false;
        this.timer = 0;
    }

    Spawn(pos, dt) {
        this.circle.c = pos;
        this.sprite.pos = pos;
        this.sprite.Update(dt);
        this.active = true;
    }

    Update(dt) {
        if(this.active == false) this.timer += dt;
        if(this.active == false && this.timer >= this.spawnTime) {

            // get a random pos inside the screen
            let x = Math.random() * g.window_w;
            let y = Math.random() * g.window_h;
            this.Spawn(new Vec2(x, y), dt);
            this.timer = 0;
        }
    }

    Render() {
        if(this.active === true) {
            g.textureManager.BindTexture("life");
            this.sprite.Render(g.shader);
        }
    }
}

