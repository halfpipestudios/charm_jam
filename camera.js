class Camera {
    constructor() {
        this.pos = new Vec2(0, 0);
    
        this.screenShakeEnable = false;
        this.screenShakeTime = 0;
        
        this.screenShakeDuration = 0.8;
        this.screenShakeFrequency = 30;
        this.screenShakeAmplitude = 16;
        this.screenShakeSamplesX = [];
        this.screenShakeSamplesY = [];

        this.samplesCount = this.screenShakeFrequency;
        this.timePerSample = 1 / this.screenShakeFrequency;
        
    }

    Update(dt) {

        if(this.screenShakeEnable) {

            if(this.screenShakeTime > this.screenShakeDuration) {
                this.screenShakeEnable = false;
                this.pos = new Vec2(0, 0);
                
                g.shader.Bind();
                gl.uniformMatrix4fv(g.shader.GetUniformLocation("View"), false, this.GetViewMatrix().m);
                
                return;
            }

            // NOTE: prev and next sample
            let prevSampleIndex = Math.floor((this.screenShakeTime / this.screenShakeDuration) * (this.samplesCount - 1));
            let nextSampleIndex = (prevSampleIndex + 1) % this.samplesCount;

            let progression = (Math.sin(this.screenShakeTime - prevSampleIndex * this.timePerSample) + 1) / 2;

            this.pos.x = Lerp(this.screenShakeSamplesX[prevSampleIndex]*this.screenShakeAmplitude/2, this.screenShakeSamplesX[nextSampleIndex]*this.screenShakeAmplitude/2, progression);
            this.pos.y = Lerp(this.screenShakeSamplesY[prevSampleIndex]*this.screenShakeAmplitude/2, this.screenShakeSamplesY[nextSampleIndex]*this.screenShakeAmplitude/2, progression);
            
            console.log(prevSampleIndex);
            console.log(nextSampleIndex);
            console.log(progression);

            this.screenShakeTime += dt;
        }

        g.shader.Bind();
        gl.uniformMatrix4fv(g.shader.GetUniformLocation("View"), false, this.GetViewMatrix().m);
    }

    GetViewMatrix() {
        let result = Mat4Translate(this.pos.x, this.pos.y, 0);
        return result;
    }

    ScreenShake() {
        this.screenShakeEnable = true;
        this.screenShakeTime = 0;

        for(let i = 0; i < this.samplesCount; ++i) {
            this.screenShakeSamplesX.push(Math.random() * 2 - 1);
            this.screenShakeSamplesY.push(Math.random() * 2 - 1);
        }

    }

}