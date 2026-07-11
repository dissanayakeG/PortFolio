import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const words = await prisma.word.findMany({
    include: {
      language: true,
      category: true,
      meanings: true,
      progress: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return NextResponse.json(words);
}

// export async function POST(request: Request) {
//   const body = await request.json();
//   const {
//     word,
//     languageId,
//     categoryId,
//     subCategoryId,
//     meanings,
//   } = body;

//   const newWord = await prisma.word.create({
//     data: {
//       word,
//       languageId,
//       categoryId,
//       subCategoryId,
//       meanings: {
//         create: meanings.map(
//           (item: {
//             languageId: number;
//             meaning: string;
//           }) => ({
//             languageId: item.languageId,
//             meaning: item.meaning,
//           })
//         ),
//       },

//       progress: {
//         create: {},
//       },
//     },

//     include: {
//       language: true,
//       category: true,
//       subCategory: true,
//       meanings: true,
//       progress: true,
//     },
//   });
//   return NextResponse.json(newWord);
// }

export async function POST(request: Request) {
	const body = await request.json();

	const {
		languageId,
		categoryId,
		subCategoryId,
		words,
	} = body;


	const createdWords = await prisma.$transaction(
		words.map(
			(item: {
				word: string;
				meaning: string;
			}) =>
				prisma.word.create({
					data: {
						word: item.word,
						languageId,
						categoryId,
						subCategoryId,

						meanings: {
							create: {
								languageId: 1,
								meaning: item.meaning,
							},
						},

						progress: {
							create: {},
						},
					},

					include: {
						language: true,
						category: true,
						subCategory: true,
						meanings: true,
						progress: true,
					},
				})
		)
	);


	return NextResponse.json(createdWords);
}