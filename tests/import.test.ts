import { beforeAll, expect, test } from 'vitest'
import Handlebars from 'handlebars'
import { importMock, now } from '@/core';
import { DateTime } from 'luxon';

let template: HandlebarsTemplateDelegate<any> | undefined;
beforeAll(() => {
    now()
    importMock()
    template = Handlebars.compile("{{import path='/Users/shubhendumadhukar/Documents/camoflage/helpers/test.mock'}}")
})
test("import helper", () => {
    if (template) {
        const dateToday = DateTime.now().toFormat("yyyy-MM-dd")
        const dateTodayFromHelper = template({})
        expect(dateToday).toEqual(dateTodayFromHelper)
    }
})