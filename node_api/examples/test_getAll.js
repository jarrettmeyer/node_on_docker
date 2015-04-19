var getMessages = require('../lib/getMessages');

getMessages(function (error, result) {
    if (error) {
        return console.error(error);
    }
    console.log(result);
});
