import { beforeAll, expect, test } from 'vitest'
import Handlebars from 'handlebars'
import { is } from '../src/core';
let template: HandlebarsTemplateDelegate<any> | undefined;
beforeAll(() => {
    is()
    template = Handlebars.compile("{{#is 1 'not' 2}}Correct{{else}}What??{{/is}}")
})
test("is helper - should return 'Correct'", () => {
    if (template) {
        const output = template({})
        expect(output).toEqual("Correct")
    }
})