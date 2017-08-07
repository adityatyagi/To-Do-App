var configvalues = require('./config');

module.exports = {
    getDBConnectionString: function() {
        return 'mongodb://' + configvalues.uname + ':' + configvalues.pwd + '@ds063946.mlab.com:63946/node-todoapp';
    }
}