"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Paragraph } from "@/components/ui/p";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Input } from "@/components/ui/input";
import { WordFormFormData, WordFormProps, WordFormSubCategory } from "@/types/WordsTypes";

export default function WordForm({ languages, categories }: WordFormProps) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<WordFormFormData>({
		defaultValues: {
			languageId: languages[0]?.id?.toString() || "",
			categoryId: categories[0]?.id?.toString() || "",
			subCategoryId: "",
			wordList: "",
		},
	});

	const [subCategories, setSubCategories] = useState<WordFormSubCategory[]>([]);
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

	// Validation logic for format and malicious scripts
	const validateWordList = (value: string) => {
		if (!value.trim()) return "Word list cannot be empty.";

		// 1. Basic Malicious text/XSS protection check
		const containsVulnerabilityText =
			/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|onerror=|onload=/i.test(
				value,
			);
		if (containsVulnerabilityText) {
			return "Security Warning: Invalid or restricted characters detected in text.";
		}

		// 2. Format validation logic
		const lines = value.split(/\r?\n/).filter((line) => line.trim() !== "");
		for (let i = 0; i < lines.length; i++) {
			const parts = lines[i].split(",");
			if (parts.length < 2 || !parts[0].trim() || !parts[1].trim()) {
				return `Line ${i + 1} is invalid. Make sure it follows the format: word, meaning`;
			}
		}

		return true;
	};

	async function onSubmit(data: WordFormFormData) {
		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			let finalSubCategoryId: number | null = null;

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
			} else if (!useCustomSubCategory && data.subCategoryId) {
				finalSubCategoryId = Number(data.subCategoryId);
			}

			const words = data.wordList
				.split(/\r?\n/)
				.filter((line) => line.trim() !== "")
				.map((line) => {
					const parts = line.split(",");
					const word = parts[0].trim();
					const meaning = parts.slice(1).join(",").trim();
					return { word, meaning };
				});

			const response = await fetch("/api/words", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					languageId: Number(data.languageId),
					categoryId: Number(data.categoryId),
					subCategoryId: finalSubCategoryId,
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
					{...register("wordList", { validate: validateWordList })}
					rows={8}
					className={`border-2 rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 transition-all ${
						errors.wordList
							? "border-red-500 focus:ring-red-500 focus:border-red-500"
							: "border-theme focus:ring-primary focus:border-primary"
					}`}
					placeholder={`Enter words as CSV list:\n\napple, a fruit\nrun, move quickly\nhappy, feeling joy`}
				/>

				{/* Dynamic Error Message Block */}
				{errors.wordList ? (
					<p className="mt-2 text-sm font-semibold text-red-500 flex items-center gap-1 animate-pulse">
						⚠️ {errors.wordList.message}
					</p>
				) : (
					<Paragraph>
						Each line should contain: word, meaning
					</Paragraph>
				)}
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
