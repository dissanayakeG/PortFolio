import Link from "next/link";

import { prisma } from "@/lib/prisma";
import WordCardView from "@/components/words/WordCardView";

export default async function WordsPage() {
	const words = await prisma.word.findMany({
		include: {
			language: true,
			category: true,
			subCategory: true,
			meanings: true,
			progress: true,
		},
		orderBy: [
			{
				category: {
					name: "asc",
				},
			},
			{
				word: "asc",
			},
		],
	});

	return (
		<div className="max-w-7xl mx-auto">
			<div className="mb-8 sm:mb-12 lg:mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 lg:gap-8">
				<div>
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 lg:mb-5">Vocabulary</h1>
					<p className="text-lg sm:text-xl lg:text-2xl text-gray-600">Browse and manage your word collection</p>
				</div>

				<div className="flex gap-3 sm:gap-4 lg:gap-5 w-full sm:w-auto">
					<Link
						href="/words/new"
						className="flex-1 sm:flex-none text-center rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-white text-sm sm:text-base lg:text-lg font-bold transition-all shadow-lg hover:shadow-xl"
					>
						➕ Add Word
					</Link>
					<Link
						href="/words/import"
						className="flex-1 sm:flex-none text-center rounded-xl bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-white text-sm sm:text-base lg:text-lg font-bold transition-all shadow-lg hover:shadow-xl"
					>
						📂 Import CSV
					</Link>
				</div>
			</div>

			<WordCardView words={words} />
		</div>
	);
}
