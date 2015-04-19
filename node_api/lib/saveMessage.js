var db = require('./getDatabase')();

module.exports = saveMessage;
function saveMessage(message, callback) {
    var doc = {
        message: message,
        timestamp: new Date().toISOString()
    };
    console.log('Saving doc:', doc);
    return db.save(doc, callback);
}
