import { clamp } from '@app/utils';

describe('clamp tests', () => {
    it('test 1', () => {
        const result = clamp(100, 0, 50);

        expect(result).toBe(50);
    })

    it('test 2', () => {
        const result = clamp(5, 0, 100);
        expect(result).toBe(5);
    })
})