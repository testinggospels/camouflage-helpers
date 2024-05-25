
import { log } from "../utils/logger";
import Handlebars from "handlebars";
import fs from 'fs'
import path from 'path'
import os from 'os'

export const csvcamoflageHelper = () => {
    Handlebars.registerHelper("csv", (context: any) => {
        const src = context.hash.src;
        const key = context.hash.key;
        const value = context.hash.value;
        const random = context.hash.random;
        const all = context.hash.all;
        const delimiter = context.hash.delimiter;
        log.debug({ src, key, value, random, all })
        if (!src) {
            log.error("'src' is a required parameter and has not been set.");
            return "'src' is a required parameter and has not been set.";
        }
        const file = path.resolve(src);
        if (!fs.existsSync(file)) {
            log.error("CSV file not found");
            return "CSV file not found";
        }
        const json: Record<any, any>[] = []
        const fileContents = fs.readFileSync(file, "utf-8")
        const rows = fileContents.split(os.EOL)
        const headerRow = rows[0];
        const keys = headerRow.split(delimiter || ",")
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(delimiter || ",");
            const jsonObject: Record<any, any> = {};
            for (let j = 0; j < keys.length; j++) {
                jsonObject[keys[j]] = row[j];
            }
            json.push(jsonObject)
        }

        if (all) {
            return json
        }
        if (random) {
            return json[Math.floor(Math.random() * json.length)];
        }
        if (!key || !value) {
            log.error("If random is false, 'key' & 'value' are required parameters");
            return null;
        }
        return json.filter((el: any) => el[key] === value);
    });
}