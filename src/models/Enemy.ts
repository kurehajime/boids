import { Utils } from "../statics/Utils";
import { Point } from "./Point";

export class Enemy {
    Position: Point;
    Angle = 0;
    Turn = true;
    Speed = 10;

    constructor(position: Point) {
        this.Position = position;
    }

    update(): Enemy {
        const b = this.clone();
        if (Math.random() < 0.1) {
            b.Turn = !b.Turn;
        }
        if (b.Turn) {
            b.Angle += this.nearWall() ? 0.3 : 0.1;
        } else {
            b.Angle -= this.nearWall() ? 0.3 : 0.1;
        }
        b.Position.x += Math.cos(b.Angle) * this.Speed;
        b.Position.y += Math.sin(b.Angle) * this.Speed;

        b.Position.x = Math.max(b.Position.x, 0);
        b.Position.x = Math.min(b.Position.x, Utils.maxDistance);
        b.Position.y = Math.max(b.Position.y, 0);
        b.Position.y = Math.min(b.Position.y, Utils.maxDistance);

        return b;
    }

    nearWall(): boolean {
        const wall = Utils.maxDistance / 10;
        if (this.Position.x < wall || this.Position.x > Utils.maxDistance - wall
            || this.Position.y < wall || this.Position.y > Utils.maxDistance - wall) {
            return true;
        }
        return false;
    }

    clone(): Enemy {
        const b = new Enemy(this.Position);
        b.Angle = this.Angle;
        b.Turn = this.Turn;
        return b;
    }
}