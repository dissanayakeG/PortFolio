import { PrismaClient } from "../generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "./study.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.language.createMany({
    data: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "Sp",
        name: "Spanish",
      }
    ],
  });

  const categories = await prisma.category.createManyAndReturn({
    data: [
      { code: "noun", name: "Noun" },
      { code: "verb", name: "Verb" },
      { code: "adj", name: "Adjective" },
      { code: "adv", name: "Adverb" },
      { code: "pron", name: "Pronoun" },
      { code: "prep", name: "Preposition" },
      { code: "conj", name: "Conjunction" },
      { code: "article", name: "Article" },
      { code: "interj", name: "Interjection" },
      { code: "expr", name: "Expression" },
    ],
  });

  const nounCategory = categories.find((c) => c.code === "noun");
  const verbCategory = categories.find((c) => c.code === "verb");
  const adjCategory = categories.find((c) => c.code === "adj");

  if (nounCategory) {
    await prisma.subCategory.createMany({
      data: [
        { name: "Person", categoryId: nounCategory.id },
        { name: "Place", categoryId: nounCategory.id },
        { name: "Thing", categoryId: nounCategory.id },
        { name: "Animal", categoryId: nounCategory.id },
      ],
    });
  }

  if (verbCategory) {
    await prisma.subCategory.createMany({
      data: [
        { name: "Action", categoryId: verbCategory.id },
        { name: "State", categoryId: verbCategory.id },
        { name: "Movement", categoryId: verbCategory.id },
      ],
    });
  }

  if (adjCategory) {
    await prisma.subCategory.createMany({
      data: [
        { name: "Color", categoryId: adjCategory.id },
        { name: "Size", categoryId: adjCategory.id },
        { name: "Quality", categoryId: adjCategory.id },
      ],
    });
  }

  console.log("✅ Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });