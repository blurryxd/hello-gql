// server.js
'use strict';
require('dotenv').config();

const db = require('./db/db');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const port = 3000;
const app = express();
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/pass');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


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

app.post(auth);
app.use('/auth', authRoute);


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
