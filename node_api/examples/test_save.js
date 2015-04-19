var saveMessage = require('../lib/saveMessage');

for (var i = 0; i < 5; i += 1) {
    saveMessage('Hello World!', function (error, result) {
        if (error) {
            return console.error(error);
        }
        console.log('Saved message.', result);
    });
}
