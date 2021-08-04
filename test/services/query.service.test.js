const { test } = require('tap')
const moment = require('moment')
const {buildQuery} = require('../../services/query.service')
const {DATEFORMAT} = require('config')

test('Method: buildQuery for singleDate', async (t) => {
  let insertDate =  moment().startOf('month').format(DATEFORMAT);
  t.equal(buildQuery({
    $and : [{
      month : insertDate
    }]
  }), `select * where month = '${insertDate}' limit 10`)
})

test('Method: buildQuery for conditional singleDate', async (t) => {
  let insertDate =  moment().startOf('month').format(DATEFORMAT);
  t.equal(buildQuery({
    $and : [{
      month : {
        $lte : insertDate
      }
    }]
  }), `select * where month <= '${insertDate}' limit 10`)
})

test('Method: buildQuery for conditional range-Date', async (t) => {
  let lte =  moment().startOf('month').format(DATEFORMAT);
  let gte =  moment.unix('1404198000').startOf('month').format(DATEFORMAT);
  t.equal(buildQuery({
    $and : [{
      month : {
        $lte : lte
      }
    }, {
      month : {
        $gte : gte
      }
    }]
  }), `select * where month <= '${lte}'  and month >= '${gte}' limit 10`)
})