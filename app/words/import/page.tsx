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
				className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6 font-medium"
			>
				← Back to Words
			</Link>

			<div className="mb-10">
				<h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-3">
					Import Vocabulary
				</h1>
				<p className="text-lg text-slate-600">
					Upload a CSV file to bulk import multiple words at once
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-7">
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
					<div className="text-4xl mb-3">📄</div>
					<div className="text-2xl font-bold text-slate-800 mb-1">
						1
					</div>
					<p className="text-sm text-slate-600">
						Prepare your CSV file
					</p>
				</div>
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
					<div className="text-4xl mb-3">⚙️</div>
					<div className="text-2xl font-bold text-slate-800 mb-1">
						2
					</div>
					<p className="text-sm text-slate-600">
						Select language & category
					</p>
				</div>
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
					<div className="text-4xl mb-3">⬆️</div>
					<div className="text-2xl font-bold text-slate-800 mb-1">
						3
					</div>
					<p className="text-sm text-slate-600">Upload and import</p>
				</div>
			</div>

			<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-7">
				<ImportForm languages={languages} categories={categories} />
			</div>

			<div className="bg-linear-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-2xl p-7">
				<div className="flex items-start gap-4">
					<div className="text-3xl">📋</div>
					<div className="flex-1">
						<h3 className="font-bold text-blue-900 mb-3 text-lg">
							CSV Format Guide
						</h3>
						<p className="text-sm text-blue-800 mb-4">
							Your CSV file must include two columns:{" "}
							<strong>word</strong> and <strong>meaning</strong>
						</p>
						<div className="bg-white rounded-xl border border-blue-200 p-4 shadow-sm">
							<pre className="text-sm font-mono text-slate-700 overflow-x-auto">
								word,meaning{"\n"}
								Hola,Hello{"\n"}
								Adiós,Goodbye{"\n"}
								Gracias,Thank you
							</pre>
						</div>
						<div className="mt-4 flex items-center gap-2 text-sm text-blue-700">
							<span>💡</span>
							<span>
								Download the{" "}
								<a
									href="/sample-vocabulary.csv"
									className="font-semibold underline hover:text-blue-900"
								>
									sample CSV file
								</a>{" "}
								to get started
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
