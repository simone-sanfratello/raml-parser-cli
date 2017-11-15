'use strict'

const log = require('log-segment')
const parser = require('raml-1-parser')

const raml = {
  parse: function (source) {
    return parser.loadApi(source)
        .then((api) => {
          const errors = api.errors()
          if (errors.length < 1) {
            log.success('', 'RAML syntax ok')
            return
          }

          errors.forEach((err) => {
            if (err.isWarning) {
              log.warning('', `WARNING: ${err.message} at ${err.range.start.line}:${err.range.start.column} in ${err.path}`)
              return
            }
            log.error('', `ERROR: ${err.message} at ${err.range.start.line}:${err.range.start.column} in ${err.path}`)
          })
        })
        .catch((err) => {
          log.error('', err)
        })
  }
}

module.exports = raml
