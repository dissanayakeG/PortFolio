"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Paragraph } from "@/components/ui/p";
import { getTaskAdapter } from "@/lib/tasks/taskAdapter";
import { NewTaskListFormData } from "@/types/TasksTypes";

export default function NewTaskListForm() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<NewTaskListFormData>({
		defaultValues: {
			name: "",
			description: "",
			listType: "checklist",
			quantityLabel: "Reps",
			itemsList: "",
		},
	});

	const listType = watch("listType");

	async function onSubmit(data: NewTaskListFormData) {
		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			const items = data.itemsList
				.split(/\r?\n/)
				.map((item) => item.trim())
				.filter(Boolean);

			const list = await getTaskAdapter().createList({
				name: data.name.trim(),
				description: data.description?.trim() || undefined,
				trackQuantity: data.listType === "quantity",
				quantityLabel:
					data.listType === "quantity"
						? data.quantityLabel?.trim() || "Reps"
						: undefined,
				items,
			});

			router.push(`/tasks/${list.id}`);
			router.refresh();
		} catch (error) {
			console.error("Failed to create task list:", error);
			alert("An unexpected error occurred while creating the task list.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8">
			<div>
				<Label>
					List Name <span className="text-secondary">*</span>
				</Label>
				<Input
					{...register("name", { required: "Name is required" })}
					placeholder="e.g. Daily Meals, Workouts"
				/>
				{errors.name && (
					<p className="mt-2 text-sm font-semibold text-red-500">
						⚠️ {errors.name.message}
					</p>
				)}
			</div>

			<div>
				<Label>
					Description <span className="text-theme-light text-sm font-normal">(Optional)</span>
				</Label>
				<Input {...register("description")} placeholder="What is this list for?" />
			</div>

			<div>
				<Label>
					Tracking Type <span className="text-secondary">*</span>
				</Label>
				<Select {...register("listType")}>
					<option value="checklist">Checklist (mark items done)</option>
					<option value="quantity">Quantity (e.g. reps, sets, minutes)</option>
				</Select>
				<Paragraph className="text-sm text-gray-500 mt-2">
					Use Quantity for things like workouts where you log a number each time.
				</Paragraph>
			</div>

			{listType === "quantity" && (
				<div>
					<Label>Quantity Label</Label>
					<Input {...register("quantityLabel")} placeholder="Reps, Sets, Minutes..." />
				</div>
			)}

			<div>
				<Label>
					Items <span className="text-theme-light text-sm font-normal">(one per line, optional — you can add more later)</span>
				</Label>
				<textarea
					{...register("itemsList")}
					rows={6}
					className="border-2 border-theme rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
					placeholder={`Enter one item per line, e.g.:\n\nBreakfast\nLunch\nDinner`}
				/>
			</div>

			<Button
				type="submit"
				disabled={isSubmitting}
				className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold w-full disabled:opacity-50"
			>
				{isSubmitting ? "⏳ Creating..." : "✅ Create Task List"}
			</Button>
		</form>
	);
}
