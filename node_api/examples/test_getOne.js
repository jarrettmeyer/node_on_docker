var getMessageById = require('../lib/getMessageById');

var id = process.argv[process.argv.length - 1];

getMessageById(id, function (error, result) {
    if (error) {
        return console.error(error);
    }
    console.log(result);
});
