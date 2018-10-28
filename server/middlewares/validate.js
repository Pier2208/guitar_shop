const Joi = require('joi')

//rules
const firstname = Joi.string().max(50).required()
const lastname = Joi.string().max(50).required()
const name = Joi.string().max(50).required()
const description = Joi.string().max(2000).required()
const price = Joi.number().positive().precision(2).required()
const shipping = Joi.boolean().required()
const available = Joi.boolean().required()
const frets = Joi.number().valid(20, 21, 22, 24).required()
const sold = Joi.number().positive()
const brand = Joi.string().required()
const wood = Joi.string().required()
const published = Joi.boolean().required()
const email = Joi.string().email({ minDomainAtoms: 2 })
const images = Joi.array()
const password = Joi.string().min(8).required()
const confirmPassword = Joi.any().valid(Joi.ref('password')).required()


module.exports = {

    validateBody: (schema) => {
        //validateBody is a fn that takes a schema as argument and returns a middleware
        return (req, res, next) => {
            //validate req.body against the schema
            const { error } = Joi.validate(req.body, schema, { abortEarly: false })

            if(error) {
                //instantiate an empty errors array
                let errors = []
                //map over Joi error array and create new error object to fit Formik error format [{field: '', error: ''}]
                error.details.forEach(error => {
                    errors.push({
                        field: error.path[0],
                        error: error.message
                    })
                })
                //attach errors to req.errors
                req.errors = errors
                //move on
                next()
            }
            next()
        }
    },

    schemas: {
        registerSchema: Joi.object().keys({
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        }),
        loginSchema: Joi.object().keys({
            email,
            password
        }),
        brandSchema: Joi.object().keys({
            name
        }),
        woodSchema: Joi.object().keys({
            name
        }),
        productSchema: Joi.object().keys({
            name,
            description,
            brand,
            wood,
            price,
            shipping,
            available,
            frets,
            sold,
            published,
            images
        })
    }
}
