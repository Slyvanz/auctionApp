const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {ApolloServer} = require('apollo-server-express');
const {importSchema} = require('graphql-import');

const resolvers = require('./graphql/resolvers/index');

const User = require('./graphql/models/User');
const Item = require('./graphql/models/Item');

let activeUser = null;

const server = new ApolloServer({
    typeDefs: importSchema('./graphql/schema.graphql'),
    resolvers,
    context: ({req}) => ({
        User,
        Item,
        activeUser: req.activeUser
    })
});

const {mongoose} = require('./graphql/configs/db.config');

const app = express();

//frontend moduleden headera yolladığımız tokena erişim
app.use(async (req, res, next) => {
    const token = req.headers.authorization;

    //şuanki kullanıcı girişi doğrulaması(birden fazla kez denenirse patlıyor o yüzden giriş yaptıktan sonra tekrar login olamıyor kimse)
    if (token && token !== 'null') {
        try{
            const activeUser = await jwt.verify(token, process.env.SECRET_KEY);
            req.activeUser = activeUser;
            console.log(req.activeUser);
        }catch (e) {
            console.log(e);
        }
    }
    else{
        activeUser = null;
    }
    next();
})

server.applyMiddleware({app});

//serverın ayağa kaldırılması
app.listen({port: 4001}, () => {
    console.log(`Server ready at http://localhost:4001${server.graphqlPath}`);
});
