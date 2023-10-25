import { saving, computation, listVectors } from "../services/chroma.js";

export const save = async (req, res) => {
    const { input } = req.body;

    try {
        let embed = await saving(input);

        return res.status(200).send({
            message: "The vector has been successfully saved",
            vector: embed
        });

    } catch (e) {
        console.log(e)
        return res.status(500).send({
            message: "An error occured while saving the vector",
            error: e
        });
    }
}

export const compute = async (req, res) => {
    const { input } = req.body;

    try {
        const computedData = await computation(input);
        console.log(computedData);

        return res.status(200).send({
            message: "The vector has been successfully computed",
            vector: computedData
        });
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            message: "An error occured while computing the vector",
            error: e
        });
    }
}

export const list = async (req, res) => {
    const { source } = req.params;
    try {
        let vectors = await listVectors(source);

        return res.status(200).send({
            message: "The vectors have been successfully listed",
            vectors: vectors
        });
    } catch (e) {
        return res.status(500).send({
            message: "An error occured while listing the vectors",
            error: e
        });
    }
}