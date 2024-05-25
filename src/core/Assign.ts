import Handlebars from 'handlebars'
import { log } from '../utils/logger'
export const assign = () => {
    Handlebars.registerHelper("assign", (context: any) => {
        log.debug(`name: ${context.hash.name}`)
        log.debug(`value: ${context.hash.value}`)
        if (!context.hash.name || !context.hash.value) {
            log.error("name or value not specified.");
            return;
        } else {
            context.data.root[context.hash.name] = context.hash.value;
            log.debug(`Assigned Value ${context.hash.value} to ${context.hash.name}`)
        }
    });
}