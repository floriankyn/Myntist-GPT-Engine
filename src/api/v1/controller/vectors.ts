import { saving, computation, listVectors } from '../services/chroma.js';
import { Request, Response } from 'express';
import { QueryResponse } from 'chromadb/dist/main/types';

import OpenAI from 'openai';
const openai = new OpenAI();

export const save = async (req: Request, res: Response): Promise<Response> => {
  const { input } = req.body;

  try {
    const embed = await saving(input);

    return res.status(200).send({
      message: 'The vector has been successfully saved',
      vector: embed
    });
  } catch (e) {
    return res.status(500).send({
      message: 'An error occured while saving the vector',
      error: e
    });
  }
};

export const compute = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { input, results, source } = req.body;

  try {
    const computedData = await computation(input, results, source);

    return res.status(200).send({
      message: 'The vector has been successfully computed',
      vector: computedData
    });
  } catch (e) {
    return res.status(500).send({
      message: 'An error occured while computing the vector',
      error: e
    });
  }
};

export const list = async (req: Request, res: Response): Promise<Response> => {
  const { source } = req.params;
  try {
    const vectors = await listVectors(source);

    return res.status(200).send({
      message: 'The vectors have been successfully listed',
      vectors: vectors
    });
  } catch (e) {
    return res.status(500).send({
      message: 'An error occured while listing the vectors',
      error: e
    });
  }
};

export const chat = async (req: Request, res: Response): Promise<Response> => {
  const { input, results, source } = req.body;

  try {
    const vectors: QueryResponse | null = await computation(
      input,
      results,
      source
    );

    if (vectors !== null) {
      let docs: string = '';

      for (const e of vectors.documents) {
        docs += e + '\n';
      }

      const text: string = `
            You are Pepper, Myntist's super helpful assistant. Anaylise information from <info> and reflect and think step by step about How to answer the user's question from <Query> as clearly and concisely as possible.
            Frame your answer with note for how Myntist's ecosystem can help the user. Keep answer under 150 words.
            
            <info>
            ${input} 
            <\info>
    
    
            <Query> 
            ${docs}
            <\Query>  
            
            Return answer only, without tags or additional syntax
        `;

      const completion = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: text,
        temperature: 0.7,
        max_tokens: 350
      });

      return res.status(200).send({
        message: 'The vectors have been successfully listed',
        GPT_RESPONSE: completion.choices[0].text
      });
    } else {
      return res.status(500).send({
        message: 'An error occured while listing the vectors',
        error: 'Vectors is null'
      });
    }
  } catch (e) {
    return res.status(500).send({
      message: 'An error occured while listing the vectors',
      error: e
    });
  }
};
