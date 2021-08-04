const {trimStrValue, trimNumValue} = require('./utils.service');

function getSoqlQuery(){
    this.space = ' ';
    this.selectors = `select *${this.space}`;
    this.constraints = `where${this.space}`;
    this.defaultOperator = {
        $gte : "",
        $lte : ""
    }
    this.defaultConstraints = {
        $and : [],
        $limit : 10
    }

    this.getOpAndValue = (condition) => {
        const {$gte, $lte} = {...this.defaultOperator , ...condition};
        let operator = '=';
        let value = '';
        if($gte){
            operator =  `>=`
            value = $gte
        }
        if($lte){
            operator =  `<=`
            value = $lte
        }
        return {operator, value}
    }

    this.setAndConstraint  = (queryList) => {
        let constraintStr = ``
        for(let query of queryList){
            for(let constraint in query){
                let condition = query[constraint];
                if(constraintStr){
                    constraintStr+=`${this.space}and${this.space}`
                }
                
                if(typeof condition === 'string'){
                    let value = trimStrValue(condition);
                    constraintStr+=`${constraint} = '${value}'${this.space}`
                }

                if(typeof condition === 'object'){
                    let {operator, value} = this.getOpAndValue(condition);
                    value = `'${trimStrValue(value)}'`;
                    
                    constraintStr+=`${constraint} ${operator} ${value}${this.space}`
                }
            }    
        }
        return constraintStr;
    }

    this.setLimit = (limit) =>{
        limit = trimNumValue(limit);
        let query = `limit${this.space}`
        
        return `${query}${limit}`;
    }

    this.buildQuery = (rawQuery) => {
        const {defaultConstraints, selectors, constraints, setAndConstraint, setLimit} = this;
        const keys = Object.keys(rawQuery);
        const {$and, $limit} = {...defaultConstraints, ...rawQuery}
        let qConstraints = ``;
        if($and.length){
            qConstraints +=`${constraints}${setAndConstraint($and)}`;
        }
        
        return `${selectors}${qConstraints}${setLimit($limit)}`
    }
}

const {buildQuery} = new getSoqlQuery
module.exports = {buildQuery}