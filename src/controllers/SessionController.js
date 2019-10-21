//Por boas práticas um controller deve ter nom máximo os métodos abaixo:
//index, show, store, update, destroy

const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.find({ });

        return res.json(users);
    },
    async store(req, res) {
        console.log(req.body);
        const { email, name } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email,
                name
            });
        }

        return res.json(user);
    }    
};