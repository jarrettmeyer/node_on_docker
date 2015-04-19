var db = require('./getDatabase')();

module.exports = saveMessage;
function saveMessage(message, callback) {
    var doc = {
        message: message,
        timestamp: new Date().toISOString()
    };
    console.log('Saving doc:', doc);
    return db.save(doc, function (error, result) {
        if (error) {
            console.error(error);
            return callback(error, null);
        }
        doc._id = result._id;
        doc._rev = result._rev;
        return callback(null, doc);
    });
}
