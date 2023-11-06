import { OpenAIEmbeddingFunction } from 'chromadb';
import { ChromaClient } from 'chromadb';
import { QueryResponse } from 'chromadb/dist/main/types';
const client = new ChromaClient();
const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY
});

export const saving = async (input: vectorSave[]): Promise<void> => {
  console.log(input);
  const collection = await client.getOrCreateCollection({
    name: 'myntist',
    embeddingFunction: embedder
  });

  return await new Promise(async (resolve, reject) => {
    try {
      for (const e of input) {
        const embedds: number[][] = await embedder.generate([e.content]);

        await collection.add({
          ids: [e.id],
          embeddings: [embedds[0]],
          documents: [e.content]
        });
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const computation = async (
  input: string,
  result: number,
  source: string
): Promise<QueryResponse> => {
  const collection = await client.getOrCreateCollection({
    name: source,
    embeddingFunction: embedder
  });

  return await collection
    .query({
      nResults: result,
      queryTexts: [input]
    })
    .then()
    .catch();
};

export const listVectors = async (source: string) => {
  const collection = await client.getCollection({
    name: source
  });

  return await new Promise(async (resolve, reject) => {
    try {
      const data = await collection.get({
        offset: 0,
        limit: await collection.count()
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};
