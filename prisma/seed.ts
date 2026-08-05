import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/production.db";
const adapter = new PrismaBetterSqlite3({
  url: databaseUrl.replace("file:", ""),
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  await Promise.all(
    [
      {
        code: "en",
        name: "English",
      },
      {
        code: "Sp",
        name: "Spanish",
      },
    ].map((language) =>
      prisma.language.upsert({
        where: { code: language.code },
        update: { name: language.name },
        create: language,
      }),
    ),
  );

  await Promise.all(
    [
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
    ].map((category) =>
      prisma.category.upsert({
        where: { code: category.code },
        update: { name: category.name },
        create: category,
      }),
    ),
  );

  const categories = await prisma.category.findMany({
    where: {
      code: {
        in: ["noun", "verb", "adj"],
      },
    },
  });

  const nounCategory = categories.find((c) => c.code === "noun");
  const verbCategory = categories.find((c) => c.code === "verb");
  const adjCategory = categories.find((c) => c.code === "adj");

  if (nounCategory) {
    await Promise.all(
      [
        { name: "Person", categoryId: nounCategory.id },
        { name: "Place", categoryId: nounCategory.id },
        { name: "Thing", categoryId: nounCategory.id },
        { name: "Animal", categoryId: nounCategory.id },
      ].map((subCategory) =>
        prisma.subCategory.upsert({
          where: {
            name_categoryId: {
              name: subCategory.name,
              categoryId: subCategory.categoryId,
            },
          },
          update: {},
          create: subCategory,
        }),
      ),
    );
  }

  if (verbCategory) {
    await Promise.all(
      [
        { name: "Action", categoryId: verbCategory.id },
        { name: "State", categoryId: verbCategory.id },
        { name: "Movement", categoryId: verbCategory.id },
      ].map((subCategory) =>
        prisma.subCategory.upsert({
          where: {
            name_categoryId: {
              name: subCategory.name,
              categoryId: subCategory.categoryId,
            },
          },
          update: {},
          create: subCategory,
        }),
      ),
    );
  }

  if (adjCategory) {
    await Promise.all(
      [
        { name: "Color", categoryId: adjCategory.id },
        { name: "Size", categoryId: adjCategory.id },
        { name: "Quality", categoryId: adjCategory.id },
      ].map((subCategory) =>
        prisma.subCategory.upsert({
          where: {
            name_categoryId: {
              name: subCategory.name,
              categoryId: subCategory.categoryId,
            },
          },
          update: {},
          create: subCategory,
        }),
      ),
    );
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