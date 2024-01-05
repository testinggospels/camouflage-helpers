import { log } from "@/utils/logger";
import Handlebars from "handlebars";
export const array = () => {
    Handlebars.registerHelper("array", (context: any) => {
        log.debug(`source: ${context.hash.source}`)
        log.debug(`delimiter: ${context.hash.delimiter}`)
        if (!context.hash.source && !context.hash.delimiter) {
            log.error("Source / Delimiter not specified.");
            return []
        } else {
            const source: string = context.hash.source
            const delimiter: string = context.hash.delimiter
            log.debug(source.split(delimiter))
            return source.split(delimiter);
        }
    });
}