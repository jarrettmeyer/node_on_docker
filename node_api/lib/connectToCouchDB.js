var cradle = require('cradle');
var pkg = require('../package.json');

var connection;

module.exports = connectToCouchDB;
function connectToCouchDB() {
    if (!connection) {
        connection = new cradle.Connection({
            host: getHost(),
            post: pkg.config.couchdb.port
        });
    }
    return connection;
}

function getHost() {
    // First, try to get the host from environment variables.
    var host = process.env['COUCHDB_PORT_5984_TCP_ADDR'];
    if (host) {
        return 'http://' + host;
    }
    return pkg.config.couchdb.host;
}
