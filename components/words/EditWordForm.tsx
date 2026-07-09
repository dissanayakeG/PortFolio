"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type FormData = {
	word: string;
	languageId: number;
	categoryId: number;
	subCategoryId?: number;
	subCategoryName?: string;
	meaning: string;
};

type SubCategory = {
	id: number;
	name: string;
	categoryId: number;
};

type Language = {
	id: number;
	name: string;
};

type Category = {
	id: number;
	name: string;
};

type WordData = {
	id: number;
	word: string;
	languageId: number;
	categoryId: number;
	subCategoryId?: number | null;
	meanings: Array<{
		id: number;
		meaning: string;
		languageId: number;
	}>;
};

type Props = {
	wordData: WordData;
	languages: Language[];
	categories: Category[];
};

export default function EditWordForm({ wordData, languages, categories }: Props) {
	const router = useRouter();
	const { register, handleSubmit, watch, setValue } = useForm<FormData>({
		defaultValues: {
			word: wordData.word,
			languageId: wordData.languageId,
			categoryId: wordData.categoryId,
			subCategoryId: wordData.subCategoryId || undefined,
			meaning: wordData.meanings.find(m => m.languageId === 1)?.meaning || wordData.meanings[0]?.meaning || "",
		}
	});
	const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
	const [useCustomSubCategory, setUseCustomSubCategory] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const selectedCategoryId = watch("categoryId");

	useEffect(() => {
		if (selectedCategoryId) {
			fetch(`/api/words/subcategories?categoryId=${selectedCategoryId}`)
				.then((res) => res.json())
				.then((data) => {
					setSubCategories(data);
					if (wordData.subCategoryId && wordData.categoryId === Number(selectedCategoryId)) {
						setValue("subCategoryId", wordData.subCategoryId);
					}
				});
		}
	}, [selectedCategoryId, wordData.subCategoryId, wordData.categoryId, setValue]);

	async function onSubmit(data: FormData) {
		setIsLoading(true);
		try {
			let subCategoryId = data.subCategoryId;

			if (useCustomSubCategory && data.subCategoryName?.trim()) {
				const subCatResponse = await fetch("/api/words/subcategories", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: data.subCategoryName.trim(),
						categoryId: Number(data.categoryId),
					}),
				});

				if (subCatResponse.ok) {
					const newSubCat = await subCatResponse.json();
					subCategoryId = newSubCat.id;
				}
			}

			const wordResponse = await fetch(`/api/words/${wordData.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					word: data.word,
					languageId: Number(data.languageId),
					categoryId: Number(data.categoryId),
					subCategoryId: subCategoryId ? Number(subCategoryId) : null,
				}),
			});

			if (!wordResponse.ok) {
				throw new Error("Failed to update word");
			}

			const englishMeaning = wordData.meanings.find(m => m.languageId === 1);
			if (englishMeaning && englishMeaning.meaning !== data.meaning) {
				await fetch(`/api/words/${wordData.id}/meanings/${englishMeaning.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						meaning: data.meaning,
					}),
				});
			}

			router.push(`/words/${wordData.id}`);
			router.refresh();
		} catch (error) {
			console.error("Error updating word:", error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
			<div>
				<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base">
					Word <span className="text-secondary">*</span>
				</label>
				<input
					{...register("word")}
					className="border-2 border-theme rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
					placeholder="Enter the word"
					required
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
				<div>
					<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base">
						Language <span className="text-secondary">*</span>
					</label>
					<select
						{...register("languageId")}
						className="border-2 border-theme rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
						required
					>
						{languages.map((language) => (
							<option key={language.id} value={language.id}>
								{language.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base">
						Category <span className="text-secondary">*</span>
					</label>
					<select
						{...register("categoryId")}
						className="border-2 border-theme rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
						required
					>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div>
				<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base">
					Subcategory <span className="text-theme-light text-sm font-normal">(Optional)</span>
				</label>
				{!useCustomSubCategory ? (
					<div>
						<select
							{...register("subCategoryId")}
							className="border-2 border-theme rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
						>
							<option value="">None</option>
							{subCategories.map((subCat) => (
								<option key={subCat.id} value={subCat.id}>
									{subCat.name}
								</option>
							))}
						</select>
						<button
							type="button"
							onClick={() => setUseCustomSubCategory(true)}
							className="text-sm text-primary font-medium mt-3 hover:text-primary-dark flex items-center gap-1"
						>
							<span>➕</span> Create new subcategory
						</button>
					</div>
				) : (
					<div>
						<input
							{...register("subCategoryName")}
							className="border-2 border-theme rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
							placeholder="Enter new subcategory name"
						/>
						<button
							type="button"
							onClick={() => setUseCustomSubCategory(false)}
							className="text-sm text-theme-light font-medium mt-3 hover:text-theme-dark flex items-center gap-1"
						>
							<span>←</span> Select existing
						</button>
					</div>
				)}
			</div>

			<div>
				<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base">
					Meaning <span className="text-secondary">*</span>
				</label>
				<input
					{...register("meaning")}
					className="border-2 border-theme rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
					placeholder="Enter the meaning"
					required
				/>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="bg-primary hover:bg-primary-dark disabled:bg-theme-light text-white py-2 rounded-xl font-bold text-base w-full transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
			>
				{isLoading ? "⏳ Updating..." : "💾 Update Word"}
			</button>
		</form>
	);
}
