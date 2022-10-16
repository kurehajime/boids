import { Boid } from "../models/Boid";

export class Utils {
    static getMyNeighbor(me: Boid, we: Boid[]): number {
        const top = we.
            filter(b => { return b.Id !== me.Id })
            .map(b => {
                return {
                    id: b.Id,
                    distance: Math.sqrt(Math.pow(b.Position.x - me.Position.x, 2) + Math.pow(b.Position.y - me.Position.y, 2))
                }
            })
            .sort((a, b) => a.distance - b.distance)[0]
            .id;
        return top;
    }
}