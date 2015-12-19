var fs = require("fs"),
    path = require('path'),
    handlebars = require("handlebars"),    
    loginTemplateFile = fs.readFileSync(path.join(__dirname, '../views/login.html'), 'utf8'),
    errorTemplateFile = fs.readFileSync(path.join(__dirname, '../views/error.html'), 'utf8');    

module.exports = {
    setup: function() {
        handlebars.registerPartial({
        });

        handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        });

        return {
            loginTemplate: handlebars.compile(loginTemplateFile),
            errorTemplate: handlebars.compile(errorTemplateFile)
        };
    }
};