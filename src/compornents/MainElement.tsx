import { useEffect, useState } from "react";
import { Boid } from "../models/Boid";
import BoidElement from "./BoidElement";
import "./MainElement.css";

export default function MainElement() {
    const FieldSize = 500;
    const [boids, setBoids] = useState<Boid[]>([]);

    useEffect(() => {
        const boidsArray = [];
        for (let i = 0; i < 30; i++) {
            const boid = new Boid({ x: (Math.random() * 500 | 0), y: (Math.random() * 500 | 0) });
            boidsArray.push(boid);
        }
        setBoids(boidsArray);
    }, [])


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