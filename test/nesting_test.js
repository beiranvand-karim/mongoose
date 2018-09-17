const assert = require('assert');
const Author = require('../models/author');
const mongoose = require('mongoose');


describe('nesting records', function () {

    beforeEach(function (done) {
        mongoose.connection.collections.authors.drop(function () {
            done();
        });
    });

    it('creates an author with sub-documents', function (done) {
        let pat = new Author({
            name: 'Patrick Ruthfuss',
            books: [
                {
                    title: 'Name of the Wind',
                    pages: 400
                }
            ]
        });

        pat.save().then(function () {
            Author.findOne({name: 'Patrick Ruthfuss'}).then(function (record) {
                assert(record.books.length === 1);
                done();
            })
        });
    });

    it('adds a book to an author', function (done) {
        let pat = new Author({
            name: 'Patrick Ruthfuss',
            books: [
                {
                    title: 'Name of the Wind',
                    pages: 400
                }
            ]
        });

        pat.save().then(function () {
            Author.findOne({name: 'Patrick Ruthfuss'}).then(function (records) {

                records.books.push({
                    title: 'wise man\'s fear',
                    pages: 500
                });

                records.save().then(function () {
                    Author.findOne({name: 'Patrick Ruthfuss'}).then(function (records) {
                        assert(records.books.length === 2);
                        done();
                    })
                })
            })
        });

    });
});