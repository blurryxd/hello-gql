// server.js
'use strict';
require('dotenv').config();

const db = require('./db/db');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const port = 3000;
const app = express();


// dummy function to set user (irl: e.g. passport-local)
const auth = (req, res, next) => {
    req.user = true;
    next();
};

// dummy function to check authentication (irl: e.g. passport-jwt)
const checkAuth = (req, res) => {
    console.log('user', req.user);
    if (!req.user)
        throw new Error('Not authenticated');
};

app.use(auth);

app.use(
    '/graphql', (req, res) => {
        graphqlHTTP({
            schema: MyGraphQLSchema,
            graphiql: true,
            context: {req, res, checkAuth},
        })(req, res);
    });


db.on('connected', () => {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
