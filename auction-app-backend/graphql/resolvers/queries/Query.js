const Query = {
    user: async (parent, args, { User }) => {
        return await User.findById(args.id);
    },
    users: async (parent, args, { User }) => {
        return await User.find({}).sort({'createdAt': 'desc'});
    },
    activeUser: async (parent, args, {activeUser, User}) => {
        // TODO: FAKE DELAY, akış tamamlandığında mı aksiyon gerçekleşiyor yoksa tamamlanmayı beklemedenmi gerçekleşiyoru test edebilmek için.
        const sleep = ms => new Promise(
            resolve => setTimeout(resolve, ms));
        await sleep(2000);

        if(!activeUser){
            return null;
        }
        return await User.findOne({username: activeUser.username});
    },

    item: async (parent, args, { Item }) => {
        return await Item.findById(args.id);
    },
    items: async (parent, args, { Item }) => {
        return await Item.find({}).sort({'createdAt': 'desc'});
    }
};

module.exports = Query;
