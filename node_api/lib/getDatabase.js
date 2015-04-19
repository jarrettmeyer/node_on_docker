var connectToCouchDB = require('./connectToCouchDB');
var pkg = require('../package.json');

module.exports = getDatabase;
function getDatabase() {
    var connection = connectToCouchDB();
    return connection.database(pkg.config.couchdb.database);
}
