class Ui {
    
    constructor() {
        
        this.health = [];
        
        let r = 32;
        let p = 10;
            
        let x = r/2 + 10;
        let y = g.window_h - r + 10;
        
        for(let index = 0; index < g.player.health; ++index) {
            this.health.push(new Sprite(new Vec2(x, y), r, r, c.red));
            x += 32 + p;
        }
    
    }

    Update(dt) {
        for(let index = 0; index < g.player.health; ++index) {
            this.health[index].Update(dt);
        }
    }

    Render() {
        for(let index = 0; index < g.player.health; ++index) {
            this.health[index].Render(g.shader);
        }
    }
}