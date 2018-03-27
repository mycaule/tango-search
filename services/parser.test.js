import test from 'ava'
import parser from './parser'

// -TODO Test files in /NLP patterns using https://docs.nodejitsu.com/articles/file-system/how-to-read-files-in-nodejs/

test('dayList parser', t => {
  t.deepEqual(parser.dayList('-------\nmercredi 14 juin 2017\n\naaaaa\n-------\njeudi 15 juin 2017\n\nbbbbb\n-------\nvendredi 16 juin 2017\n\nccccc'), {
    'mercredi 14 juin 2017': 'aaaaa',
    'jeudi 15 juin 2017': 'bbbbb'
  })
})

test('addressPrices parser', t => {
  t.is(parser.addressPrices('abcd'), null)

  t.deepEqual(parser.addressPrices('Jardin Tino Rossi 75005 Paris Entrée Gratuite.'), {
    price: 0,
    location: {
      address: 'Jardin Tino Rossi',
      city: 'Paris',
      postcode: 75005
    }
  })

  t.deepEqual(parser.addressPrices('4 Impasse Cordon Boussard 75020 Paris Entrée 6 euros'), {
    price: 6,
    location: {
      address: '4 Impasse Cordon Boussard',
      city: 'Paris',
      postcode: 75020
    }
  })

  t.deepEqual(parser.addressPrices('145 rue Oberkampf75011 Paris Entrée 5 euros (7 euros si concert ou démo)'), {
    price: 7,
    location: {
      address: '145 rue Oberkampf',
      city: 'Paris',
      postcode: 75011
    }
  })
})

test('nameTime parser', t => {
  t.deepEqual(parser.nameTime('Flor Nocturna Menilmontant 21:00 à 00:00'), {
    name: 'Flor Nocturna',
    tags: ['milonga'],
    time: {
      begin: '21:00',
      end: '00:00'
    }
  })

  t.deepEqual(parser.nameTime('Pratique la Ruche22:15 à 01:00'), {
    name: 'La Ruche',
    tags: ['practica'],
    time: {
      begin: '22:15',
      end: '01:00'
    }
  })

  t.is(parser.nameTime('abcd'), null)
})

test('stringParse should parse dates', t => {
  t.is(parser.date('abcd'), null)

  t.deepEqual(parser.date('mercredi 14 juin 2017'), {weekday: 'mercredi', day: 14, month: 6, year: 2017, timestamp: 1497398400})
})
