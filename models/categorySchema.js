'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: String,
});

module.exports = mongoose.model('Category', categorySchema);