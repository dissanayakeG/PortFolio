"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Paragraph } from "../ui/p";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { LinkButton } from "../ui/link-button";
import { Input } from "../ui/input";

type FormData = {
	wordList: string;
	languageId: string; // Changed to string because HTML select yields strings
	categoryId: string; // Changed to string because HTML select yields strings
	subCategoryId?: string;
	subCategoryName?: string;
};

type SubCategory = {
	id: number;
	name: string;
	categoryId: number;
};

type Props = {
	languages: { id: number; name: string }[];
	categories: { id: number; name: string }[];
};

export default function WordForm({ languages, categories }: Props) {
	const router = useRouter();

	// Set explicit default values for form selects to avoid undefined passes
	const { register, handleSubmit, watch } = useForm<FormData>({
		defaultValues: {
			languageId: languages[0]?.id?.toString() || "",
			categoryId: categories[0]?.id?.toString() || "",
			subCategoryId: "",
			wordList: "",
		},
	});

	const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
	const [useCustomSubCategory, setUseCustomSubCategory] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const selectedCategoryId = watch("categoryId");

	useEffect(() => {
		if (selectedCategoryId) {
			fetch(`/api/words/subcategories?categoryId=${selectedCategoryId}`)
				.then((res) => res.json())
				.then((data) => setSubCategories(data))
				.catch((err) =>
					console.error("Failed fetching subcategories:", err),
				);
		} else {
			setSubCategories([]);
		}
	}, [selectedCategoryId]);

	async function onSubmit(data: FormData) {
		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			let finalSubCategoryId: number | null = null;

			// 1. Handle Custom Subcategory Creation Safely
			if (useCustomSubCategory && data.subCategoryName?.trim()) {
				const subCatResponse = await fetch("/api/words/subcategories", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: data.subCategoryName.trim(),
						categoryId: Number(data.categoryId),
					}),
				});

				if (subCatResponse.ok) {
					const newSubCat = await subCatResponse.json();
					finalSubCategoryId = Number(newSubCat.id);
				}
			}
			// 2. Handle Selected Existing Subcategory Safely
			else if (!useCustomSubCategory && data.subCategoryId) {
				finalSubCategoryId = Number(data.subCategoryId);
			}

			// 3. Robust CSV parsing handling cross-platform newline discrepancies (\r\n)
			const words = data.wordList
				.split(/\r?\n/)
				.map((line) => {
					const parts = line.split(",");
					if (parts.length < 2) return { word: "", meaning: "" };

					const word = parts[0].trim();
					// Join remainder in case the meaning text contains commas itself
					const meaning = parts.slice(1).join(",").trim();

					return { word, meaning };
				})
				.filter((item) => item.word && item.meaning);

			if (words.length === 0) {
				alert("Please enter at least one valid word and meaning pair.");
				setIsSubmitting(false);
				return;
			}

			// 4. Send clean payload out to your server endpoint
			const response = await fetch("/api/words", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					languageId: Number(data.languageId),
					categoryId: Number(data.categoryId),
					subCategoryId: finalSubCategoryId, // Clean Number or explicit null
					words,
				}),
			});

			if (response.ok) {
				router.push("/words");
				router.refresh();
			} else {
				const errorData = await response.json().catch(() => ({}));
				alert(
					`Error saving words: ${errorData.message || response.statusText}`,
				);
			}
		} catch (error) {
			console.error("Submission error:", error);
			alert("An unexpected error occurred while saving.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-6 lg:space-y-8"
		>
			<div>
				<Label>
					Words List <span className="text-secondary">*</span>
				</Label>
				<textarea
					{...register("wordList")}
					rows={8}
					className="border-2 border-theme rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
					placeholder={`Enter words as CSV list:\n\napple, a fruit\nrun, move quickly\nhappy, feeling joy`}
					required
				/>
				<Paragraph>Each line should contain: word, meaning</Paragraph>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
				<div>
					<Label>
						Language <span className="text-secondary">*</span>
					</Label>
					<Select {...register("languageId")}>
						{languages.map((language) => (
							<option key={language.id} value={language.id}>
								{language.name}
							</option>
						))}
					</Select>
				</div>

				<div>
					<Label>
						Category <span className="text-secondary">*</span>
					</Label>
					<Select {...register("categoryId")}>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</Select>
				</div>
			</div>

			<div>
				<label className="block mb-3 lg:mb-4 font-semibold text-gray-900 text-base lg:text-lg">
					Subcategory
				</label>

				{!useCustomSubCategory ? (
					<div>
						<Select {...register("subCategoryId")}>
							<option value="">None</option>
							{subCategories.map((subCat) => (
								<option key={subCat.id} value={subCat.id}>
									{subCat.name}
								</option>
							))}
						</Select>

						<LinkButton
							type="button"
							onClick={() => setUseCustomSubCategory(true)}
							className="text-sm text-primary mt-3"
						>
							➕ Create new subcategory
						</LinkButton>
					</div>
				) : (
					<div>
						<Input
							{...register("subCategoryName")}
							className="border-2 border-theme rounded-xl p-4 w-full"
							placeholder="Enter new subcategory name"
						/>

						<LinkButton
							type="button"
							onClick={() => setUseCustomSubCategory(false)}
							className="text-sm text-theme-light mt-3"
						>
							← Select existing
						</LinkButton>
					</div>
				)}
			</div>

			<Button
				type="submit"
				disabled={isSubmitting}
				className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold w-full disabled:opacity-50"
			>
				{isSubmitting ? "⏳ Saving..." : "💾 Save Words"}
			</Button>
		</form>
	);
}
