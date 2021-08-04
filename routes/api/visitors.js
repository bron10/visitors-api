'use strict'
const {visitorHandler} = require('../../handlers/visitors.handlers')
module.exports = async function (fastify, opts) {

  /**
   * @api {get} /api/visitors get attendance details of all visitors
   * @apiName get
   * @apiGroup URL
   *
   * @apiQuery {date} date as timestamp for eg : 1404198000
   *
   * @apiSuccess (200) {JSON} {attendance : {month, year, highest, lowest, total}}
   * @apiSuccess (200) {JSON} {attendance : [{month, year, highest, lowest, total}]} without query param
   * @apiSuccess (200) {JSON} {attendance : []} no data present
   * @apiError (400) {ERROR}
   */
  fastify.get('/visitors', visitorHandler)
}
