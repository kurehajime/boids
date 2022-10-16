import { Point } from "./Point";

export class Boid {
    Id: number;
    Position: Point;
    constructor(id: number, position: Point) {
        this.Id = id;
        this.Position = position;
    }
}