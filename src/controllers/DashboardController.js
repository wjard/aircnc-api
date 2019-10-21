//Por boas práticas um controller deve ter nom máximo os métodos abaixo:
//index, show, store, update, destroy

const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async show(req, res) {
        const { user_id } = req.headers;

        if (!user_id){
            res.status(404).json({message: "User not exists"});
        }
        const spots = await Spot.find({ user: user_id });

        return res.json(spots);
    },    
};