const Joi = require('joi')

const registerUserSchema = Joi.object({
	body:{	
		name: Joi.string()
			.required(),

		password: Joi.string()
			.min(8)
			.pattern(/[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/)
			.message('Password should contain special characters')
			.pattern(/(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+/)
			.message('Password should contain alphanumeric characters')
			.pattern(/(?=.*?[a-z])(?=.*?[A-Z])[a-zA-Z]+/)
			.message(`Password should contain 
			uppercase and lowercase characters`),

		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: {
					allow: ['com', 'net']
				}
			})
			.required()
	}	
})

const loginSchema = Joi.object({
	body:{
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: {
					allow: ['com', 'net']
				}
			})
			.required(),
		password: Joi.string()
			.required()
	}
})

const addProfileSchema = Joi.object({
	body:{	
		name: Joi.string()
			.required(),

        birthplace: Joi.string(),

        age: Joi.number(),

        image:Joi.string()
                .uri()
                .required(),
        images:Joi.string()
			.uri(),
        height: Joi.string(),

        foot: Joi.string(),

        position: Joi.string(),

        currentClub: Joi.string(),

        joined: Joi.date(),

        contractExpiry: Joi.date(),

	}	
})
const getProfileSchema = Joi.object({
	params: {
		id :Joi.string().hex()
			.required()
	}
})

const updateProfileSchema = Joi.object({
	params: {
		id :Joi.string().hex()
			.required()
	},
	body: {
		name: Joi.string(),

        birthplace: Joi.string(),

        age: Joi.number(),

        image:Joi.string()
                .uri(),
        images:Joi.string()
			.uri(),
        height: Joi.string(),

        foot: Joi.string(),

        position: Joi.string(),

        currentClub: Joi.string(),

        joined: Joi.date(),

        contractExpiry: Joi.date(),
	}
})

const deleteProfileSchema = Joi.object({
	params: {
		id :Joi.string().hex()
			.required()
	}
})

 

module.exports = {
    registerUserSchema,
    loginSchema,
    addProfileSchema,
    getProfileSchema,
    updateProfileSchema,
    deleteProfileSchema

}