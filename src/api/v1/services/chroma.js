import { ChromaClient } from "chromadb/dist/main";
const client = new ChromaClient();
import { OpenAIEmbeddingFunction } from "chromadb/dist/main";
const embedder = new OpenAIEmbeddingFunction({
    openai_api_key: process.env.OPENAI_API_KEY,
});

export const saving = async (input) => {
    const collection = await client.createCollection({
        name: "myntist",
        embeddingFunction: embedder,
    });

    return await new Promise(async (resolve, reject) => {
        await collection.add({
            ids: ["id1"],
            embeddings: [
                await embedder.generate(input),
            ],
            where: [{ source: "myntist" }],
            documents: [input],
        }).then((result) => {
            resolve(result);
        }).catch((e) => {
            reject(e);
        });
    });
}