const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.avatar = !isEmpty(data.avatar) ? data.avatar : '';
    data.id = !isEmpty(data.id) ? data.id : '';

    if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Text must be at least 10 characters'
    }

    if(Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
