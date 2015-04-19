var getDatabase = require('./getDatabase');

module.exports = getMessages;
function getMessages(callback) {
    var db = getDatabase();
    db.view('app/messages', { 'include_docs': true, 'descending': true }, function (error, result) {
        if (error) {
            console.error(error);
            return callback(error, null);
        }
        return callback(null, result.toArray());
    });
}
