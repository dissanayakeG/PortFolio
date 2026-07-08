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

type Props = {
	languages: {
		id: number;
		name: string;
	}[];

	categories: {
		id: number;
		name: string;
	}[];
};

export default function WordForm({ languages, categories }: Props) {
	const router = useRouter();
	const { register, handleSubmit, watch } = useForm<FormData>();
	const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
	const [useCustomSubCategory, setUseCustomSubCategory] = useState(false);

	const selectedCategoryId = watch("categoryId");

	useEffect(() => {
		if (selectedCategoryId) {
			fetch(`/api/subcategories?categoryId=${selectedCategoryId}`)
				.then((res) => res.json())
				.then((data) => setSubCategories(data));
		}
	}, [selectedCategoryId]);

	async function onSubmit(data: FormData) {
		let subCategoryId = data.subCategoryId;

		if (useCustomSubCategory && data.subCategoryName?.trim()) {
			const subCatResponse = await fetch("/api/subcategories", {
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

		const response = await fetch("/api/words", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				word: data.word,
				languageId: Number(data.languageId),
				categoryId: Number(data.categoryId),
				subCategoryId: subCategoryId ? Number(subCategoryId) : null,
				meanings: [
					{
						languageId: 1,
						meaning: data.meaning,
					},
				],
			}),
		});

		if (response.ok) {
			router.push("/words");
			router.refresh();
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8">
			<div>
				<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base lg:text-lg">
					Word <span className="text-red-500">*</span>
				</label>
				<input
					{...register("word")}
					className="border-2 border-gray-300 rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
					placeholder="Enter the word"
					required
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
				<div>
					<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base lg:text-lg">
						Language <span className="text-red-500">*</span>
					</label>
					<select
						{...register("languageId")}
						className="border-2 border-gray-300 rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
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
					<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base lg:text-lg">
						Category <span className="text-red-500">*</span>
					</label>
					<select
						{...register("categoryId")}
						className="border-2 border-gray-300 rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
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
				<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base lg:text-lg">
					Subcategory <span className="text-gray-500 text-sm lg:text-base font-normal">(Optional)</span>
				</label>
				{!useCustomSubCategory ? (
					<div>
						<select
							{...register("subCategoryId")}
							className="border-2 border-gray-300 rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
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
							className="text-sm text-emerald-600 font-medium mt-3 hover:text-emerald-700 flex items-center gap-1"
						>
							<span>➕</span> Create new subcategory
						</button>
					</div>
				) : (
					<div>
						<input
							{...register("subCategoryName")}
							className="border-2 border-slate-200 rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
							placeholder="Enter new subcategory name"
						/>
						<button
							type="button"
							onClick={() => setUseCustomSubCategory(false)}
							className="text-sm text-slate-600 font-medium mt-3 hover:text-slate-700 flex items-center gap-1"
						>
							<span>←</span> Select existing
						</button>
					</div>
				)}
			</div>

			<div>
				<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base lg:text-lg">
					Meaning <span className="text-red-500">*</span>
				</label>
				<input
					{...register("meaning")}
					className="border-2 border-gray-300 rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
					placeholder="Enter the meaning"
					required
				/>
			</div>

			<button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 lg:py-5 rounded-xl font-bold text-base lg:text-lg w-full transition-all shadow-lg hover:shadow-xl">
				💾 Save Word
			</button>
		</form>
	);
}
