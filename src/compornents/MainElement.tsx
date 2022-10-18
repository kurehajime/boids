import { useEffect, useState } from "react";
import { Boid } from "../models/Boid";
import BoidElement from "./BoidElement";
import "./MainElement.css";
import { useTimer } from 'use-timer'
import { Utils } from "../statics/Utils";

export default function MainElement() {
    const FieldSize = 500;
    const [boids, setBoids] = useState<Boid[]>([]);
    const { time: time, start: start, pause: pause, reset: reset } = useTimer({ interval: 100 })

    useEffect(() => {
        const boidsArray = [];
        for (let i = 0; i < 30; i++) {
            const boid = new Boid(i, { x: (Math.random() * 500 | 0), y: (Math.random() * 500 | 0) });
            boidsArray.push(boid);
        }
        setBoids(boidsArray);
        start();
    }, [])

    useEffect(() => {
        if (time > 0) {
            const boidsArray = boids
                .map(boid => {
                    return Utils.addVectorPersonalSpace(boid, boids);
                })
                .map(boid => {
                    return Utils.addVectorCenterOfMass(boid, boids);
                })
                .map(boid => {
                    return boid.update();
                });
            setBoids(boidsArray);
        }
    }, [time])


    return (
        <div className='main'>
            <svg width={FieldSize} height={FieldSize} >
                {
                    boids.map((boid, index) => {
                        return (<BoidElement
                            boid={boid}
                            key={index}
                        />)
                    })
                }
            </svg>
        </div >
    )
}