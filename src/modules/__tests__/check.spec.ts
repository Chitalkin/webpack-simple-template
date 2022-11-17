import { checkTest } from '../index';

describe('Check test', () => {
    it('should return `ok`', () => {
        expect(checkTest()).toBe('ok');
    });
});
