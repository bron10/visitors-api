const {getAttendance} = require('../services/visitors.service');
const visitorHandler = async function (request, reply) {
    const {qs} = request;
    const attendance = await getAttendance(qs)
    return {attendance}
}

module.exports = {visitorHandler}