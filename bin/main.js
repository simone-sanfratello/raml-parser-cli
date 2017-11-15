#!/usr/bin/env node
'use strict'

const log = require('log-segment')
const raml = require('../lib/raml')

// get args
const _file = process.argv[2]

if (!_file) {
  log.error('', 'missing arg file')
  log.info('', `use: ${process.argv[1]} file`)
  process.exit(-1)
}

raml.parse(_file)
