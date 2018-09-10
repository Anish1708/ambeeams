const mongoose = require('mongoose');

const uriTemp = 'mongodb://<dbuser>:<dbpassword>@ds151402.mlab.com:51402/amsambee'
const uri = 'mongodb://root:1q2w3e4r@ds151402.mlab.com:51402/amsambee'
module.exports = {
    connectionString: uri
}
mongoose.connection.on('connected', function() {
    console.log('Mongo connected @ ', uriTemp)
});

mongoose.connection.on('error', function(err) {
    console.log('MONGODB error: ', err)
});