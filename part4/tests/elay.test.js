const {dummy} = require('../utils/list_helper');

test('testing dummy', ()=>{
    const array =[];
    expect(dummy(array)).toBe(1);
})