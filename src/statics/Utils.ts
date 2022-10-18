import { Boid } from "../models/Boid";
import { Enemy } from "../models/Enemy";
import { Point } from "../models/Point";

export class Utils {
    static personalSpace = 50;
    static groupDistance = 100;
    static enemyDistance = 200;
    static maxSpeedPersonalSpace = 10;
    static maxSpeedEnemy = 20;
    static maxSpeedCenterOfMass = 5;
    static maxSpeedTrend = 30;
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

    static getGroup(me: Boid, we: Boid[]): Boid[] {
        return we.filter(b => {
            const distance = Utils.getDistance(me.Position, b.Position);
            return distance < Utils.groupDistance;
        });
    }

    // 距離を取得
    static getDistance(me: Point, you: Point): number {
        return Math.sqrt(Math.pow(me.x - you.x, 2) + Math.pow(me.y - you.y, 2));
    }

    // 角度を取得
    static getAngle(a: Point, b: Point): number {
        return Math.atan2(b.y - a.y, b.x - a.x);
    }

    // 角度からX座標を取得
    static getXByAngle(r: number, a: number): number {
        return r * Math.cos(a);
    }

    // 角度からY座標を取得
    static getYByAngle(r: number, a: number): number {
        return r * Math.sin(a);
    }

    // みんなの平均
    static getAvaregePosition(we: Boid[]): Point {
        const x = we.map(b => b.Position.x).reduce((a, b) => a + b) / we.length;
        const y = we.map(b => b.Position.y).reduce((a, b) => a + b) / we.length;
        return { x: x, y: y };
    }

    // みんなのトレンド
    static getTrend(we: Boid[]): Point {
        const x = we
            .map(b => (b.VectorCenterOfMass?.x ?? 0) + (b.VectorCenterOfMass?.x ?? 0) + (b.VectorCenterOfMass?.x ?? 0) + (b.VectorPersonalSpace?.x ?? 0))
            .reduce((a, b) => a + b) / (we.length * 2);
        const y = we
            .map(b => (b.VectorCenterOfMass?.y ?? 0) + (b.VectorCenterOfMass?.y ?? 0) + (b.VectorCenterOfMass?.y ?? 0) + (b.VectorPersonalSpace?.y ?? 0))
            .reduce((a, b) => a + b) / (we.length * 2);
        return { x: x, y: y };
    }

    static addVectorPersonalSpace(me: Boid, we: Boid[]): Boid {
        const top = Utils.getMyNeighbor(me, we);
        const topBoid = we.filter(b => b.Id === top)[0];
        const distance = Utils.getDistance(me.Position, topBoid.Position);
        let speed = 0;
        let angle = 0;
        if (distance < Utils.personalSpace) {
            speed = Utils.maxSpeedPersonalSpace * (1 - distance / Utils.personalSpace);
            angle = Utils.getAngle(me.Position, topBoid.Position) + Math.PI;
        } else if (distance > Utils.personalSpace) {
            // speed = Utils.maxSpeedPersonalSpace * (distance / Utils.maxDistance);
            // angle = Utils.getAngle(me.Position, topBoid.Position);
        }
        const b = me.clone();
        b.VectorPersonalSpace = {
            x: Utils.getXByAngle(speed, angle),
            y: Utils.getYByAngle(speed, angle)
        };
        return b;
    }

    static addVectorCenterOfMass(me: Boid, we: Boid[]): Boid {
        const group = Utils.getGroup(me, we);
        const center = Utils.getAvaregePosition(group);
        const distance = Utils.getDistance(me.Position, center);
        const speed = Utils.maxSpeedCenterOfMass * (distance / Utils.maxDistance);
        const angle = Utils.getAngle(me.Position, center);
        const b = me.clone();
        b.VectorCenterOfMass = {
            x: Utils.getXByAngle(speed, angle),
            y: Utils.getYByAngle(speed, angle)
        };
        return b;
    }

    static addVectorTrend(me: Boid, we: Boid[]): Boid {
        const group = Utils.getGroup(me, we);
        const trend = Utils.getTrend(group);
        const b = me.clone();
        b.VectorTrend = {
            x: trend.x * this.maxSpeedTrend,
            y: trend.y * this.maxSpeedTrend
        };
        return b;
    }
    static addVectorEscape(me: Boid, enemy: Enemy): Boid {
        const distance = Utils.getDistance(me.Position, enemy.Position);
        let speed = 0;
        let angle = 0;
        if (distance < Utils.enemyDistance) {
            speed = Utils.maxSpeedEnemy * (1 - distance / Utils.enemyDistance);
            angle = Utils.getAngle(me.Position, enemy.Position) + Math.PI;
        }
        const b = me.clone();
        b.VectorEscape = {
            x: Utils.getXByAngle(speed, angle),
            y: Utils.getYByAngle(speed, angle)
        };
        return b;
    }
}