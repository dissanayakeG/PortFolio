"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type FormData = {
	wordList: string;
	languageId: number;
	categoryId: number;
	subCategoryId?: number;
	subCategoryName?: string;
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
			fetch(`/api/words/subcategories?categoryId=${selectedCategoryId}`)
				.then((res) => res.json())
				.then((data) => setSubCategories(data));
		}
	}, [selectedCategoryId]);

	async function onSubmit(data: FormData) {
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

		const words = data.wordList
			.split("\n")
			.map((line) => {
				const [word, meaning] = line.split(",").map((item) => item.trim());

				return {
					word,
					meaning,
				};
			})
			.filter((item) => item.word && item.meaning);

		const response = await fetch("/api/words", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				languageId: Number(data.languageId),
				categoryId: Number(data.categoryId),
				subCategoryId: subCategoryId ? Number(subCategoryId) : null,
				words,
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
					Words List <span className="text-secondary">*</span>
				</label>

				<textarea
					{...register("wordList")}
					rows={8}
					className="border-2 border-theme rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
					placeholder={`Enter words as CSV list:\n\napple, a fruit\nrun, move quickly\nhappy, feeling joy`}
					required
				/>

				<p className="text-sm text-theme-light mt-2">
					Each line should contain: word, meaning
				</p>
			</div>


			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">

				<div>
					<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base lg:text-lg">
						Language <span className="text-secondary">*</span>
					</label>

					<select
						{...register("languageId")}
						className="border-2 border-theme rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg bg-white"
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
						Category <span className="text-secondary">*</span>
					</label>

					<select
						{...register("categoryId")}
						className="border-2 border-theme rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg bg-white"
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
					Subcategory
				</label>

				{!useCustomSubCategory ? (
					<div>
						<select
							{...register("subCategoryId")}
							className="border-2 border-theme rounded-xl p-4 w-full bg-white"
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
							className="text-sm text-primary mt-3"
						>
							➕ Create new subcategory
						</button>
					</div>
				) : (
					<div>
						<input
							{...register("subCategoryName")}
							className="border-2 border-theme rounded-xl p-4 w-full"
							placeholder="Enter new subcategory name"
						/>

						<button
							type="button"
							onClick={() => setUseCustomSubCategory(false)}
							className="text-sm text-theme-light mt-3"
						>
							← Select existing
						</button>
					</div>
				)}
			</div>


			<button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold w-full">
				💾 Save Words
			</button>

		</form>
	);
}