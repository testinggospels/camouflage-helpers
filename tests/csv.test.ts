
import { beforeAll, expect, test } from 'vitest'
import Handlebars from 'handlebars'
import { csvcamoflageHelper } from '../src/core';

const CSV_FILE_PATH = "/Users/shubhendumadhukar/Documents/camouflage/camouflage-helpers/test.csv"
let template: HandlebarsTemplateDelegate<any> | undefined;

beforeAll(() => {
    csvcamoflageHelper()
    template = Handlebars.compile(`{{#each (csv src='${CSV_FILE_PATH}' delimiter=';' key='LatD' value='43')}}{{#with this}}{{State}}:{{City}}{{/with}}{{/each}}`)
})
test("csv helper - fetch a city/state using LatD", () => {
    if (template) {
        const cityState = template({})
        expect(cityState).toBe("WI:Wisconsin Dells")
    }
})