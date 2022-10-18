import { Point } from "./Point";

export class Boid {
    Id: number;
    Position: Point;
    VectorPersonalSpace: Point | null = null;

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
        return b;
    }

    clone(): Boid {
        const b = new Boid(this.Id, this.Position);
        b.VectorPersonalSpace = this.VectorPersonalSpace;
        return b;
    }
}