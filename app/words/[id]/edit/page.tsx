import { prisma } from "@/lib/prisma";
import EditWordForm from "@/components/words/EditWordForm";
import Link from "next/link";

export default async function EditWordPage({
	params,
}: {
	params: Promise<{
		id: string;
	}>;
}) {
	const { id } = await params;

	const word = await prisma.word.findUnique({
		where: {
			id: Number(id),
		},
		include: {
			meanings: true,
		},
	});

	if (!word) {
		return (
			<div className="max-w-3xl mx-auto">
				<div className="bg-secondary-light/20 border-2 border-secondary rounded-2xl p-10 text-center">
					<div className="text-6xl mb-4">😕</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-3">Word not found</h1>
					<p className="text-theme-dark mb-6">The word you&apos;re looking for doesn&apos;t exist in your vocabulary.</p>
					<Link
						href="/words"
						className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
					>
						← Back to Words
					</Link>
				</div>
			</div>
		);
	}

	const languages = await prisma.language.findMany({
		orderBy: { name: "asc" },
	});

	const categories = await prisma.category.findMany({
		orderBy: { name: "asc" },
	});

	return (
		<div className="max-w-5xl mx-auto">
			<Link
				href={`/words/${id}`}
				className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 lg:mb-8 font-medium text-base lg:text-lg"
			>
				← Back to Word
			</Link>

			<div className="mb-8 sm:mb-10 lg:mb-14">
				<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 lg:mb-5">
					Edit Word
				</h1>
				<p className="text-lg sm:text-xl lg:text-2xl text-theme-dark">
					Update the word details
				</p>
			</div>

			<div className="bg-white rounded-2xl border-2 border-theme shadow-lg p-6 sm:p-8 lg:p-12">
				<EditWordForm wordData={word} languages={languages} categories={categories} />
			</div>
		</div>
	);
}
