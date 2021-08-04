'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('without data query', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/api/visitors'
  })
  const response = JSON.parse(res.payload)
  t.equal(typeof response.attendance.length, "number")
})

test('with valid data query data', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/api/visitors?date=1404198000'
  })
  
  t.same((res.payload), JSON.stringify({
    "attendance": {
        "month": "Jul",
        "year": "2014",
        "highest": {
            "museum": "avila_adobe",
            "visitors": 32378
        },
        "lowest": {
            "museum": "hellman_quon",
            "visitors": 120
        },
        "total": 60535
    }
  }))
})

test('with in-valid data query data : will settle to default', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/api/visitors?date=140x'
  })
  const response = JSON.parse(res.payload)
  t.equal(typeof response.attendance.length, "number")
})
