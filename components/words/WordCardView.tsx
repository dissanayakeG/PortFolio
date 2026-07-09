"use client";

import { useState } from "react";

type Meaning = {
	id: number;
	meaning: string;
	languageId: number;
};

type Word = {
	id: number;
	word: string;
	language: {
		name: string;
		code: string;
	};
	category: {
		name: string;
	};
	subCategory?: {
		name: string;
		id: number;
	} | null;
	meanings: Meaning[];
	progress: {
		remembered: boolean;
	} | null;
};

type Props = {
	words: Word[];
};

export default function WordCardView({ words }: Props) {
	const [rememberStatus, setRememberStatus] = useState<
		Record<number, boolean>
	>(
		words.reduce(
			(acc, word) => {
				acc[word.id] = word.progress?.remembered || false;
				return acc;
			},
			{} as Record<number, boolean>,
		),
	);

	const toggleRemembered = async (wordId: number) => {
		const newStatus = !rememberStatus[wordId];
		setRememberStatus((prev) => ({ ...prev, [wordId]: newStatus }));

		try {
			await fetch(`/api/words/${wordId}/progress`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ remembered: newStatus }),
			});
		} catch (error) {
			setRememberStatus((prev) => ({ ...prev, [wordId]: !newStatus }));
		}
	};

	if (words.length === 0) {
		return (
			<div className="rounded-2xl border-2 border-dashed border-theme bg-theme/20 p-16 text-center">
				<div className="text-6xl mb-4">📚</div>
				<h3 className="text-2xl font-bold text-gray-900 mb-3">
					No words yet
				</h3>
				<p className="text-theme-dark mb-8">
					Start building your vocabulary by adding words
				</p>
				<a
					href="/words/new"
					className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
				>
					Add Your First Word
				</a>
			</div>
		);
	}

	const groupedWords = words.reduce(
		(acc, word) => {
			const category = word.category.name;
			const subCategory = word.subCategory?.name || "General";

			if (!acc[category]) {
				acc[category] = {};
			}
			if (!acc[category][subCategory]) {
				acc[category][subCategory] = [];
			}
			acc[category][subCategory].push(word);
			return acc;
		},
		{} as Record<string, Record<string, Word[]>>,
	);

	const getEnglishMeaning = (meanings: Meaning[]) => {
		const english = meanings.find((m) => m.languageId === 1);
		return english?.meaning || meanings[0]?.meaning || "-";
	};

	return (
		<div className="space-y-8 sm:space-y-12 lg:space-y-16">
			{Object.entries(groupedWords).map(([category, subCategories]) => (
				<div
					key={category}
					className="space-y-6 sm:space-y-8 lg:space-y-10"
				>
					<div className="flex items-center gap-4 lg:gap-6">
						<h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 lg:gap-4">
							{category}
						</h2>
						<div className="flex-1 h-[3px] lg:h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
					</div>

					{Object.entries(subCategories).map(
						([subCategory, subCategoryWords]) => (
							<div
								key={subCategory}
								className="space-y-3 sm:space-y-4 lg:space-y-5"
							>
								<h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white flex items-center gap-2 lg:gap-3 ml-2 sm:ml-4 lg:ml-8">
									{subCategory}
									<span className="text-xs sm:text-sm lg:text-base font-normal text-white ml-2">
										({subCategoryWords.length}{" "}
										{subCategoryWords.length === 1
											? "word"
											: "words"}
										)
									</span>
								</h3>

								<div className="bg-white rounded-2xl border-2 border-theme shadow-sm overflow-hidden ml-2 sm:ml-4 lg:ml-8">
									<div className="overflow-x-auto">
										<table className="w-full font-mono text-sm sm:text-base lg:text-lg">
											<thead>
												<tr className="bg-theme/30 border-b-2 border-theme">
													<th className="text-left px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 font-bold text-gray-900">
														Word
													</th>
													<th className="text-left px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 font-bold text-gray-900">
														Meaning
													</th>
													<th className="text-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 font-bold text-gray-900 w-24 sm:w-32 lg:w-40">
														Status
													</th>
												</tr>
											</thead>
											<tbody>
												{subCategoryWords.map(
													(word, index) => (
														<tr
															key={word.id}
															className={`border-b border-theme hover:bg-primary/10 transition-colors ${
																index % 2 === 0
																	? "bg-white"
																	: "bg-theme/10"
															}`}
														>
															<td className="px-2 sm:px-6 lg:px-8 py-1  text-gray-900 font-bold">
																
																<a
																	href={`/words/${word.id}/edit`}
																	className="hover:text-primary hover:underline transition-colors"
																>
																	{word.word}
																</a>
															</td>
															<td className="px-4 sm:px-6 lg:px-8 py-1  text-gray-700">
																{getEnglishMeaning(
																	word.meanings,
																)}
															</td>
															<td className="px-4 sm:px-6 lg:px-8 py-1  text-center">
																<button
																	onClick={() => toggleRemembered( word.id,)}
																	className={`inline-flex items-center justify-center w-3 h-3  rounded-lg font-bold text-lg lg:text-xl transition-all ${
																		rememberStatus[word.id]
																			? "bg-secondary text-white hover:bg-secondary-dark shadow-md"
																			: "bg-theme text-theme-dark hover:bg-theme-light"
																	}`}
																	title={
																		rememberStatus[
																			word
																				.id
																		]
																			? "Mark as not remembered"
																			: "Mark as remembered"
																	}
																>
																	{rememberStatus[
																		word.id
																	]
																		? "✓"
																		: "○"}
																</button>
															</td>
														</tr>
													),
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						),
					)}
				</div>
			))}
		</div>
	);
}
