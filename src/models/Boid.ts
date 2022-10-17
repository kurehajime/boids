import { Point } from "./Point";

export class Boid {
    Id: number;
    Position: Point;
    VectorPersonalSpace: Point | null = null;

    constructor(id: number, position: Point) {
        this.Id = id;
        this.Position = position;
    }
}