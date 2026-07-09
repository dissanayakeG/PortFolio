import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function WordDetailPage({
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
			language: true,
			category: true,
			subCategory: true,
			meanings: {
				include: {
					language: true,
				},
			},
			progress: true,
		},
	});

	if (!word) {
		return (
			<div className="max-w-3xl mx-auto">
				<div className="bg-gradient-to-br from-secondary-light/20 to-secondary/20 border-2 border-secondary rounded-2xl p-10 text-center">
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

	return (
		<div className="max-w-4xl mx-auto">
			<Link
				href="/words"
				className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8 font-medium"
			>
				← Back to Words
			</Link>

			<div className="bg-white rounded-2xl border border-theme shadow-lg p-8 sm:p-10">
				<div className="flex items-start justify-between mb-8">
					<div className="flex-1">
						<h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">{word.word}</h1>
						<div className="flex flex-wrap gap-3">
							<span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-light/30 to-primary/30 text-primary-dark px-4 py-2 rounded-xl text-sm font-semibold border border-primary">
								<span>🏷️</span>
								{word.category.name}
							</span>
							{word.subCategory && (
								<span className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-light/30 to-secondary/30 text-secondary-dark px-4 py-2 rounded-xl text-sm font-semibold border border-secondary">
									<span>📑</span>
									{word.subCategory.name}
								</span>
							)}
							<span className="inline-flex items-center gap-2 bg-gradient-to-r from-theme/30 to-theme-light/30 text-theme-dark px-4 py-2 rounded-xl text-sm font-semibold border border-theme">
								<span>🌍</span>
								{word.language.name}
							</span>
						</div>
					</div>
					<div className="text-right ml-4">
						{word.progress?.remembered ? (
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary-light/30 text-secondary-dark text-3xl border-2 border-secondary">
								✓
							</div>
						) : (
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-theme/30 text-theme-light text-3xl border-2 border-theme">
								○
							</div>
						)}
					</div>
				</div>

				<div className="border-t-2 border-theme pt-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
						<span className="text-primary">📖</span>
						Meanings
					</h2>
					<div className="space-y-4">
						{word.meanings.map((meaning) => (
							<div
								key={meaning.id}
								className="bg-gradient-to-br from-theme/20 to-theme/10 rounded-xl p-6 border border-theme shadow-sm hover:shadow-md transition-shadow"
							>
								<div className="flex items-start gap-4">
									<div className="text-primary text-2xl">•</div>
									<div className="flex-1">
										<div className="text-lg font-semibold text-gray-900 mb-2">
											{meaning.meaning}
										</div>
										<div className="inline-flex items-center gap-2 text-sm text-theme-dark bg-white px-3 py-1 rounded-lg border border-theme">
											<span>🌐</span>
											<span>in {meaning.language.name}</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="border-t-2 border-theme mt-8 pt-8 flex flex-col sm:flex-row gap-4">
					<button className="flex-1 bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
						✓ Mark as Remembered
					</button>
					<Link
						href={`/words/${word.id}/edit`}
						className="flex-1 bg-gradient-to-r from-theme/50 to-theme-light/50 hover:from-theme-light hover:to-theme text-gray-900 px-6 py-4 rounded-xl font-semibold transition-all border border-theme shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center"
					>
						✏️ Edit Word
					</Link>
				</div>
			</div>
		</div>
	);
}
