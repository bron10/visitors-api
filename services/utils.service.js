/**
 * 
 * @param {*} data 
 * @returns data that is trimmed and converted to a string
 */
const trimStrValue = (data) => {
    return String(data).trim()
}

const trimNumValue = (data) => {
    return Number(trimStrValue(data))
}


module.exports = {trimStrValue, trimNumValue}