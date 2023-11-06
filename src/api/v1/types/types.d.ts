interface vectorSave {
  id: string;
  content: string;
}

interface vectorResult {
  ids: string[][];
  distances: number[][];
  metadatas: null[][];
  embeddings: null;
  documents: string[][];
}
