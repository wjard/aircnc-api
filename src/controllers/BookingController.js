//Por boas práticas um controller deve ter nom máximo os métodos abaixo:
//index, show, store, update, destroy

const Booking = require('../models/Booking');
const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User does not exists" });
        }

        const spot = await Spot.findById(spot_id);
        if (!spot) {
            return res.status(404).json({ message: "Spot does not exists" });
        }

        let booking = await Booking.findOne({ spot: spot_id, user: user_id });
        if (!booking) {
            booking = await Booking.create({
                user: user_id,
                spot: spot_id,
                date,
            });
        }

        await booking
            .populate('spot')
            .populate('user')
            .execPopulate();

        if (booking.spot) {
            await booking.spot.populate('user').execPopulate();
        }

        return res.json(booking);
    },
};