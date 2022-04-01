const User = {
    items: async (parent, args, { Item }) => {
        return await Item.find({user_id: parent.id});
    },
};

module.exports = User;
