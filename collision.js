class Ray {
    constructor(o, d) {
        this.o = o;
        this.d = d;
    }
}

class Circle {
    constructor(c, r) {
        this.c = c;
        this.r = r;
    }
}

class AABB {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
}

function SqDistPointAABB(p, b) {
    let sqDist = 0.0;
    
    let v = p.x;
    if(v < b.min.x) sqDist += (b.min.x - v) * (b.min.x - v);
    if(v > b.max.x) sqDist += (v - b.max.x) * (v - b.max.x);

    v = p.y;
    if(v < b.min.y) sqDist += (b.min.y - v) * (b.min.y - v);
    if(v > b.max.y) sqDist += (v - b.max.y) * (v - b.max.y);

    return sqDist;
}

function ClosestPtPointAABB(p, b) {
    let q = new Vec2(0, 0);
    
    let v = p.x;
    if(v < b.min.x) v = b.min.x;
    if(v > b.max.x) v = b.max.x;
    q.x = v;
    
    v = p.y;
    if(v < b.min.y) v = b.min.y;
    if(v > b.max.y) v = b.max.y;
    q.y = v;

    return q;
}

function TestAABBAABB(a, b) {
    if(a.max.x < b.min.x || a.min.x > b.max.x) return false;
    if(a.max.y < b.min.y || a.min.y > b.max.y) return false;
    return true;
}

function TestCircleCircle(a, b) {
    let d = Vec2Sub(a.c, b.c);
    let dist2 = Vec2Dot(d, d);
    let radiumSum = a.r + b.r;
    return dist2 <= radiumSum * radiumSum;
}

function TestCircleAABB(c, b) {
    let sqDist = SqDistPointAABB(c.c, b);
    return sqDist <= c.r * c.r;
}

function IntersectRayCircle(r, s) {
    let t = -1.0;

    let m = Vec2Sub(r.o, s.c);
    let b = Vec2Dot(m, r.d);
    let c = Vec2Dot(m, m) - s.r*s.r;
    
    if(c > 0.0 && b > 0.0) return t;

    let discr = b*b - c;
    if(discr < 0.0) return t;

    t = -b - Math.sqrt(discr);

    if(t < 0.0) t = 0.0;
    
    return t;
}

function IntersectRayAABB(r, b) {
    let t = -1.0;

    let tmin = 0.0;
    let tmax = Number.MAX_VALUE;

    if(Math.abs(r.d.x) < Number.EPSILON) {
        if(r.o.x < b.min.x || r.o.x > b.max.x) return t;
    } else {

        let ood = 1.0 / r.d.x;
        let t1 = (b.min.x - r.o.x) * ood;
        let t2 = (b.max.x - r.o.x) * ood;

        if(t1 > t2) {
            let tmp = t1;
            t1 = t2;
            t2 = tmp;
        };

        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);

        if(tmin > tmax) return t;

    } 

    if(Math.abs(r.d.y) < Number.EPSILON) {
        if(r.o.y < b.min.y || r.o.y > b.max.y) return t;
    } else {

        let ood = 1.0 / r.d.y;
        let t1 = (b.min.y - r.o.y) * ood;
        let t2 = (b.max.y - r.o.y) * ood;

        if(t1 > t2) {
            let tmp = t1;
            t1 = t2;
            t2 = tmp;
        };

        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);

        if(tmin > tmax) return t;

    } 

    t = tmin;
    return t;
}