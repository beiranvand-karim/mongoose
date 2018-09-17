const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('deleting records', function () {

    let char;

    beforeEach(function (done) {
        char = new MarioChar({
            name: 'mario'
        });

        char.save().then(function () {
            done();
        });
    });

    it('delete one record from the database', function (done) {
        MarioChar.findOneAndDelete({name: 'mario'}).then(function () {
            MarioChar.findOne({name: 'mario'}).then(function (result) {
                assert(result === null);
                done();
            })
        })
    });
});