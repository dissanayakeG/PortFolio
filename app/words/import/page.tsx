import { prisma } from "@/lib/prisma";
import ImportForm from "@/components/words/ImportForm";
import Link from "next/link";

export default async function ImportPage() {
	const languages = await prisma.language.findMany({
		orderBy: {
			name: "asc",
		},
	});

	const categories = await prisma.category.findMany({
		orderBy: {
			name: "asc",
		},
	});

	return (
		<div className="max-w-4xl mx-auto">
			<Link
				href="/words"
				className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 font-medium"
			>
				← Back to Words
			</Link>

			<div className="mb-10">
				<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
					Import Vocabulary
				</h1>
				<p className="text-lg text-theme-dark">
					Upload a CSV file to bulk import multiple words at once
				</p>
			</div>

			<div className="bg-white rounded-2xl border border-theme shadow-sm p-8 mb-7">
				<ImportForm languages={languages} categories={categories} />
			</div>
		</div>
	);
}
