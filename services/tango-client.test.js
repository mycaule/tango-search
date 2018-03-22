import test from 'ava'
import tango from './tango-client'

const sample = require('./result-sample.json').text

test('parse text to JSON', t => {
  const result = tango.parse(sample)
  // Const date1 = 'mercredi 14 juin 2017'
  console.log(result)
  t.is(1, 1)
  // Expect(_.keys(result)).toContain(date1)
  // expect(result[date1].length).toBe(9)
  // expect(_.keys(_.sample(result[date1]))).toContain('location', 'name', 'price', 'time')
  // expect(_.keys(_.sample(result[date1]).location)).toContain('address', 'city', 'postcode')
  // expect(_.keys(_.sample(result[date1]).time)).toContain('begin', 'end')

  // const date2 = 'jeudi 15 juin 2017'
  // Expect(result[date2].length).toBe(6)
})

test('scrape', async t => {
  const data = await tango.scrape('paris')
  console.log(data)

  t.is(1, 1)
})
