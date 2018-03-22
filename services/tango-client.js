const axios = require('axios')
const cheerio = require('cheerio')

const _ = require('lodash')

const parser = require('./string-parser')

const tango = axios.create({
  baseURL: 'http://tango-argentin.fr',
  timeout: 3000
})

const LINEBREAK = '\n'
const SEPARATOR = '-------'

const parse = str => {
  const resObj = parser.dayList(str)
  Object.keys(resObj).forEach(k => {
    resObj[k] = _.chain(resObj[k].split('\n'))
      .chunk(2)
      .map(x => {
        const nameTime = parser.nameTime(x[0])
        const addressPrices = parser.addressPrices(x[1])

        if (nameTime && addressPrices) {
          return {
            name: nameTime.name,
            date: k,
            time: nameTime.time,
            location: addressPrices.location,
            price: addressPrices.price
          }
        }
        return {
          name: x[0],
          address: x[1]
        }
      })
      .value()
  })

  return resObj
}

const cleanList = text => {
  let result = text.trim().replace(/En savoir plus/g, '').replace(/ \n *\n/g, '').replace(/ {2}/g, '').replace(/-de /g, '').replace(/^ /g, '')
  result = result
    .replace(/lundi/g, `${SEPARATOR + LINEBREAK}lundi `)
    .replace(/mardi/g, `${SEPARATOR + LINEBREAK}mardi `)
    .replace(/mercredi/g, `${SEPARATOR + LINEBREAK}mercredi `)
    .replace(/jeudi/g, `${SEPARATOR + LINEBREAK}jeudi `)
    .replace(/vendredi/g, `${SEPARATOR + LINEBREAK}vendredi `)
    .replace(/samedi/g, `${SEPARATOR + LINEBREAK}samedi `)
    .replace(/dimanche/g, `${SEPARATOR + LINEBREAK}dimanche `)
    .replace(/ {2}/g, ' ')
    .replace(/^ /g, '')
  result = result
    .replace(/ euros\.*$/g, 'E\n')
    .replace(/Gratuite\.*$/g, '0E\n')
  return result
}

const scrape = city =>
  tango.get(`/${city}`).then(res => {
    const $ = cheerio.load(res.data)
    const list = parse(cleanList($('table td').text()))

    return {
      status: 200,
      list,
      err: null
    }
  }).catch(err => {
    return {
      status: 500,
      err
    }
  })

module.exports = {
  scrape,
  parse
}
