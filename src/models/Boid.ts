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

            b.Position.x = Math.max(b.Position.x, 0);
            b.Position.x = Math.min(b.Position.x, 500);
            b.Position.y = Math.max(b.Position.y, 0);
            b.Position.y = Math.min(b.Position.y, 500);
        }
        return b;
    }

    clone(): Boid {
        const b = new Boid(this.Id, this.Position);
        b.VectorPersonalSpace = this.VectorPersonalSpace;
        return b;
    }
}