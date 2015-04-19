var connectToCouchDB = require('./connectToCouchDB');
var pkg = require('../package.json');
var views = require('../ddocs/app.js');

var connection;
var databaseName = pkg.config.couchdb.database;
var db;

module.exports = onStartup;
function onStartup(callback) {
    connection = connectToCouchDB();
    checkDatabaseExists(callback);
}

function checkDatabaseExists(callback) {
    db = connection.database(databaseName);
    db.exists(function (error, exists) {
        if (error) {
            console.error(error);
            return callback(error, null);
        }
        if (exists) {
            console.log('Database %s already exists.', databaseName);
            return createViews(callback);
        }
        console.log('Database %s does not exist.', databaseName);
        return createDatabase(callback);
    })
}

function createDatabase(callback) {
    db = connection.database(databaseName);
    db.create(function (error) {
        if (error) {
            console.error(error);
            return callback(error, null);
        }
        console.log('Successfully created database %s.', databaseName);
        return createViews(callback);
    });
}

function createViews(callback) {
    db.save(views, function (error, result) {
        if (error) {
            console.error(error);
            return callback(error, null);
        }
        console.log('Successfully created view %s.', views._id);
        return callback(null, result);
    });
}
