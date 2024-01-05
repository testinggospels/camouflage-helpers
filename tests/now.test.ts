import { beforeAll, expect, test } from 'vitest'
import { DateTime } from 'luxon'
import Handlebars from 'handlebars'
import { now } from '@/core';
let template: HandlebarsTemplateDelegate<any> | undefined;
beforeAll(() => {
    now()
    template = Handlebars.compile("{{now format='yyyy-MM-dd'}}")
})
test("now helper", () => {
    if (template) {
        const dateToday = DateTime.now().toFormat("yyyy-MM-dd")
        const dateTodayFromHelper = template({})
        expect(dateToday).toEqual(dateTodayFromHelper)
    }
})