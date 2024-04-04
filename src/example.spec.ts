
function addNumber(num1, num2) {
    return num1+num2;
}

describe('addNumbers', () => {
    it ('adds two numbers', () => {
        expect(addNumber(2,2)).toEqual(4);
    });
});

describe('Example test', () => {
    it('equals true', () => {
        expect(true).toEqual(true);
        expect('Rao').toEqual('Rao');
    });
});