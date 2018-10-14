import test from 'ava'
import algoliasearch from 'algoliasearch'
import tango from './tango'

const sample = require('./result-sample.json').text

test('parse text to JSON', t => {
  const result = tango.parse(sample)
  t.is(result.length, 29)
})

test('scrape', async t => {
  const data = await tango.scrape('paris')

  const algolia = algoliasearch('BO057QIXYN', process.env.ALGOLIA_API_KEY)
  const index = algolia.initIndex('tango')

  const t1 = await index.clearIndex()
  //const t2 = await index.addObjects(data)
  
  //console.log('Updating Algolia index...', t1.updatedAt)
  //t.is(data.length > 100, true)
  //t.is(data.length, t2.objectIDs.length)
  
  index.addObjects(data, function(error, content) {
    if (error) {
      console.error(error);
    } else {
      console.log('Updating Algolia index...', t1.updatedAt)
      t.is(data.length > 100, true)
      t.is(data.length, content.objectIDs.length)
    }
  })
})
