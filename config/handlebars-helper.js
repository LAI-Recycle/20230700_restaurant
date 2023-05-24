const Handlebars = require('handlebars')

Handlebars.registerHelper('is', (a, b, options) => { 
  if (a === b) {
    return options.fn(this) 
  }
  return options.inverse(this) 
})