//Por boas práticas um controller deve ter nom máximo os métodos abaixo:
//index, show, store, update, destroy

const Spot = require('../models/Spot');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        if (!tech || tech.length == 0){
            res.status(400).json({message: "tech filter invalid"});
        }
        const spots = await Spot.find({ techsindex: tech.trim().toLowerCase().replace(/[^a-z0-9]/gi,'') });

        return res.json(spots);
    },
    async store(req, res) {
        console.log(req.body);
        //console.log(req.file);

        const { filename } = req.file;
        let { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User does not exists" });
        }

        let spot = await Spot.findOne({ company: company });
        if (spot) {
            console.log('Spot already exists');

            var filedel = path.resolve(__dirname, '..', '..', 'uploads', filename);
            fs.unlink(filedel, (err) => {
                if (err) {
                    console.log(`error deleted ${filedel} - ${err}`);
                    //throw err;
                }
                console.log(`successfully deleted ${filedel}`);
            });

            return res.json(spot);
        }

        techs = techs.split(',').map(t => t.trim());

        spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs,
            techsindex: techs.map(t => t.toLowerCase().replace(/[^a-z0-9]/gi,'')),
            price
        });

        return res.json(spot);
    },
};