import { prisma, prismaMain } from "@/src/utils/prismaMain";

export async function apiKeyValidation(apiKey: string) {
  await prismaMain();

  // Prevent duplicate key
  const existingApiKey = await prisma.apiKey.findFirst({
    where: {
      key: apiKey,
    },
  });

  if (existingApiKey) {
    throw new Error("API key with this value already exists");
  }
}
