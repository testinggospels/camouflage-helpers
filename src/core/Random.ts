
import { v4 as uuidv4 } from "uuid";
import Handlebars from "handlebars";

export const random = () => {
    Handlebars.registerHelper("random", (context: any) => {
        const length = typeof context.hash.length === "undefined" ? 16 : context.hash.length;
        let type = typeof context.hash.type === "undefined" ? "ALPHANUMERIC" : context.hash.type;
        if (context.hash.uppercase && type.includes("ALPHA")) {
            type = type + "_UPPER";
        }
        if (type === "UUID") {
            return uuidv4();
        } else {
            return randomString(length, genCharArray(type));
        }
    });
}
const randomString = (length: number, chars: string): string => {
    let result = "";
    if (typeof chars === "undefined") {
        randomFixedInteger(length);
    } else {
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};
const randomFixedInteger = (length: number): number => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
};
const genCharArray = (type: string): string => {
    let alphabet;
    /**
     * Create a numbers array of [0...9]
     */
    const numbers = [...Array(10)].map((x, i) => i);
    switch (type) {
        case "ALPHANUMERIC":
            /**
             * If type is ALPHANUMERIC, return a string with characters [a-z][A-Z][0-9]
             * */
            alphabet = [...Array(26)].map((x, i) => String.fromCharCode(i + 97) + String.fromCharCode(i + 65));
            return alphabet.join("") + numbers.join("");
        case "ALPHANUMERIC_UPPER":
            /**
             * If type is ALPHANUMERIC_UPPER, return a string with characters [A-Z][0-9]
             */
            alphabet = [...Array(26)].map((x, i) => String.fromCharCode(i + 65));
            return alphabet.join("") + numbers.join("");
        case "ALPHABETIC":
            /**
             * If type is ALPHABETIC, return a string with characters [a-z][A-Z]
             */
            alphabet = [...Array(26)].map((x, i) => String.fromCharCode(i + 97) + String.fromCharCode(i + 65));
            return alphabet.join("");
        case "ALPHABETIC_UPPER":
            /**
             * If type is ALPHABETIC_UPPER, return a string with characters [A-Z]
             */
            alphabet = [...Array(26)].map((x, i) => String.fromCharCode(i + 65));
            return alphabet.join("");
        case "NUMERIC":
            /**
             * If type is NUMERIC, return a string with characters [0-9]
             */
            return numbers.join("");
        default:
            return ""
            break;
    }
};