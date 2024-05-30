import { LogLevel } from "bunyan"
import { array, assign, concat, csvcamoflageHelper, importMock, inject, is, now, numBetween, random, unregisterInject } from "./core"
import { log } from "./utils/logger"
import bunyan from 'bunyan'
import Handlebars from "handlebars"
/**
 * Creates a Helper class which exposes methods
 * - To register/unregister helpers
 * - To add/remove custom helpers
 * - To enable/disable inject helper
*/
export default class Helpers {
    private injectionAllowed: boolean = false
    /**
     * @param {boolean} injectionAllowed Allow injection to be enabled at the instantiation
     * @param {LogLevel | "off"} loglevel Configure loglevel, off by default
    */
    constructor(injectionAllowed?: boolean, loglevel?: LogLevel | "off") {
        if (loglevel) {
            if (loglevel !== "off") {
                log.level(loglevel)
            } else {
                log.level(bunyan.FATAL + 1)
            }
        } else {
            log.level("info")
        }
        if (injectionAllowed) this.injectionAllowed = injectionAllowed
        this.registerDefaultHelpers()
    }
    /**
     * Registers all the default helpers and conditionally registers inject helper
     * @returns {void}
     */
    private registerDefaultHelpers = (): void => {
        array()
        assign()
        concat()
        csvcamoflageHelper()
        importMock()
        is()
        now()
        numBetween()
        random()
        if (this.injectionAllowed) {
            inject()
        }
    }
    /**
     * Allow registration of a custom helper:
     * @param {string} name the name which will be used to register the custom helper
     * @param {Handlebars.HelperDelegate} fn the function that defines the behavior of the custom helper
     * @returns {void}
     */
    public addHelper = (name: string, fn: Handlebars.HelperDelegate): void => {
        Handlebars.registerHelper(name, fn)
    }
    /**
     * Allow removal of a registered custom helper:
     * @param {string} name the name with which a helper was previously registered
     * @returns {void}
     */
    public removeHelper = (name: string): void => {
        Handlebars.unregisterHelper(name)
    }
    /**
     * Parses a provided template to a string using an optional context
     * @param {string} content template to be compiled and parsed
     * @param {Record<any, any> = {}} contextVariables json object containing additional context variables
     * @returns {string}
     */
    public parse = (content: string, contextVariables: Record<any, any> = {}): string => {
        const template = Handlebars.compile(content)
        return template(contextVariables).trim()
    }
    /**
     * Allows enabling/disabling of inject helper
     * @param allowed enable or disable injection after instantiation
     * @returns {void}
     */
    public setInjectionAllowed = (allowed: boolean): void => {
        this.injectionAllowed = allowed
        if (this.injectionAllowed) {
            inject()
        } else {
            unregisterInject()
        }
    }
}