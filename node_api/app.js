var bodyParser = require('body-parser');
var express = require('express');
var getMessageById = require('./lib/getMessageById');
var getMessages = require('./lib/getMessages');
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
app.use(logErrors);

onStartup(function (error) {
    if (error) {
        console.error('Error in onStartup function: ', error);
    } else {
        console.log('Finished onStartup.');
    }
});

function handleCallback(response, error, result) {
    if (error) {
        console.error(error);
        return response.status(500).json(error);
    }
    return response.status(200).json(result);
}

function logErrors(error, request, response, next) {
    console.error(error.stack);
    next(error);
}

app.get('/', function (request, response) {
    return response.status(200).json({
        message: 'Hello World!',
        timestamp: new Date().toISOString()
    });
});

app.get('/messages', function (request, response) {
    return getMessages(function (error, result) {
        return handleCallback(response, error, result);
    });
});

app.get('/messages/:id', function (request, response) {
    return getMessageById(request.params.id, function (error, result) {
        return handleCallback(response, error, result);
    });
});

app.post('/messages', function (request, response) {
    return saveMessage(request.body.message, function (error, result) {
        return handleCallback(response, error, result);
    });
});

var server = app.listen(program.port, function () {
    var address = server.address().address  ;
    var port = server.address().port;
    console.log('Node server listening at %s:%s', address, port);
});
