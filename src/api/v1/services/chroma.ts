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
        try {
            for(const e of input) {
                let embedds = await embedder.generate(e.content);

                await collection.add({
                    ids: [e.id],
                    embeddings: [
                        embedds[0]
                    ],
                    // @ts-ignore
                    where: [{ source: "myntist" }],
                    documents: [e.content],
                });
            }

            resolve("success");
        } catch (e) {
            reject(e);
        }


    });
}

export const computation = async (input, result, source) => {
    console.log(input, result, source)
    const collection = await client.getOrCreateCollection({
        name: source,
        embeddingFunction: embedder,
    });

    return await new Promise(async (resolve, reject) => {
        await collection.query({
            nResults: result,
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