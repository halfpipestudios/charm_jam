class Hero {
    constructor() {
        this.pos = new Vec2(500, 100);
        this.dim = new Vec2(10, 10);
    }

    Update(dt) {
        if(KeyDown(KeyCode.KEY_LEFT)) {
            this.pos.x -= 200 * dt;
        }

        if(KeyDown(KeyCode.KEY_RIGHT)) {
            this.pos.x += 200 * dt;
        }

        if(KeyDown(KeyCode.KEY_UP)) {
            this.pos.y += 200 * dt;
        }

        if(KeyDown(KeyCode.KEY_DOWN)) {
            this.pos.y -= 200 * dt;
        }
    }

    Render() {
        let sprite = new Sprite(this.pos, 32, 32, new Vec4(0, 1, 0, 1));
        sprite.Render(g.shader);
    }
}