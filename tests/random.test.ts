import { beforeAll, expect, test } from 'vitest'
import Handlebars from 'handlebars'
import { random } from '@/core';

let template: HandlebarsTemplateDelegate<any> | undefined;
beforeAll(() => {
    random()
    template = Handlebars.compile("{{random type='NUMERIC' length=10}}")
})
test("random helper - generate a 10 digit random number", () => {
    if (template) {
        const tenDigitRandomNumber = template({})
        expect(parseInt(tenDigitRandomNumber)).toBeTypeOf('number')
        expect(tenDigitRandomNumber.length).toBe(10)
    }
})