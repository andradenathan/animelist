const Anime = require('../models/anime');
require('../config/dotenv');

const listAnimeByScore = async(req, res) => {
    try { 
        const animes = await Anime.findAll({order: [['score', 'DESC']]});
        return res.status(200).json({"success": {animes}});
    } catch(err) {
        return res.status(500).json({"error": err + "!"});
    }
}

const create = async(req, res) => {
    const data = {
        title: req.body.title,
        episodes: req.body.episode,
        status: req.body.status,
        score: req.body.score,
        photo: process.env.APP_URL + "/uploads/" + req.file.filename
    }

    try {
        const anime = await Anime.create(data);
        return res.status(201).json({anime});

    } catch(err) {
        return res.status(500).json({err});
    }
}

const index = async(req, res) => {
    try {
        const animes = await Anime.findAll();
        return res.status(200).json({animes});

    } catch(err) {
        return res.status(500).json({err});
    }
}

const show = async(req, res) => {
    const { id } = req.params;
    try {
        const anime = await Anime.findByPk(id);
        return res.status(200).json({anime});
    } catch(err) {
        return res.status(500).json(err + "!");
    }
}

const update = async(req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Anime.update(req.body, {where: {id: id}}); 

        if (updated) {
            const anime = await Anime.findByPk(id)
            return res.status(200).json({"success": anime});
        }
        
        throw new Error('Anime not found');

    } catch(err) {
        res.status(500).json({"error": err + "!"});
    }
}

const destroy = async(req, res) => {
    const { id } = req.params;
    try {
        const [destroyed] = await Anime.destroy({where: {id: id}});
        if (destroyed) {
            return res.status(200).json('Anime successfully deleted');
        }
        throw new Error('Anime not found or already deleted');
    } catch(err) {
        res.status(500).json({err});
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    listAnimeByScore
}