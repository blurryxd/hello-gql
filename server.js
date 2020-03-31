// server.js
'use strict';
require('dotenv').config();

const db = require('./db/db');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const port = 3000;
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/pass');

const app = express();


app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


// dummy function to check authentication (irl: e.g. passport-jwt)
const checkAuth = (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err || !user){
            throw new Error('Not authed');
        }
    })(req, res);
};

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
