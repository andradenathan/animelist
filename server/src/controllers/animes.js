const Anime = require('../models/anime');

const create = async(req, res) => {
    const data = {
        title: req.body.title,
        episodes: req.body.episode,
        status: req.body.status,
        score: req.body.score,
        photo: req.body.photo
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
        return res.status(500).json({anime});
    }
}

const update = async(req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Anime.update(req.body, {where: {id: id}}); 
        
        if (updated) {
            const anime = await Anime.findByPk(id);
            return res.status(200).json({anime});
        }
        
        throw new Error('Anime not found');

    } catch(err) {
        res.status(500).json({anime});
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
}