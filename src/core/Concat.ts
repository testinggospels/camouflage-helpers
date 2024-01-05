import { log } from "@/utils/logger";
import Handlebars from "handlebars";

export const concat = () => {
    Handlebars.registerHelper("concat", (...args: any[]) => {
        const context = args.pop();
        let concatenatedString = args.join("")
        if (context.hash.delimiter) {
            concatenatedString = args.join(context.hash.delimiter)
        }
        log.debug(`Concatenated String: ${concatenatedString} `)
        return concatenatedString;
    });
}