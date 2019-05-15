function AreValuesEqual(val1, val2, tolerance) {
    if (val1 >= (val2 - tolerance) && val1 <= (val2 + tolerance)) {
        return true;
    }
    return false;
}


function PuntTotLijn(px, py, p1x, p1y, p2x, p2y) {
    //berekend de afstand van de drone tot de opgegeven rand van het obstakel
    let dx = p2x - p1x;
    let dy = p2y - p1y;
    let dp1x = px - p1x;
    let dp1y = py - p1y;
    const segLenSquared = (dx * dx) + (dy * dy);
    if (this.AreValuesEqual(segLenSquared, 0.0, Number.EPSILON)) {
        // segment is a point.
        this.qx = p1x;
        this.qy = p1y;
        this.t = 0.0;
        return Math.sqrt((dp1x * dp1x) + (dp1y * dp1y));
    } else {
        this.t = ((dp1x * dx) + (dp1y * dy)) / segLenSquared;
        if (this.t <= Number.EPSILON) {
            // intersects at or to the "left" of first segment vertex (p1x, p1y).  If t is approximately 0.0, then
            // intersection is at p1.  If t is less than that, then there is no intersection (i.e. p is not within
            // the 'bounds' of the segment)
            if (this.t >= -Number.EPSILON) {
                // intersects at 1st segment vertex
                this.t = 0.0;
            }
            // set our 'intersection' point to p1.
            this.qx = p1x;
            this.qy = p1y;
            // Note: If you wanted the ACTUAL intersection point of where the projected lines would intersect if
            // we were doing PointLineDistanceSquared, then qx would be (p1x + (t * dx)) and qy would be (p1y + (t * dy)).
        } else if (this.t >= (1.0 - Number.EPSILON)) {
            // intersects at or to the "right" of second segment vertex (p2x, p2y).  If t is approximately 1.0, then
            // intersection is at p2.  If t is greater than that, then there is no intersection (i.e. p is not within
            // the 'bounds' of the segment)
            if (this.t <= (1.0 + Number.EPSILON)) {
                // intersects at 2nd segment vertex
                this.t = 1.0;
            }
            this.qx = p2x;
            this.qy = p2y;
            // Note: If you wanted the ACTUAL intersection point of where the projected lines would intersect if
            // we were doing PointLineDistanceSquared, then qx would be (p1x + (t * dx)) and qy would be (p1y + (t * dy)).
        } else {
            // The projection of the point to the point on the segment that is perpendicular succeeded and the point
            // is 'within' the bounds of the segment.  Set the intersection point as that projected point.
            this.qx = ((1.0 - this.t) * p1x) + (this.t * p2x);
            this.qy = ((1.0 - this.t) * p1y) + (this.t * p2y);
            // for debugging
            //ASSERT(AreValuesEqual(qx, p1x + (t * dx), EPSILON_TINY));
            //ASSERT(AreValuesEqual(qy, p1y + (t * dy), EPSILON_TINY));
        }
        // return the squared distance from p to the intersection point.
        let dpqx = px - this.qx;
        let dpqy = py - this.qy;
        return Math.sqrt((dpqx * dpqx) + (dpqy * dpqy));
    }
}

module.exports = PuntTotLijn;
