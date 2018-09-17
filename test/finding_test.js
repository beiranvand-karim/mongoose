const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('finding records', function (done) {

    let char;

    beforeEach(function (done) {
        char = new MarioChar({
            name: 'mario'
        });

        char.save().then(function () {
            done();
        });
    });

    it('finds one record from the database', function (done) {
        MarioChar.findOne({name:'mario'}).then(function (result) {
            assert(result.name === 'mario');
            done();
        })
    });

    it('finds one record by id from the database', function (done) {
        MarioChar.findOne({_id:char._id}).then(function (result) {
            assert(result._id.toString() === char._id.toString());
            done();
        })
    });
});