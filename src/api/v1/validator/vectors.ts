import Joi from "joi";

export const validateCreateVector = async (req, res, next) => {
    const createVectorValidation = Joi.object({
        input: Joi.array()
            .items(
                Joi.object({
                    id: Joi.string().required(),
                    content: Joi.string().required(),
                })
            )
            .required(),
    });

    const { error } = createVectorValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    return next();
}