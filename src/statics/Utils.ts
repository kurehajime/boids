import { Boid } from "../models/Boid";

export class Utils {
    static personalSpace = 30;
    static maxSpeed = 20;
    static maxDistance = 500;

    // 隣人を取得
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

    // 距離を取得
    static getDistance(me: Boid, you: Boid): number {
        return Math.sqrt(Math.pow(me.Position.x - you.Position.x, 2) + Math.pow(me.Position.y - you.Position.y, 2));
    }

    // 角度を取得
    static getAngle(a: Boid, b: Boid): number {
        return Math.atan2(b.Position.y - a.Position.y, b.Position.x - a.Position.x);
    }

    // 角度からX座標を取得
    static getXByAngle(r: number, a: number): number {
        return r * Math.cos(a);
    }

    // 角度からY座標を取得
    static getYByAngle(r: number, a: number): number {
        return r * Math.sin(a);
    }

    static addVectorPersonalSpace(me: Boid, we: Boid[]): Boid {
        const top = Utils.getMyNeighbor(me, we);
        const topBoid = we.filter(b => b.Id === top)[0];
        const distance = Utils.getDistance(me, topBoid);
        let speed = 0;
        let angle = 0;
        if (distance < Utils.personalSpace) {
            speed = Utils.maxSpeed * (1 - distance / Utils.personalSpace);
            angle = Utils.getAngle(me, topBoid) + Math.PI;
        } else if (distance > Utils.personalSpace) {
            speed = Utils.maxSpeed * (distance / Utils.maxDistance);
            angle = Utils.getAngle(me, topBoid);
        }
        const b = me.clone();
        b.VectorPersonalSpace = {
            x: Utils.getXByAngle(speed, angle),
            y: Utils.getYByAngle(speed, angle)
        };
        return b;
    }
}