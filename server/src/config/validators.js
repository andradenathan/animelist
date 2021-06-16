const { body, params } = require('express-validator');

const validateUser = (method) => {
    switch(method) {
        case 'create': {
            return [
                body('username').exists().withMessage('Please enter an username')
                .isLength({min: 1, max: 10})
                .withMessage('The username must have between 1 to 10 characters'),
                body('email').exists().withMessage('Please enter an email'),
                body('date_of_birth').exists()
                .withMessage('Please enter your birthday')
                .isDate().withMessage('Invalid format, please enter YYYY/MM/DD')
            ];
        }

        case 'update': {
            return [
                body('username').optional().isLength({min: 1, max: 10})
                .withMessage('The username must have between 1 to 10 characters'),
                body('date_of_birth').optional()
                .isDate().withMessage('Invalid format, please enter YYYY/MM/DD'),
            ];
        }

    }
}

module.exports = {
    validateUser
}