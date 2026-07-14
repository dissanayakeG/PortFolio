"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { LinkButton } from "@/components/ui/link-button";
import { EditWordFormFormData, EditWordFormProps, EditWordFormSubCategory } from "@/types/WordsTypes";

export default function EditWordForm({
	wordData,
	languages,
	categories,
}: EditWordFormProps) {
	const router = useRouter();
	const { register, handleSubmit, watch, setValue } = useForm<EditWordFormFormData>({
		defaultValues: {
			word: wordData.word,
			languageId: wordData.languageId,
			categoryId: wordData.categoryId,
			subCategoryId: wordData.subCategoryId || undefined,
			meaning:
				wordData.meanings.find((m) => m.languageId === 1)?.meaning ||
				wordData.meanings[0]?.meaning ||
				"",
		},
	});
	const [subCategories, setSubCategories] = useState<EditWordFormSubCategory[]>([]);
	const [useCustomSubCategory, setUseCustomSubCategory] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const selectedCategoryId = watch("categoryId");

	useEffect(() => {
		if (selectedCategoryId) {
			fetch(`/api/words/subcategories?categoryId=${selectedCategoryId}`)
				.then((res) => res.json())
				.then((data) => {
					setSubCategories(data);
					if (
						wordData.subCategoryId &&
						wordData.categoryId === Number(selectedCategoryId)
					) {
						setValue("subCategoryId", wordData.subCategoryId);
					}
				});
		}
	}, [
		selectedCategoryId,
		wordData.subCategoryId,
		wordData.categoryId,
		setValue,
	]);

	async function onSubmit(data: EditWordFormFormData) {
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

			const englishMeaning = wordData.meanings.find(
				(m) => m.languageId === 1,
			);
			if (englishMeaning && englishMeaning.meaning !== data.meaning) {
				await fetch(
					`/api/words/${wordData.id}/meanings/${englishMeaning.id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							meaning: data.meaning,
						}),
					},
				);
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
				<Label>
					Word <span className="text-secondary">*</span>
				</Label>
				<Input
					{...register("word")}
					placeholder="Enter the word"
					required
				/>
			</div>

			<div>
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
				<Label>
					Subcategory{" "}
					<span className="text-theme-light text-sm font-normal">
						(Optional)
					</span>
				</Label>
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
							onClick={() => setUseCustomSubCategory(true)}
						>
							<span>➕</span> Create new subcategory
						</LinkButton>
					</div>
				) : (
					<div>
						<Input
							{...register("subCategoryName")}
							placeholder="Enter new subcategory name"
						/>
						<LinkButton
							type="button"
							onClick={() => setUseCustomSubCategory(false)}
						>
							<span>←</span> Select existing
						</LinkButton>
					</div>
				)}
			</div>

			<div>
				<Label>
					Meaning <span className="text-secondary">*</span>
				</Label>
				<Input
					{...register("meaning")}
					placeholder="Enter the meaning"
					required
				/>
			</div>

			<Button
				type="submit"
				disabled={isLoading}
				className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary disabled:from-theme-light disabled:to-theme text-white px-8 py-4 rounded-xl font-semibold w-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
			>
				{isLoading ? "⏳ Updating..." : "💾 Update Word"}
			</Button>
		</form>
	);
}
