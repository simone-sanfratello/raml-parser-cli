#!/usr/bin/env node
'use strict'

const log = require('log-segment')
const raml = require('../lib/raml')

log.set({
  format: '{marker} {message}'
})

const _file = process.argv[2]

if (!_file) {
  log.error('RAML', 'missing arg file')
  log.info('RAML', `use: ${process.argv[1]} file`)
  process.exit(-1)
}

raml.parse(_file)
  .then((messages) => {
    if (!messages) {
      log.success('RAML', 'RAML syntax ok')
      process.exit(0)
    }

    for (const message of messages) {
      if (message.error) {
        log.error('RAML', 'ERROR:', message.error)
        continue
      }
      log.warning('RAML', 'WARNING:', message.warning)
    }
    process.exit(-1)
  })
