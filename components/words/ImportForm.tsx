"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type FormData = {
	languageId: number;
	categoryId: number;
	subCategoryId?: number;
	subCategoryName?: string;
	file: FileList;
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
		code: string;
	}[];

	categories: {
		id: number;
		name: string;
		code: string;
	}[];
};

export default function ImportForm({ languages, categories }: Props) {
	const router = useRouter();
	const { register, handleSubmit, watch } = useForm<FormData>();
	const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
	const [useCustomSubCategory, setUseCustomSubCategory] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

	const selectedCategoryId = watch("categoryId");

	useEffect(() => {
		if (selectedCategoryId) {
			fetch(`/api/words/subcategories?categoryId=${selectedCategoryId}`)
				.then((res) => res.json())
				.then((data) => setSubCategories(data));
		}
	}, [selectedCategoryId]);

	async function onSubmit(data: FormData) {
		setIsLoading(true);
		setMessage(null);

		try {
			const file = data.file[0];
			if (!file) {
				setMessage({ type: "error", text: "Please select a CSV file" });
				setIsLoading(false);
				return;
			}

			if (!file.name.endsWith(".csv")) {
				setMessage({ type: "error", text: "Only CSV files are allowed" });
				setIsLoading(false);
				return;
			}

			const formData = new FormData();
			formData.append("file", file);
			formData.append("languageId", data.languageId.toString());
			formData.append("categoryId", data.categoryId.toString());

			if (useCustomSubCategory && data.subCategoryName?.trim()) {
				formData.append("subCategoryName", data.subCategoryName.trim());
			} else if (data.subCategoryId) {
				formData.append("subCategoryId", data.subCategoryId.toString());
			}

			const response = await fetch("/api/words/import", {
				method: "POST",
				body: formData,
			});

			const result = await response.json();

			if (response.ok) {
				setMessage({
					type: "success",
					text: `Successfully imported ${result.count} words!`
				});
				setTimeout(() => {
					router.push("/words");
					router.refresh();
				}, 2000);
			} else {
				setMessage({ type: "error", text: result.error || "Import failed" });
			}
		} catch (error) {
			setMessage({ type: "error", text: "An error occurred during import" });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div>
					<label className="block mb-2.5 font-semibold text-gray-900">
						Language <span className="text-secondary">*</span>
					</label>
					<select
						{...register("languageId")}
						className="border-2 border-theme rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
						required
					>
						<option value="">Select a language</option>
						{languages.map((language) => (
							<option key={language.id} value={language.id}>
								{language.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block mb-2.5 font-semibold text-gray-900">
						Main Category <span className="text-secondary">*</span>
					</label>
					<select
						{...register("categoryId")}
						className="border-2 border-theme rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
						required
					>
						<option value="">Select a category</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div>
				<label className="block mb-2.5 font-semibold text-gray-900">
					Subcategory <span className="text-theme-light text-sm font-normal">(Optional)</span>
				</label>
				{!useCustomSubCategory ? (
					<div>
						<select
							{...register("subCategoryId")}
							className="border-2 border-theme rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
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
							className="border-2 border-theme rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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
				<label className="block mb-2.5 font-semibold text-gray-900">
					CSV File <span className="text-secondary">*</span>
				</label>
				<div className="relative">
					<input
						type="file"
						accept=".csv"
						{...register("file")}
						className="border-2 border-theme rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all file:mr-4 file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-light/20 file:text-primary-dark hover:file:bg-primary-light/30 file:transition-colors cursor-pointer"
						required
					/>
				</div>
			</div>

			{message && (
				<div
					className={`p-5 rounded-xl font-medium ${
						message.type === "success"
							? "bg-secondary-light/20 text-secondary-dark border-2 border-secondary"
							: "bg-secondary/20 text-secondary-dark border-2 border-secondary-dark"
					}`}
				>
					{message.text}
				</div>
			)}

			<button
				type="submit"
				disabled={isLoading}
				className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary disabled:from-theme-light disabled:to-theme text-white px-8 py-4 rounded-xl font-semibold w-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
			>
				{isLoading ? "⏳ Importing..." : "⬆️ Import CSV File"}
			</button>
		</form>
	);
}
