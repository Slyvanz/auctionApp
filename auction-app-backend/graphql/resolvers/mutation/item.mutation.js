module.exports = {
    createItem: async (parent, {data: {name, price, priceIncrease}}, {Item}) => {
        return await new Item({
            name,
            price,
            priceIncrease
        }).save();
    }
};
