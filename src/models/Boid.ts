import { Utils } from "../statics/Utils";
import { Point } from "./Point";

export class Boid {
    Id: number;
    Position: Point;
    VectorPersonalSpace: Point | null = null;
    VectorCenterOfMass: Point | null = null;

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
        b.Position.x = Math.max(b.Position.x, 0);
        b.Position.x = Math.min(b.Position.x, Utils.maxDistance);
        b.Position.y = Math.max(b.Position.y, 0);
        b.Position.y = Math.min(b.Position.y, Utils.maxDistance);
        return b;
    }

    clone(): Boid {
        const b = new Boid(this.Id, this.Position);
        b.VectorPersonalSpace = this.VectorPersonalSpace;
        b.VectorCenterOfMass = this.VectorCenterOfMass;
        return b;
    }
}