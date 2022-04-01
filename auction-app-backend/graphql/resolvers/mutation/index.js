const user = require('./user.mutation');
const item = require('./item.mutation');


const Mutation =  {
    ...user,
    ...item,


};

module.exports = Mutation;
