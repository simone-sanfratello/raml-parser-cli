const path = require('path')
const tap = require('tap')
const raml = require('../lib/raml')

const sample = {
  good: path.join(__dirname, 'sample/good.raml'),
  bad: path.join(__dirname, 'sample/bad.raml'),
  none: __dirname,
  url: 'https://raw.githubusercontent.com/raml-apis/XKCD/production/api.raml'
}

tap.test('raml - parse good file and get success', (test) => {
  test.plan(1)

  raml.parse(sample.good)
    .then((messages) => {
      test.equal(messages, null)
    })
})

tap.test('raml - parse bad file and get 3 messages', (test) => {
  test.plan(1)

  raml.parse(sample.bad)
    .then((messages) => {
      test.equal(messages.length, 3)
    })
})

tap.test('raml - parse not existing file and get err message', (test) => {
  test.plan(1)

  raml.parse(sample.none)
    .then((messages) => {
      test.equal(messages.length, 1)
    })
})

tap.test('raml - parse good url and get success', (test) => {
  test.plan(1)

  raml.parse(sample.url)
    .then((messages) => {
      test.equal(messages, null)
    })
})
