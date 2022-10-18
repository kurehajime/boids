import { Enemy } from "../models/Enemy";

type Props = {
    enemy: Enemy;
}
export default function BoidElement(props: Props) {
    return (
        <circle className="boid" cx={props.enemy.Position.x} cy={props.enemy.Position.y} r={5} fill="red" />
    )
}