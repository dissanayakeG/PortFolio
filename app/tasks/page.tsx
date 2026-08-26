import { Metadata } from "next";
import TaskListsOverview from "@/components/tasks/TaskListsOverview";
import { CustomLink } from "@/components/ui/customLink";
import { Heading1 } from "@/components/ui/h1";
import { Paragraph } from "@/components/ui/p";

export const metadata: Metadata = {
	title: "Daily Task Tracker",
	description:
		"Create custom task lists to track daily habits like meals and workouts, and log entries every day.",
};

export default function TasksPage() {
	return (
		<div className="w-full max-w-5xl mx-auto min-w-0 overflow-hidden px-4 sm:px-6 lg:px-8">
			<div className="mb-8 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
				<div>
					<Heading1>🗒️ Daily Task Tracker</Heading1>
					<Paragraph className="mt-2">
						Track what you eat, your workouts, or any daily habit
					</Paragraph>
				</div>

				<CustomLink
					href="/tasks/new"
					className="text-center rounded-xl bg-primary hover:bg-primary-dark px-5 py-3 text-white text-sm sm:text-base font-bold transition-all shadow-lg hover:shadow-xl no-underline hover:no-underline"
				>
					➕ New Task List
				</CustomLink>
			</div>

			<TaskListsOverview />
		</div>
	);
}
