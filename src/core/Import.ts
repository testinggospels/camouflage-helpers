import { log } from "../utils/logger";
import Handlebars from "handlebars";
import fs from 'fs'
import path from 'path'

export const importMock = () => {
    Handlebars.registerHelper("import", (context: any) => {
        log.debug(`importing: ${context.hash.path}`)
        if (!context.hash.path) {
            log.error("No paths specified")
            return
        }
        const filepath = path.resolve(context.hash.path)
        const contents = new Handlebars.SafeString(fs.readFileSync(filepath, "utf-8"))
        const template = Handlebars.compile(contents.toString())
        return template({})
    });
}