var fs = require("fs"),
    path = require('path'),
    handlebars = require("handlebars"),    
    loginTemplateFile = fs.readFileSync(path.join(__dirname, '../views/login.html'), 'utf8'),    
    programTemplateFile = fs.readFileSync(path.join(__dirname, '../views/program.html'), 'utf8'),
    homeTemplateFile = fs.readFileSync(path.join(__dirname, '../views/home.html'), 'utf8');    

module.exports = {
    setup: function() {
        handlebars.registerPartial({
            program: programTemplateFile,
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
            homeTemplate: handlebars.compile(homeTemplateFile)
        };
    }
};