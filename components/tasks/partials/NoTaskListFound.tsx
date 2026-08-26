import { Heading3 } from "@/components/ui/h3";
import { Paragraph } from "@/components/ui/p";

export default function NoTaskListFound() {
	return (
		<div className="w-full rounded-2xl border-2 border-dashed border-theme bg-theme/20 p-8 sm:p-16 text-center mx-auto">
			<div className="text-5xl sm:text-6xl mb-4">🗒️</div>

			<Heading3>No task lists yet</Heading3>

			<Paragraph>Create your first task list to start tracking daily habits</Paragraph>
		</div>
	);
}
