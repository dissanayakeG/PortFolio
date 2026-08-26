import { Metadata } from "next";
import NewTaskListForm from "@/components/tasks/NewTaskListForm";
import { CustomLink } from "@/components/ui/customLink";
import { Heading1 } from "@/components/ui/h1";
import { Paragraph } from "@/components/ui/p";

export const metadata: Metadata = {
	title: "New Task List",
	description: "Create a new task list to track a daily habit.",
};

export default function NewTaskListPage() {
	return (
		<div className="max-w-3xl mx-auto">
			<CustomLink href="/tasks">← Back to Task Lists</CustomLink>

			<div className="mb-8 sm:mb-10">
				<Heading1>New Task List</Heading1>
				<Paragraph>
					Set up a new list to track daily items, like meals or workouts
				</Paragraph>
			</div>

			<div className="bg-white rounded-2xl border-2 border-theme shadow-lg p-6 sm:p-8 lg:p-10">
				<NewTaskListForm />
			</div>
		</div>
	);
}
