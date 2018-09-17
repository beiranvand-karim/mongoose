const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(function (done) {

    mongoose.connect('mongodb://localhost/testaroo', { useNewUrlParser: true } ).then(null);
    mongoose.connection.once('open', function () {
        console.log('connection has been made.');
        done();
    }).on('error', function (error) {
        console.log('connection error: ', error);
    });

});

beforeEach(function (done) {
    mongoose.connection.collections.mariochars.drop(function () {
        done();
    });
});
