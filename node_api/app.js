var bodyParser = require('body-parser');
var express = require('express');
var onStartup = require('./lib/onStartup');
var program = require('commander');
var saveMessage = require('./lib/saveMessage');

function int(value) {
    return parseInt(value, 10);
}

program
    .option('--port <value>', 'Express port', int, 3000)
    .parse(process.argv);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
onStartup(function (error, result) {
    if (error) {
        console.error('Error in onStartup function: ', error);
    } else {
        console.log('Finished onStartup:', result);
    }
});

function handleCallback(response, error, result) {
    if (error) {
        console.error(error);
        return response.status(500).json(error);
    }
    return response.status(200).json(result);
}

app.get('/', function (request, response) {
    return response.status(200).json({
        message: 'Hello World!',
        timestamp: new Date().toISOString()
    });
});

app.post('/messages', function (request, response) {
    console.log(request.body);
    return saveMessage(request.body.message, function (error, result) {
        return handleCallback(response, error, result);
    });
});

var server = app.listen(program.port, function () {
    var address = server.address().address  ;
    var port = server.address().port;
    console.log('Node server listening at %s:%s', address, port);
});
