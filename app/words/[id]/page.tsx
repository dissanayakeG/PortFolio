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
				<div className="bg-linear-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-10 text-center">
					<div className="text-6xl mb-4">😕</div>
					<h1 className="text-3xl font-bold text-red-800 mb-3">Word not found</h1>
					<p className="text-red-600 mb-6">The word you&apos;re looking for doesn&apos;t exist in your vocabulary.</p>
					<Link
						href="/words"
						className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
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
				className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 font-medium"
			>
				← Back to Words
			</Link>

			<div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 sm:p-10">
				<div className="flex items-start justify-between mb-8">
					<div className="flex-1">
						<h1 className="text-5xl sm:text-6xl font-bold text-slate-800 mb-4">{word.word}</h1>
						<div className="flex flex-wrap gap-3">
							<span className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-100 to-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold border border-emerald-300">
								<span>🏷️</span>
								{word.category.name}
							</span>
							{word.subCategory && (
								<span className="inline-flex items-center gap-2 bg-linear-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-300">
									<span>📑</span>
									{word.subCategory.name}
								</span>
							)}
							<span className="inline-flex items-center gap-2 bg-linear-to-r from-purple-100 to-purple-200 text-purple-700 px-4 py-2 rounded-xl text-sm font-semibold border border-purple-300">
								<span>🌍</span>
								{word.language.name}
							</span>
						</div>
					</div>
					<div className="text-right ml-4">
						{word.progress?.remembered ? (
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 text-green-600 text-3xl border-2 border-green-300">
								✓
							</div>
						) : (
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 text-3xl border-2 border-slate-200">
								○
							</div>
						)}
					</div>
				</div>

				<div className="border-t-2 border-slate-200 pt-8">
					<h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-2">
						<span className="text-emerald-500">📖</span>
						Meanings
					</h2>
					<div className="space-y-4">
						{word.meanings.map((meaning) => (
							<div
								key={meaning.id}
								className="bg-linear-to-br from-slate-50 to-slate-100/50 rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
							>
								<div className="flex items-start gap-4">
									<div className="text-emerald-500 text-2xl">•</div>
									<div className="flex-1">
										<div className="text-lg font-semibold text-slate-800 mb-2">
											{meaning.meaning}
										</div>
										<div className="inline-flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-1 rounded-lg border border-slate-200">
											<span>🌐</span>
											<span>in {meaning.language.name}</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="border-t-2 border-slate-200 mt-8 pt-8 flex flex-col sm:flex-row gap-4">
					<button className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
						✓ Mark as Remembered
					</button>
					<button className="flex-1 bg-linear-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 px-6 py-4 rounded-xl font-semibold transition-all border border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
						✏️ Edit Word
					</button>
				</div>
			</div>
		</div>
	);
}
