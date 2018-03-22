import test from 'ava'
import tango from './tango'

const fs = require('fs')

const sample = require('./result-sample.json').text

test('parse text to JSON', t => {
  const result = tango.parse(sample)
  t.is(result.length, 29)
})

test('scrape', async t => {
  const data = await tango.scrape('paris')

  fs.writeFileSync('events.json', JSON.stringify(data))
  t.is(data.length > 300, true)
})
