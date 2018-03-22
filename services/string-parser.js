module.exports = {
  nameTime: nameTimeParser,
  addressPrices: addressPricesParser,
  date: dateParser,
  dayList: dayListParser
}

const LINEBREAK = '\n'
const SEPARATOR = '-------'

function dayListParser(str) {
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

function nameTimeParser(str) {
  const re = /\d\d:\d\d.*/i
  const found = str.match(re)

  if (found) {
    const times = found[0].split(' à ')

    return {
      name: str.slice(0, found.index).trim(),
      time: {
        begin: times[0].trim(),
        end: times[1].trim()
      }
    }
  }
  return null
}

function addressPricesParser(str) {
  const re1 = /Entrée.*/i
  const found1 = str.match(re1)

  if (found1) {
    const location = str.slice(0, found1.index).trim()

    const re2 = /( |[a-zA-Zé])\d+ /i
    const found2 = location.match(re2)

    if (found2) {
      return {
        price: found1[0].trim(),
        location: {
          address: location.slice(0, found2.index + 1).trim(),
          city: location.slice(found2.index + found2[0].length).trim(),
          postcode: found2[0].replace(/\D/g, '')
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

function dateParser(str) {
  const arr = str.split(' ')

  if (arr.length === 4) {
    return {
      weekday: arr[0],
      day: parseInt(arr[1], 10),
      month: arr[2],
      year: parseInt(arr[3], 10)
    }
  }
  return null
}
