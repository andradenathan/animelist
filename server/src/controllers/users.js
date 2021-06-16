const Auth = require('../config/auth');
const path = require('path');
const { validationResult } = require('express-validator');
require('../config/dotenv');

const hbs = require('nodemailer-express-handlebars');
const mail = require('../config/mail');

const User = require('../models/user');
const Anime = require('../models/anime');

const addAnimeToList = async(req, res) => {
    const token = Auth.getToken(req);
    const user = Auth.user(token);
    try {
        const loggedUser = await User.findByPk(user.sub, {include: [{
            as: "animeList", model: Anime}]});
        const anime = await Anime.findByPk(req.params.id);
        const inList = loggedUser.animeList.filter((addedAnime) => {
            if(addedAnime.id == anime.id) return addedAnime;
        });

        if (inList.length !== 0 ) return res.status(200).json("O anime já está na lista!");
        await loggedUser.addAnimeList(anime);
        return res.status(200).json({"success": `The anime ${anime.title} was successfully added into your list!`});
    } catch(err) {
        return res.status(500).json({"error": err + "!"});
    }
}

const removeAnimeFromList = async(req, res) => {
    const token = Auth.getToken(req);
    const user = Auth.user(token);
    try {
        const loggedUser = await User.findByPk(user.sub, {include: [{
            as: "animeList", model: Anime}]});
        const anime = await Anime.findByPk(req.params.id);
        const notInList = loggedUser.animeList.filter((addedAnime) => {
            if (addedAnime.id == anime.id) return addedAnime;
        });
        
        if (notInList.length === 0 ) return res.status(200).json("O anime não está na lista!");
        await loggedUser.removeAnimeList(anime);
        return res.status(200).json({"success": `The anime ${anime.title} was successfully removed from your list!`});
    } catch(err) {
        return res.status(500).json({"error": err + "!"});
    }
}

const getUserAnimes = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {include: [{as: "animeList", 
            model: Anime}]});

        return res.status(200).json({"success": user});
        
    } catch(err) {
        return res.status(500).json({"error": err + "!"});
    }
}

const sendRegisterConfirmMail = function(user) {
    const pathToTemplate = path.resolve(__dirname, '..', '..', 'templates/');
    mail.use('compile', hbs({
        viewEngine: {
            extName: ".handlebars",
            partialsDir: pathToTemplate,
            defaultLayout: false
        },
        viewPath: pathToTemplate,
        extName: ".handlebars"
    }));

    const message = {
        to: user.email,
        subject: "Confirm your register",
        template: "confirmRegister"
    }
    
    try { mail.sendMail(message) } 
    catch(err) { console.log(err + "!"); }
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
        validationResult(req).throw();
        const user = await User.create(data);
        sendRegisterConfirmMail(user);
        return res.status(201).json({"success": user});

    } catch(err) {
        return res.status(500).json({"error": err + "!"});
    }
}

const index = async(req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({"success": users});
    } catch(err) {
        return res.status(500).json({"error": err + "!"});
    }
}

const show = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        return res.status(200).json({"success": user});
    } catch(err) {
        return res.status(500).json({"error": err + "!"});
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
    addAnimeToList,
    removeAnimeFromList,
    create,
    index,
    show,
    update,
    destroy,
    getUserAnimes
}