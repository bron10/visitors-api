
'use strict'

const fp = require('fastify-plugin')
const {unix} = require('moment');
const {DATEFORMAT} = require('config');
const {buildQuery} = require('../services/query.service')
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.addHook('preHandler', (request, reply, done) => {
    let {date} = request.query;
    let timeStamp  = Number(String(date).trim())
    let momentMap = unix(timeStamp);
    if(!!timeStamp && momentMap.isValid()){
      request.qs = buildQuery({
        $and : [{
          month : {
            $gte : momentMap.startOf('month').format(DATEFORMAT)
          },
        }, {
          month : {
            $lte : momentMap.endOf('month').format(DATEFORMAT)
          },
        }]
      })
    }
    // some code
    done()
  })
})
