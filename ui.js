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
        
        this.tuto = new Sprite(new Vec2(g.window_w/2, g.window_h/2), g.window_w, g.window_h, c.white);
    }

    Update(dt) {
        for(let index = 0; index < g.player.health; ++index) {
            this.health[index].Update(dt);
        }
    }

    Render() {
        g.shader.Bind();
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("View"), false, new Mat4().m);

        switch(g.gameStateManager.GetState()) {
            case GameState.Menu:
                g.textureManager.BindTexture("tuto");
                this.tuto.Render(g.shader);
                break;
            case GameState.Defeated:
                break;
            case GameState.Pause: 
                break;
            case GameState.Stage1:
                g.textureManager.BindTexture("life");
                for(let index = 0; index < g.player.health; ++index) {
                    this.health[index].Render(g.shader);
                }
                break;
            case GameState.Stage2: 
                g.textureManager.BindTexture("life");
                for(let index = 0; index < g.player.health; ++index) {
                    this.health[index].Render(g.shader);
                }
                break;
        }



    }
}