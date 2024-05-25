import { expect, test } from 'vitest'
import Helpers from '../src/index';
const helpers = new Helpers(true, "off")

helpers.addHelper("ping", (context: any) => {
    return "pong"
})

test("custom ping helper should return the expected output pong", () => {
    const pong = helpers.parse("{{ping}}")
    expect(pong).toBe("pong")
})