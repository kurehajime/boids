import { Boid } from "../models/Boid";

type Props = {
    boid: Boid;
}
export default function BoidElement(props: Props) {
    return (
        <circle className="boid" cx={props.boid.Position.x} cy={props.boid.Position.y} r={5} fill="blue" />
    )
}