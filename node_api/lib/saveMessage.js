var cradle = require('cradle');
var db = (new cradle.Connection()).database('docker_demo');

module.exports = saveMessage;
function saveMessage(message, callback) {
    var doc = {
        message: message,
        timestamp: new Date().toISOString()
    };
    console.log('Saving doc:', doc);
    return db.save(doc, callback);
}
