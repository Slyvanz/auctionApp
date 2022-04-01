// Query resolvers
const Query = require('./queries/Query');
const User = require('./queries/User');
const Item = require('./queries/Item');


// Mutation resolvers
const Mutation = require('./mutation/index');


module.exports = {
    Query,
    Mutation,
    User,
    Item
};
