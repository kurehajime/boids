import { expect, test } from 'vitest'
import { Boid } from '../src/models/Boid'
import { Utils } from '../src/statics/Utils'
test('直近を検索', () => {
    const we: Boid[] = [
        new Boid(0, { x: 100, y: 100 }),
        new Boid(1, { x: 101, y: 200 }),
        new Boid(2, { x: 200, y: 101 }),
        new Boid(3, { x: 150, y: 150 }),
        new Boid(4, { x: 40, y: 40 }),
        new Boid(5, { x: 300, y: 300 }),
    ];
    const me = we[0];
    const myNeighbor = Utils.getMyNeighbor(me, we);
    expect(myNeighbor).toBe(3);
});

test('角度を求める', () => {
    const me = new Boid(0, { x: 100, y: 100 })
    const you = new Boid(0, { x: 150, y: 150 })
    const angle = Utils.getAngle(me, you);
    expect(angle).toBe(0.7853981633974483);
});

test('角度から座標を求める', () => {
    const r = 70.7106781187;
    const a = 0.7853981633974483;
    const x = Utils.getXByAngle(r, a);
    const y = Utils.getYByAngle(r, a);
    expect(Math.round(x)).toBe(50);
    expect(Math.round(y)).toBe(50);
});

test('角度から座標を求める(向きを逆転)', () => {
    const r = 70.7106781187;
    const a = 0.7853981633974483 + Math.PI;
    const x = Utils.getXByAngle(r, a);
    const y = Utils.getYByAngle(r, a);
    expect(Math.round(x)).toBe(-50);
    expect(Math.round(y)).toBe(-50);
});