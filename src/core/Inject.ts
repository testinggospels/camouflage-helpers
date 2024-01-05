import Handlebars from "handlebars";

export const inject = () => {
    Handlebars.registerHelper("inject", (context: any) => {
        const result = eval(context.fn(this));
        return result;
    });
}