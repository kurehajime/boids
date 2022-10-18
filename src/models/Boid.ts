import { Utils } from "../statics/Utils";
import { Point } from "./Point";

export class Boid {
    Id: number;
    Position: Point;
    VectorPersonalSpace: Point | null = null;
    VectorCenterOfMass: Point | null = null;
    VectorTrend: Point | null = null;
    VectorEscape: Point | null = null;

    constructor(id: number, position: Point) {
        this.Id = id;
        this.Position = position;
    }

    update(): Boid {
        const b = this.clone();
        if (b.VectorPersonalSpace) {
            b.Position.x += b.VectorPersonalSpace.x;
            b.Position.y += b.VectorPersonalSpace.y;
        }
        if (b.VectorCenterOfMass) {
            b.Position.x += b.VectorCenterOfMass.x;
            b.Position.y += b.VectorCenterOfMass.y;
        }
        if (b.VectorTrend) {
            b.Position.x += b.VectorTrend.x;
            b.Position.y += b.VectorTrend.y;
        }
        if (b.VectorEscape) {
            b.Position.x += b.VectorEscape.x;
            b.Position.y += b.VectorEscape.y;
        }
        b.Position.x = Math.max(b.Position.x, 10);
        b.Position.x = Math.min(b.Position.x, Utils.maxDistance - 10);
        b.Position.y = Math.max(b.Position.y, 10);
        b.Position.y = Math.min(b.Position.y, Utils.maxDistance - 10);
        return b;
    }

    clone(): Boid {
        const b = new Boid(this.Id, this.Position);
        b.VectorPersonalSpace = this.VectorPersonalSpace;
        b.VectorCenterOfMass = this.VectorCenterOfMass;
        b.VectorTrend = this.VectorTrend;
        b.VectorEscape = this.VectorEscape;
        return b;
    }
}