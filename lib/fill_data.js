const request = require('supertest');
const fs = require('fs');

request('http://www.omdbapi.com')
    .get('/')
    .query('s=avatar&apikey=93d3d44e')
    .then(res => {
        fs.writeFileSync('./data/avatar_search_info.json', JSON.stringify(res.body))
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });

request('http://www.omdbapi.com')
    .get('/')
    .query('i=tt0499549&apikey=93d3d44e')
    .then(res => {
        fs.writeFileSync('./data/avatar_info.json', JSON.stringify(res.body))
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });

