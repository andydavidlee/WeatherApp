const express = require('express');
const Database = require('nedb');
const { request, response } = require('express');
const bodyParser = require('body-parser');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(bodyParser.json())
const database = new Database('database.db');
database.loadDatabase();
app.get('/api', (request, response) => {
    database.find({},(err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data);
    })
})
app.post('/api', (request, response) => {
    let data = request.body;
    console.log(data);
    const timestamp = Date.now();
    console.log(timestamp);
    data = {timestamp: timestamp, data};
    database.insert(data);
    response.json(data);
})