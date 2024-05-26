import { LogLevel } from "bunyan"
import { array, assign, concat, csvcamoflageHelper, importMock, inject, is, now, numBetween, random, unregisterInject } from "./core"
import { log } from "./utils/logger"
import bunyan from 'bunyan'
import Handlebars from "handlebars"

export default class Helpers {
    private injectionAllowed: boolean = false
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
    private registerDefaultHelpers = () => {
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
    public addHelper = (name: string, fn: Handlebars.HelperDelegate) => {
        Handlebars.registerHelper(name, fn)
    }
    public parse = (content: string, contextVariables: Record<any, any> = {}): string => {
        const template = Handlebars.compile(content)
        return template(contextVariables).trim()
    }
    public setInjectionAllowed = (allowed: boolean) => {
        this.injectionAllowed = allowed
        if (this.injectionAllowed) {
            inject()
        } else {
            unregisterInject()
        }
    }
}