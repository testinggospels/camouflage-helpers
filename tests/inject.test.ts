import { expect, test } from 'vitest'
import Helpers from '@/index';
const helpers = new Helpers(true, "off")

test("inject should return the output of the code", () => {
    const tenDigitRandomNumber = helpers.parse("{{#inject}}(()=>{ return Math.floor(1000000000 + Math.random() * 9000000000); })();{{/inject}}")
    expect(parseInt(tenDigitRandomNumber)).toBeTypeOf('number')
    expect(tenDigitRandomNumber.length).toBe(10)
})