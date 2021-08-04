# Museum visitors api

Please get link from  : 
(https://data.lacity.org/profile)

Make sure you keep up the api keys in config according to environment like `development`, `production` etc. whatever conforms to `npm config` package. 

## Start up:

1. `npm install` //Install packages

2. `npm run dev` //for development run

3. `npm start` //for prod run

4. Runs at `http://localhost:3000/`

## API 
### Get visitors attendance

```sh
GET: http://localhost:3000/api/visitors?date=1404198000
```
##### Given:
● A date in milliseconds.
● (Optional) museum to ignore [Todo]

##### It will return:
● The month of the search
● The year of the search
● The total visitors for the month, not counting the ignored museum
● The museum with the highest number of visitors, not counting the ignored museum
● The museum with the lowest number of visitors, not counting the ignored museum
● The ignored museum.

## Query builder
Uses custom query builder service to create a SoQl query that query specific results from museum api.
Call `buildQuery` while appropriate parameter as follows. The syntax and semantics of building a query is inspired from mongoDB queries.

`$and` collects constraints that needs to be 'anded'
```
for eg : [{
          month : {
            $gte : <DateValue1>
          },
        }, {
          month : {
            $lte : <DateValue2>
          },
        }]
```
will turn to 

```
select * where ((`month` >= <dateValue1> and `month` <= <<dateValue2>))
```

The query is build in a hook. A `pre-handler` hook works like a middleware.
Once we build the query, assign it to request so that the controller/handler will do the third party request and format the response.

## Unit tests
![Alt text](tests.png?raw=true "Title")
Please refer `/tests` to get all the options currently implemented. 

## Example screenshot
![Alt text](example.gif?raw=true "Title")
