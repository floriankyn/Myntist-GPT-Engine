import { ChromaClient } from "chromadb";
import { OpenAIEmbeddingFunction } from "chromadb";
const client = new ChromaClient();
const embedder = new OpenAIEmbeddingFunction({
    openai_api_key: process.env.OPENAI_API_KEY,
});

export const saving = async (input) => {
    const collection = await client.getOrCreateCollection({
        name: "myntist",
        embeddingFunction: embedder,
    });

    return await new Promise(async (resolve, reject) => {
        let embedds = await embedder.generate(input);

        await collection.add({
            ids: ["id1"],
            embeddings: [
                embedds[0]
            ],
            // @ts-ignore
            where: [{ source: "myntist" }],
            documents: [input],
        }).then((result) => {
            resolve(result);
        }).catch((e) => {
            reject(e);
        });
    });
}

export const computation = async (input) => {
    const collection = await client.getOrCreateCollection({
        name: "myntist",
        embeddingFunction: embedder,
    });

    return await new Promise(async (resolve, reject) => {
        await collection.query({
            nResults: 10,
            queryTexts: [input],
        }).then((result) => {
            resolve(result);
        }).catch((e) => {
            reject(e);
        });
    });
}

export const listVectors = async (source) => {
    const collection = await client.getCollection({
        name: source,
    });

    return await new Promise(async (resolve, reject) => {
        try {
            let data = await collection.get(
                {
                    offset: 0,
                    limit: await collection.count(),
                }
            );

            resolve(data);
        } catch (e) {
            reject(e);
        }

    });
}