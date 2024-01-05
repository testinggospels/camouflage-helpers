import { beforeAll, expect, test } from 'vitest'
import Handlebars from 'handlebars'
import { numBetween } from '@/core';

let template: HandlebarsTemplateDelegate<any> | undefined;
beforeAll(() => {
    numBetween()
    template = Handlebars.compile("{{num_between lower=500 upper=600}}")
})
test("num_between helper - generate a number between 500 and 600", () => {
    if (template) {
        const numBetween500_600 = template({})
        expect(parseInt(numBetween500_600)).toBeTypeOf('number')
        expect(numBetween500_600.length).toBe(3)
    }
})