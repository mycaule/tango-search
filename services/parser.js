import voca from 'voca'

const SEPARATOR = '-------'
const LINEBREAK = '\n'

const dayList = str => {
  const resObj = {}

  const re10 = new RegExp(`${SEPARATOR + LINEBREAK}.*?${LINEBREAK + LINEBREAK}`, 'g')
  let found10

  while ((found10 = re10.exec(str)) !== null) {
    const day = found10[0].replace(SEPARATOR + LINEBREAK, '').replace(LINEBREAK + LINEBREAK, '')

    const str2 = str.slice(re10.lastIndex)
    const re11 = new RegExp(`${SEPARATOR + LINEBREAK}.*?${LINEBREAK + LINEBREAK}`, 'i')
    const find20 = str2.match(re11)

    if (find20) {
      resObj[day] = str2.slice(0, find20.index).trim()
    }
  }

  return resObj
}

const nameTime = str => {
  const re = /\d\d:\d\d.*/i
  const found = str.match(re)

  if (found) {
    const times = found[0].split(' à ')

    const tags = voca.matches(str, /.*(practica|pratica|pratique).*/i) ? ['practica'] : ['milonga']

    return {
      name: voca.chain(str).slice(0, found.index).replaceAll(/(milonga|practica|pratica|pratique|afterwork|menilmontant)(\s(des|du|de)){0,1}/i, '').trim().capitalize().value(),
      tags,
      time: {
        begin: times[0].trim(),
        end: times[1].trim()
      }
    }
  }
  return null
}
const price = str => {
  const tmp = str.match(/\d+/g)
  const prices = tmp === null ? [0] : tmp.map(Number)
  return Math.max(...prices)
}

const addressPrices = str => {
  const re1 = /Entrée.*/i
  const found1 = str.match(re1)

  if (found1) {
    const location = str.slice(0, found1.index).trim()

    const re2 = /( |[a-zA-Zé])\d+ /i
    const found2 = location.match(re2)

    if (found2) {
      return {
        price: price(found1[0].trim()),
        location: {
          address: location.slice(0, found2.index + 1).trim(),
          city: location.slice(found2.index + found2[0].length).trim(),
          postcode: parseInt(found2[0].replace(/\D/g, ''), 10)
        }
      }
    }
    return {
      price: found1[0].trim(),
      location: {
        address: location
      }
    }
  }
  return null
}

const date = str => {
  const arr = str.split(' ')

  const map = new Map([
    ['janvier', 1],
    ['fevrier', 2],
    ['mars', 3],
    ['avril', 4],
    ['mai', 5],
    ['juin', 6],
    ['juillet', 7],
    ['aout', 8],
    ['septembre', 9],
    ['octobre', 10],
    ['novembre', 11],
    ['decembre', 12]
  ])

  const weekday = arr[0]
  const day = parseInt(arr[1], 10)
  const month = map.get(arr[2])
  const year = parseInt(arr[3], 10)
  const timestamp = new Date(Date.UTC(year, month - 1, day)) / 1000

  if (arr.length === 4) {
    return {
      weekday,
      day,
      month,
      year,
      timestamp
    }
  }
  return null
}

export default {nameTime, addressPrices, date, dayList}
