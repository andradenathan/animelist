const Auth = require('../config/auth');
const User = require('../models/user');
const Users = require('../controllers/users');

const register = (req, res) => {
    Users.create(req, res);
}

const login = async(req, res) => {
    try {
    
        const user = await User.findOne({where: { username: req.body.username }});
        
        const isValid = Auth.verifyPassword(req.body.password, user.dataValues.salt,
            user.dataValues.hash);

        if (isValid) {
            const token = Auth.generateJWT(user);
            res.status(200).json({
                message: 'User logged in successfully',
                token: token
            });
        }

        else {
            res.status(401).json({message: 'Password incorrect'});
        }
        
    } catch(err) {
        res.status(401).json({message: 'User not found'});
    }
}

const getDetails = async (req, res) => {
    const token = Auth.getToken(req);
    const loggedUser = Auth.user(token);
    return res.status(201).json({ user: loggedUser });
}

module.exports = {
    register,
    login,
    getDetails
}