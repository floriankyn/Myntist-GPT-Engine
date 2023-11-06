import { PrismaClient, tokens } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTokenUserDB(id: number): Promise<tokens | null> {
  const data: tokens | null = await prisma.tokens.findUnique({
    where: {
      id: id
    }
  });

  return data;
}

export async function generateTokenDB(
  name: string,
  credentialLevel: number
): Promise<tokens> {
  const data: tokens = await prisma.tokens.create({
    data: {
      name: name,
      credential_level: credentialLevel
    }
  });

  return data;
}
