import { log } from "@/utils/logger";
import Handlebars from "handlebars";
import { DateTime } from 'luxon';

export const now = () => {
    Handlebars.registerHelper("now", (context: any) => {
        log.debug(`format: ${context.hash.format}`)
        log.debug(`offset: ${context.hash.offset}`)
        const format = context.hash.format ? context.hash.format : "yyyy-MM-dd hh:mm:ss"
        let offsetUnit: string = "seconds";
        let offsetValue = 0;
        if (context.hash.offset) {
            const offsetString = context.hash.offset.split(" ");
            const [value, unit] = offsetString.split(' ');
            offsetValue = parseFloat(value);
            offsetUnit = unit;
        }
        const offsetObject = { [offsetUnit]: offsetValue }
        switch (format) {
            case "epoch":
                return DateTime.now().plus({ ...offsetObject }).toMillis();
            case "unix":
                return DateTime.now().plus({ ...offsetObject }).toSeconds();
            default:
                return DateTime.now().plus({ ...offsetObject }).toFormat(format);
        }
    });
}