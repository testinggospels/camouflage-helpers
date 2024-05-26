
import { beforeAll, expect, test } from 'vitest'
import Handlebars from 'handlebars'
import { csvcamoflageHelper } from '../src/core';

const CSV_FILE_PATH = "test.csv"
let template: HandlebarsTemplateDelegate<any> | undefined;

beforeAll(() => {
    csvcamoflageHelper()
    // template = Handlebars.compile(`{{#each (csv src='${CSV_FILE_PATH}' delimiter=';' key='LatD' value='43')}}{{#with this}}{{State}}:{{City}}{{/with}}{{/each}}`)
    template = Handlebars.compile(`{{csv src='${CSV_FILE_PATH}' delimiter=';' key='LatD' value='43'}}`)
})
test("csv helper - fetch a city/state using LatD", () => {
    if (template) {
        const cityState = JSON.parse(decodeHTMLEntities(template({})))
        expect(cityState[0].City).toBe("Wisconsin Dells")
    }
})

function decodeHTMLEntities(text: string) {
    const entities: Record<string, string> = {
        '&quot;': '"',
        '&apos;': "'",
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&'
        // Add more entities if needed
    };

    return text.replace(/&quot;|&apos;|&lt;|&gt;|&amp;/g, match => entities[match]);
}