import { beforeAll, expect, test } from 'vitest'
import Handlebars from 'handlebars'
import { array, assign, concat } from '../src/core';

let template: HandlebarsTemplateDelegate<any> | undefined;
beforeAll(() => {
    assign()
    array()
    concat()
    template = Handlebars.compile(`{{assign name='fruits' value=(array source=(concat 'Apple' 'Kiwi' 'Oranges' delimiter='-') delimiter='-')}}
    {{#each fruits as |fruit|}}{{#if @last}}{{fruit}}{{else}}{{fruit}},{{/if}}{{/each}}`)
})
test("test array, concat and assign helpers with inbuilt each and if helpers", () => {
    if (template) {
        const output = template({}).trim()
        expect(output).toEqual("Apple,Kiwi,Oranges")
    }
})