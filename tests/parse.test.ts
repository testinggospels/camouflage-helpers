import { expect, test } from 'vitest'
import { DateTime } from 'luxon'
import Helpers from '@/index';
const helpers = new Helpers(false, "off")

test("parse should return the correct value from a helper", () => {
    const dateToday = DateTime.now().toFormat("yyyy-MM-dd")
    const dateTodayFromHelper = helpers.parse("{{now format='yyyy-MM-dd'}}")
    expect(dateToday).toEqual(dateTodayFromHelper)
})