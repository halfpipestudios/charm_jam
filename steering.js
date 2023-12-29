class Steering {
    constructor() {
        this.linear = 0;
        this.angular = 0;
    }
}

function AdjustAngle(angle) {
    let outAngle = angle;
    while(outAngle >  Math.PI) outAngle -= (2*Math.PI);
    while(outAngle < -Math.PI) outAngle += (2*Math.PI);
    return outAngle;
}

function Vec2ToAngle(v) {
    let angle = Math.atan2(v.y, v.x);
    if(angle < 0) angle += (2*Math.PI);
    return angle;
}

function AngleToVec2(a) {
    let v = new Vec2;
    v.x = Math.cos(a);
    v.y = Math.sin(a);
    return v;
}

function MachAngle(currentAngle, targetAngle, timeToTarget) {
    let angDist = targetAngle - currentAngle;
    angDist = AdjustAngle(angDist);
    return angDist / timeToTarget;
}

function Face(pos, orientation, target, maxAngVel, timeToTarget) {
    let steering = new Steering;
    // get the direction to align with
    let dir = Vec2Sub(target, pos);
    dir = Vec2Normalize(dir);
    // get the angle of that direction
    let currentOrientation = orientation;
    let targetOrientation = Vec2ToAngle(dir);
    let angVel = MachAngle(currentOrientation, targetOrientation, timeToTarget);
    steering.angular = Math.max(Math.min(angVel, maxAngVel), -maxAngVel);
    steering.linear = 0;
    return steering;
}

function Seek(pos, orientation, target, maxAngVel, maxAcc, timeToTarget) {
    let steering = new Steering;

    steering = Face(pos, orientation, target, maxAngVel, timeToTarget);

    let angularVelSize = Math.abs(steering.angular);
    let acc = maxAcc / (1 + angularVelSize);
    acc = Math.max(Math.min(acc/timeToTarget, maxAcc), -maxAcc);

    steering.linear = acc;

    return steering;
}