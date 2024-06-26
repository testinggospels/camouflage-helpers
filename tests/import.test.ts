import { beforeAll, expect, test } from 'vitest'
import Handlebars from 'handlebars'
import { importMock, now } from '../src/core';
import { DateTime } from 'luxon';

let template: HandlebarsTemplateDelegate<any> | undefined;
beforeAll(() => {
    now()
    importMock()
    template = Handlebars.compile("{{import path='test.mock'}}")
})
test("import helper", () => {
    if (template) {
        const dateToday = DateTime.now().toFormat("yyyy-MM-dd")
        const dateTodayFromHelper = template({})
        expect(dateToday).toEqual(dateTodayFromHelper)
    }
})