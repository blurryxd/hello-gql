'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animalSchema = new Schema({
    id: String,
    animalName: String,
    species: [{type: Schema.Types.ObjectID, ref: 'Species'}],
});

module.exports = mongoose.model('Animal', animalSchema);