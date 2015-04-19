var getDatabase = require('./getDatabase');

module.exports = getMessageById;
function getMessageById(id, callback) {
    var db = getDatabase();
    db.get(id, function (error, result) {
        if (error) {
            console.error(error);
            return callback(error, null);
        }
        return callback(null, result);
    });
}
