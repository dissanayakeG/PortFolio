"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTaskAdapter } from "@/lib/tasks/taskAdapter";
import { TaskListSummary } from "@/types/TasksTypes";
import { CustomLink } from "@/components/ui/customLink";
import { Heading3 } from "@/components/ui/h3";
import { Paragraph } from "@/components/ui/p";
import NoTaskListFound from "@/components/tasks/partials/NoTaskListFound";

export default function TaskListsOverview() {
	const [summaries, setSummaries] = useState<TaskListSummary[] | null>(null);

	useEffect(() => {
		let cancelled = false;

		getTaskAdapter()
			.listSummaries()
			.then((data) => {
				if (!cancelled) setSummaries(data);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	async function handleDelete(id: string) {
		if (!confirm("Delete this task list? This cannot be undone.")) return;

		await getTaskAdapter().deleteList(id);
		setSummaries((prev) => (prev ? prev.filter((s) => s.id !== id) : prev));
	}

	if (summaries === null) {
		return (
			<Paragraph className="text-gray-500 text-center">Loading task lists…</Paragraph>
		);
	}

	return (
		<div className="w-full space-y-6 sm:space-y-8">
			{summaries.length === 0 && <NoTaskListFound />}

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
				{summaries.map((summary) => (
					<div
						key={summary.id}
						className="bg-white rounded-2xl border-2 border-theme shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-3"
					>
						<div className="flex items-start justify-between gap-3">
							<Link href={`/tasks/${summary.id}`} className="flex-1 min-w-0">
								<Heading3 className="text-gray-900 truncate hover:text-primary transition-colors">
									{summary.trackQuantity ? "🏋️" : "📋"} {summary.name}
								</Heading3>
							</Link>

							<button
								onClick={() => handleDelete(summary.id)}
								aria-label={`Delete ${summary.name}`}
								className="text-theme-light hover:text-secondary-dark transition-colors text-sm"
							>
								🗑️
							</button>
						</div>

						{summary.description && (
							<Paragraph className="text-gray-600 text-sm line-clamp-2">
								{summary.description}
							</Paragraph>
						)}

						<div className="flex flex-wrap gap-2 text-xs sm:text-sm">
							<span className="inline-flex items-center gap-1 bg-theme/30 text-theme-dark px-3 py-1 rounded-lg font-medium">
								{summary.itemCount} items
							</span>
							<span className="inline-flex items-center gap-1 bg-primary-light/20 text-primary-dark px-3 py-1 rounded-lg font-medium">
								{summary.totalEntries} logged
							</span>
						</div>

						<CustomLink href={`/tasks/${summary.id}`} className="mt-1">
							Open →
						</CustomLink>
					</div>
				))}
			</div>
		</div>
	);
}
