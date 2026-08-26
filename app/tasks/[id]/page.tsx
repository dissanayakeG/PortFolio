import { Metadata } from "next";
import TaskListDetail from "@/components/tasks/TaskListDetail";

export const metadata: Metadata = {
	title: "Task List",
	description: "View and log entries for this task list.",
};

export default async function TaskListPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <TaskListDetail listId={id} />;
}
