import { Heading3 } from "@/components/ui/h3";
import { Paragraph } from "@/components/ui/p";

export default function WordCardView() {
	return (
		<div className="w-full rounded-2xl border-2 border-dashed border-theme bg-theme/20 p-8 sm:p-16 text-center mx-auto">
			<div className="text-5xl sm:text-6xl mb-4">📚</div>

			<Heading3>No words found</Heading3>

			<Paragraph>Try searching with another word or meaning</Paragraph>
		</div>
	);
}
