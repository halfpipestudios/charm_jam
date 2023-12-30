class Interlude {

    constructor() {
        this.duration = 5;
        this.timer = 0;
        this.sprite = new Sprite(new Vec2(g.window_w/2, g.window_h/2), g.window_w, g.window_h, c.white);
    
        this.state = null;
        this.texture = null;
    }

    SetNextStateAndTexture(state, texture) {
        this.state = state;
        this.texture = texture;
        this.timer = 0;
    }

    Update(dt) {
        this.timer += dt;
        if(this.timer >= this.duration && this.state !== null) {
            g.gameStateManager.SetState(this.state.state, this.state.onEnter);
        }
    }

    Render() {
        g.textureManager.BindTexture(this.texture);
        this.sprite.Render(g.shader);
    }
}