"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { getTaskAdapter } from "@/lib/tasks/taskAdapter";
import { AddEntryFormData, TaskList } from "@/types/TasksTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Heading1 } from "@/components/ui/h1";
import { Heading3 } from "@/components/ui/h3";
import { Paragraph } from "@/components/ui/p";

function todayKey(): string {
	return new Date().toISOString().slice(0, 10);
}

function formatDateLabel(dateKey: string): string {
	const date = new Date(`${dateKey}T00:00:00`);
	return date.toLocaleDateString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default function TaskListDetail({ listId }: { listId: string }) {
	const [list, setList] = useState<TaskList | null | undefined>(undefined);
	const [useCustomItem, setUseCustomItem] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { register, handleSubmit, reset, watch } = useForm<AddEntryFormData>({
		defaultValues: { itemName: "", quantity: "", note: "" },
	});

	const selectedItem = watch("itemName");

	useEffect(() => {
		getTaskAdapter()
			.getList(listId)
			.then(setList);
	}, [listId]);

	async function refresh() {
		const updated = await getTaskAdapter().getList(listId);
		setList(updated);
	}

	async function onSubmit(data: AddEntryFormData) {
		if (!list || isSubmitting) return;

		const itemName = (useCustomItem ? data.itemName : selectedItem)?.trim();
		if (!itemName) return;

		setIsSubmitting(true);
		try {
			if (useCustomItem) {
				await getTaskAdapter().addItem(list.id, itemName);
			}

			await getTaskAdapter().addEntry(list.id, {
				date: todayKey(),
				itemName,
				quantity:
					list.trackQuantity && data.quantity
						? Number(data.quantity)
						: undefined,
				note: data.note,
			});

			reset({ itemName: "", quantity: "", note: "" });
			setUseCustomItem(false);
			await refresh();
		} catch (error) {
			console.error("Failed to add entry:", error);
			alert("Could not save this entry.");
		} finally {
			setIsSubmitting(false);
		}
	}

	async function handleRemoveEntry(date: string, entryId: string) {
		if (!list) return;
		await getTaskAdapter().removeEntry(list.id, date, entryId);
		await refresh();
	}

	async function handleDeleteList() {
		if (!list) return;
		if (!confirm("Delete this task list? This cannot be undone.")) return;
		await getTaskAdapter().deleteList(list.id);
		window.location.href = "/tasks";
	}

	if (list === undefined) {
		return <Paragraph className="text-gray-500 text-center">Loading…</Paragraph>;
	}

	if (list === null) {
		return (
			<div className="max-w-3xl mx-auto">
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
			</div>
		);
	}

	const sortedDates = Object.keys(list.entries).sort((a, b) => b.localeCompare(a));

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			<div>
				<Link
					href="/tasks"
					className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 font-medium"
				>
					← Back to Task Lists
				</Link>

				<div className="flex items-start justify-between gap-4">
					<div>
						<Heading1>{list.trackQuantity ? "🏋️" : "📋"} {list.name}</Heading1>
						{list.description && (
							<Paragraph className="mt-2">{list.description}</Paragraph>
						)}
					</div>

					<div className="flex gap-3 shrink-0">
						<Link
							href={`/tasks/${list.id}/edit`}
							className="bg-theme/50 hover:bg-theme text-gray-900 px-4 py-2.5 rounded-xl font-semibold border border-theme transition-all text-sm"
						>
							✏️ Edit
						</Link>
						<button
							onClick={handleDeleteList}
							className="bg-secondary/20 hover:bg-secondary/30 text-secondary-dark px-4 py-2.5 rounded-xl font-semibold border border-secondary transition-all text-sm"
						>
							🗑️ Delete
						</button>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-2xl border-2 border-theme shadow-lg p-6 sm:p-8">
				<Heading3 className="mb-5">Log an entry for today</Heading3>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
					<div>
						<Label>
							Item <span className="text-secondary">*</span>
						</Label>

						{!useCustomItem ? (
							<div>
								<Select {...register("itemName")}>
									<option value="">Select an item</option>
									{list.items.map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
								</Select>

								<LinkButton
									type="button"
									onClick={() => setUseCustomItem(true)}
									className="text-sm text-primary mt-3"
								>
									➕ Add a new item
								</LinkButton>
							</div>
						) : (
							<div>
								<Input
									{...register("itemName")}
									placeholder="Enter a new item name"
								/>
								<LinkButton
									type="button"
									onClick={() => setUseCustomItem(false)}
									className="text-sm text-theme-light mt-3"
								>
									← Select existing
								</LinkButton>
							</div>
						)}
					</div>

					{list.trackQuantity && (
						<div>
							<Label>{list.quantityLabel || "Quantity"}</Label>
							<Input
								type="number"
								step="any"
								{...register("quantity")}
								placeholder={`e.g. 12 ${list.quantityLabel || "reps"}`}
							/>
						</div>
					)}

					<div>
						<Label>
							Note <span className="text-theme-light text-sm font-normal">(Optional)</span>
						</Label>
						<Input {...register("note")} placeholder="Any notes..." />
					</div>

					<Button
						type="submit"
						disabled={isSubmitting}
						className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold w-full disabled:opacity-50"
					>
						{isSubmitting ? "⏳ Saving..." : "➕ Log Entry"}
					</Button>
				</form>
			</div>

			<div className="space-y-5">
				<Heading3>History</Heading3>

				{sortedDates.length === 0 && (
					<div className="w-full rounded-2xl border-2 border-dashed border-theme bg-theme/20 p-8 text-center">
						<Paragraph>No entries logged yet</Paragraph>
					</div>
				)}

				{sortedDates.map((date) => (
					<div
						key={date}
						className="bg-white rounded-2xl border border-theme shadow-sm p-5 sm:p-6"
					>
						<div className="font-bold text-gray-900 mb-3">
							{formatDateLabel(date)}
							{date === todayKey() && (
								<span className="ml-2 text-xs bg-primary-light/20 text-primary-dark px-2 py-1 rounded-lg align-middle">
									Today
								</span>
							)}
						</div>

						<ul className="space-y-2">
							{list.entries[date].map((entry) => (
								<li
									key={entry.id}
									className="flex items-center justify-between gap-3 bg-theme/10 rounded-xl px-4 py-3"
								>
									<div className="min-w-0">
										<span className="font-semibold text-gray-900">
											{entry.itemName}
										</span>
										{entry.quantity !== undefined && (
											<span className="ml-2 text-sm text-primary-dark font-medium">
												{entry.quantity} {list.quantityLabel}
											</span>
										)}
										{entry.note && (
											<div className="text-sm text-gray-600 truncate">
												{entry.note}
											</div>
										)}
									</div>

									<button
										onClick={() => handleRemoveEntry(date, entry.id)}
										aria-label="Remove entry"
										className="text-theme-light hover:text-secondary-dark transition-colors shrink-0"
									>
										✕
									</button>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}


