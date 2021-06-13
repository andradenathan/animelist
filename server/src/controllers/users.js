const Auth = require('../config/auth');
const User = require('../models/user');
const Anime = require('../models/anime');
require('../config/dotenv');

const getUserAnimes = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {include: [{as: "animeList", 
            model: Anime}]});

        return res.status(200).json({user});
        
    } catch(err) {
        return res.status(500).json(err + "!");
    }
}

const create = async(req, res) => {
    const generateHash = Auth.generateHash(req.body.password);
    const salt = generateHash.salt;
    const hash = generateHash.hash;

    const data = {
        username: req.body.username,
        email: req.body.email,
        salt: salt,
        hash: hash,
        date_of_birth: req.body.date_of_birth,
        photo: process.env.APP_URL + "/uploads/" + req.file.filename
    }

    try {
        const user = await User.create(data);
        return res.status(201).json({user});
        
    } catch(err) {
        return res.status(500).json(err + "!");
    }
}

const index = async(req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({users});
    } catch(err) {
        return res.status(500).json({err});
    }
}

const show = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        return res.status(200).json({user});
    } catch(err) {
        return res.status(500).json({err});
    }
}

const update = async(req, res) => {
    try {
        const token = Auth.getToken(req);
        const user = Auth.user(token);
        const [updated] = await User.update(req.body, {where: {id: user.sub}});
        
        if (updated) {
            const user = await User.findByPk(user.sub);
            return res.status(200).json({"success": user});
        }
        throw new Error('User not found');
        
    } catch(err) { 
        return res.status(500).json({err});
    }
}

const destroy = async(req, res) => {
    try {
        const token = Auth.getToken(req);
        const user = Auth.user(token);
        const deleted = await User.destroy({where: {id: user.sub}});
        if(deleted) {
            return res.status(200).json({"success": "User successfully deleted"});
        } else {
            return res.status(500).json({"error": "User not found"});
        }
    } catch(err) {
        return res.status(500).json({"error": "Internal Server Error"});
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    getUserAnimes
}