"use client";

import { useState } from "react";
import NoWordFound from "@/components/words/partials/NoWordFound";
import WordSearch from "@/components/words/partials/WordSearch";
import { Heading2 } from "@/components/ui/h2";
import { Heading3 } from "@/components/ui/h3";

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

	const [searchTerm, setSearchTerm] = useState("");

	const toggleRemembered = async (wordId: number) => {
		const newStatus = !rememberStatus[wordId];

		setRememberStatus((prev) => ({
			...prev,
			[wordId]: newStatus,
		}));

		try {
			await fetch(`/api/words/${wordId}/progress`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					remembered: newStatus,
				}),
			});
		} catch {
			setRememberStatus((prev) => ({
				...prev,
				[wordId]: !newStatus,
			}));
		}
	};

	const getEnglishMeaning = (meanings: Meaning[]) => {
		const english = meanings.find((m) => m.languageId === 1);

		return english?.meaning || meanings[0]?.meaning || "-";
	};

	const filteredWords = words.filter((word) => {
		const search = searchTerm.toLowerCase().trim();

		if (!search) return true;

		return (
			word.word.toLowerCase().includes(search) ||
			word.meanings.some((meaning) =>
				meaning.meaning.toLowerCase().includes(search),
			)
		);
	});

	const groupedWords = filteredWords.reduce(
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

	return (
		<div className="w-full space-y-6 sm:space-y-8">
			{/* Search */}
			<div className="w-full">
				<WordSearch
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			</div>

			{filteredWords.length === 0 && <NoWordFound />}

			{/* Results */}
			{Object.entries(groupedWords).map(([category, subCategories]) => (
				<div key={category} className="space-y-6 sm:space-y-8">
					<div className="flex items-center gap-4 lg:gap-6">
						<Heading2>{category}</Heading2>

						<div className="flex-1 h-[3px] lg:h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
					</div>

					{Object.entries(subCategories).map(
						([subCategory, subCategoryWords]) => (
							<div key={subCategory} className="space-y-3">
								<Heading3>
									{subCategory}

									<span className="text-xs sm:text-sm font-normal ml-2 opacity-80">
										({subCategoryWords.length}{" "}
										{subCategoryWords.length === 1
											? "word"
											: "words"}
										)
									</span>
								</Heading3>

								<div className="w-full bg-white rounded-2xl border-2 border-theme shadow-sm overflow-hidden">
									<div className="overflow-x-auto w-full">
										<table className="w-full table-fixed min-w-[500px] font-mono text-sm sm:text-base">
											<thead>
												<tr className="bg-theme/30 border-b-2 border-theme">
													<th className="w-5/12 text-left px-4 sm:px-6 py-3 font-bold text-gray-900">
														Word
													</th>

													<th className="w-5/12 text-left px-4 sm:px-6 py-3 font-bold text-gray-900">
														Meaning
													</th>

													<th className="w-2/12 text-center px-4 sm:px-6 py-3 font-bold text-gray-900">
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
															<td className="px-4 sm:px-6 py-3 text-gray-900 font-bold truncate">
																<a
																	href={`/words/${word.id}/edit`}
																	className="hover:text-primary hover:underline transition-colors"
																>
																	{word.word}
																</a>
															</td>

															<td className="px-4 sm:px-6 py-3 text-gray-700 truncate">
																{getEnglishMeaning(
																	word.meanings,
																)}
															</td>

															<td className="px-4 sm:px-6 py-3 text-center">
																<button
																	onClick={() =>
																		toggleRemembered(
																			word.id,
																		)
																	}
																	className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold transition-all ${
																		rememberStatus[
																			word
																				.id
																		]
																			? "bg-secondary text-white hover:bg-secondary-dark"
																			: "bg-theme text-theme-dark hover:bg-theme-light"
																	}`}
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
