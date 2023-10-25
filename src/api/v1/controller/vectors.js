import pkg from '../services/chroma.js';

export const save = async (req, res) => {
    const { input } = req.body;

    try {
        let embed = await pkg.saving(input);
        console.log(embed);

        return res.status(200).send({
            message: "The vector has been successfully saved",
            vector: embed
        });

    } catch (e) {
        return res.status(500).send({
            message: "An error occured while saving the vector",
            error: e
        });
    }
}

export const compute = async (req, res) => {
    const { input } = req.body;

}

