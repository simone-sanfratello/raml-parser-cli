'use strict'

const parser = require('raml-1-parser')

const raml = {
  parse: function (source) {
    return new Promise((resolve) => {
      parser.loadApi(source)
        .then((api) => {
          const errors = api.errors()
          if (errors.length < 1) {
            resolve(null)
            return
          }

          const _errors = errors.map((err) => {
            if (err.isWarning) {
              return {warning: `${err.message} at ${err.range.start.line}:${err.range.start.column} in ${err.path}`}
            }
            return {error: `${err.message} at ${err.range.start.line}:${err.range.start.column} in ${err.path}`}
          })
          resolve(_errors)
        })
        .catch((err) => {
          resolve([{error: err.message}])
        })
    })
  }
}

module.exports = raml
