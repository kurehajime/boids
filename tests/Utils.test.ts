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
})