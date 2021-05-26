const User = require('../models/user');

const create = async(req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        date_of_birth: req.body.date_of_birth
    }

    try {
        const user = await User.create(data);
        return res.status(201).json({user});
    } catch(err) {
        return res.status(500).json({err});
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
    const {id} = req.params;
    try {
        const [updated] = await User.update(req.body, {where: {id: id}});
        if (updated) {
            const user = await User.findByPk(id);
            return res.status(200).json({user});
        }
        throw new Error('User not found');
        
    } catch(err) { 
        return res.status(500).json({err});
    }
}

const destroy = async(req, res) => {
    const {id} = req.params;
    try {
        const [deleted] = await User.destroy({where: {id: id}});
        if(deleted) {
            return res.status(200).json("User successfully deleted");
        }
        throw new Error('User not found');
    } catch(err) {
        return res.status(500).json({err});
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    destroy
}