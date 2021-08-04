const {CITY_API_ENDPOINT, DATEFORMAT} = require('config');
const fetch = require('node-fetch')
const moment = require('moment')
const {trimNumValue} = require('./utils.service')

const formatAttendance =  (visitorsData) => {
    const defaultData = {
        "month" : "",
        "year" : "",
        "highest" : {
            "museum" : "",
            "visitors" : 0
        },
        "lowest" : {
            "museum" : "",
            "visitors" : 0
        },
        "total" : 0
    }
    
    if(visitorsData.length === 1){
        let highestVisits = 0;
        let lowestVisits = 0;
        let total = 0;
        let highestMuseum = "";
        let lowestMuseum = "";
        let {month, ...others} =  visitorsData[0];
        delete others[":id"];
        
        for(key in others){
            let value = trimNumValue(others[key])
            if(value > highestVisits){
                highestMuseum = key;
                highestVisits = value;
            }

            if(!lowestVisits){
                lowestVisits = value;
                lowestMuseum = key;
            }
            if(value < lowestVisits){
                lowestMuseum = key;
                lowestVisits = value;
            }
            total+= value;
        }
        
        return {...defaultData, ...{
            month : moment(month, DATEFORMAT).format('MMM'),
            year : moment(month, DATEFORMAT).format('YYYY'),
            highest : {
                museum : highestMuseum,
                visitors : highestVisits
            },
            lowest  : {
                museum : lowestMuseum,
                visitors : lowestVisits
            },
            total
        }}
    }

    return visitorsData;
}



const getAttendance = async (qs) => {
    let query =''
    if(qs){
        query = `?$query=${qs}`
    }
    let url = CITY_API_ENDPOINT + query;
    const response  = await fetch(url, {
        method : 'GET',
    })
    const result    = await response.json();
    return formatAttendance(result);
}



module.exports = {
    getAttendance,
    formatAttendance
}