"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paragraph } from "@/components/ui/p";
import { getTaskAdapter } from "@/lib/tasks/taskAdapter";
import { EditTaskListFormData, TaskList } from "@/types/TasksTypes";

function EditTaskListFormFields({ list }: { list: TaskList }) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { register, handleSubmit } = useForm<EditTaskListFormData>({
		defaultValues: {
			name: list.name,
			description: list.description || "",
			quantityLabel: list.quantityLabel || "",
		},
	});

	async function onSubmit(data: EditTaskListFormData) {
		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			await getTaskAdapter().updateListMeta(list.id, {
				name: data.name,
				description: data.description,
				quantityLabel: data.quantityLabel,
			});

			router.push(`/tasks/${list.id}`);
			router.refresh();
		} catch (error) {
			console.error("Failed to update task list:", error);
			alert("An unexpected error occurred while updating.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div>
				<Label>
					List Name <span className="text-secondary">*</span>
				</Label>
				<Input {...register("name", { required: true })} placeholder="List name" />
			</div>

			<div>
				<Label>
					Description <span className="text-theme-light text-sm font-normal">(Optional)</span>
				</Label>
				<Input {...register("description")} placeholder="What is this list for?" />
			</div>

			{list.trackQuantity && (
				<div>
					<Label>Quantity Label</Label>
					<Input {...register("quantityLabel")} placeholder="Reps, Sets, Minutes..." />
				</div>
			)}

			<Button
				type="submit"
				disabled={isSubmitting}
				className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold w-full disabled:opacity-50"
			>
				{isSubmitting ? "⏳ Saving..." : "💾 Save Changes"}
			</Button>
		</form>
	);
}

export default function EditTaskListForm({ listId }: { listId: string }) {
	const [list, setList] = useState<TaskList | null | undefined>(undefined);

	useEffect(() => {
		getTaskAdapter()
			.getList(listId)
			.then(setList);
	}, [listId]);

	if (list === undefined) {
		return <Paragraph className="text-gray-500 text-center">Loading…</Paragraph>;
	}

	if (list === null) {
		return (
			<div className="bg-secondary-light/20 border-2 border-secondary rounded-2xl p-10 text-center">
				<div className="text-6xl mb-4">😕</div>
				<h1 className="text-3xl font-bold text-gray-900 mb-3">Task list not found</h1>
				<Link
					href="/tasks"
					className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
				>
					← Back to Task Lists
				</Link>
			</div>
		);
	}

	return <EditTaskListFormFields list={list} />;
}
