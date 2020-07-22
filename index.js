const express = require('express');
const Database = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));


const database = new Database('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data);
    })
})

app.get('/time', (request, response) => {
    response.send(new Date());
})

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
})

