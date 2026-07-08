import { prisma } from "@/lib/prisma";
import WordForm from "@/components/words/WordForm";
import Link from "next/link";

export default async function AddWordPage() {
	const languages = await prisma.language.findMany({
		orderBy: { name: "asc" },
	});

	const categories = await prisma.category.findMany({
		orderBy: { name: "asc" },
	});

	return (
		<div className="max-w-5xl mx-auto">
			<Link
				href="/words"
				className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6 lg:mb-8 font-medium text-base lg:text-lg"
			>
				← Back to Words
			</Link>

			<div className="mb-8 sm:mb-10 lg:mb-14">
				<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 lg:mb-5">
					Add New Word
				</h1>
				<p className="text-lg sm:text-xl lg:text-2xl text-gray-600">
					Expand your vocabulary by adding a new word
				</p>
			</div>

			<div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-6 sm:p-8 lg:p-12">
				<WordForm languages={languages} categories={categories} />
			</div>
		</div>
	);
}