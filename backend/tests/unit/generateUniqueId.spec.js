const generateUID = require('../../src/utils/generateUniqueId')

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUID();

        expect(id).toHaveLength(8);
    })
});