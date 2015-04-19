var onStartup = require('../lib/onStartup');
onStartup(function (error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
    }
});
