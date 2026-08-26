import { Metadata } from "next";
import EditTaskListForm from "@/components/tasks/EditTaskListForm";
import { CustomLink } from "@/components/ui/customLink";
import { Heading1 } from "@/components/ui/h1";

export const metadata: Metadata = {
	title: "Edit Task List",
	description: "Update the name, description, or quantity label for this task list.",
};

export default async function EditTaskListPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<div className="max-w-3xl mx-auto">
			<CustomLink href={`/tasks/${id}`}>← Back to Task List</CustomLink>

			<div className="mb-8">
				<Heading1>Edit Task List</Heading1>
			</div>

			<div className="bg-white rounded-2xl border-2 border-theme shadow-lg p-6 sm:p-8">
				<EditTaskListForm listId={id} />
			</div>
		</div>
	);
}
