class Ui {
    
    constructor() {
        
        this.health = [];
        
        let r = 48;
        let p = 24;
            
        let x = r/2 + 32;
        let y = g.window_h - r;
        
        for(let index = 0; index < g.player.health; ++index) {
            this.health.push(new Sprite(new Vec2(x, y), r, r, c.red));
            x += r + p;
        }
    
    }

    Update(dt) {
        for(let index = 0; index < g.player.health; ++index) {
            this.health[index].Update(dt);
        }
    }

    Render() {
        g.shader.Bind();
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("View"), false, new Mat4().m);
        for(let index = 0; index < g.player.health; ++index) {
            this.health[index].Render(g.shader);
        }
    }
}