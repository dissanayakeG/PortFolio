import { prisma } from "@/lib/prisma";
import ImportForm from "@/components/words/ImportForm";
import Link from "next/link";
import { CustomLink } from "@/components/ui/customLink";
import { Heading1 } from "@/components/ui/h1";
import { Phetsarath } from "next/font/google";
import { Paragraph } from "@/components/ui/p";

export default async function ImportPage() {
	const languages = await prisma.language.findMany({
		orderBy: {
			name: "asc",
		},
	});

	const categories = await prisma.category.findMany({
		orderBy: {
			name: "asc",
		},
	});

	return (
		<div className="max-w-4xl mx-auto">
			<CustomLink href="/words">← Back to Words</CustomLink>

			<div className="mb-10">
				<Heading1>Import Vocabulary</Heading1>
				<Paragraph>
					Upload a CSV file to bulk import multiple words at once
				</Paragraph>
			</div>

			<div className="bg-white rounded-2xl border border-theme shadow-sm p-8 mb-7">
				<ImportForm languages={languages} categories={categories} />
			</div>
		</div>
	);
}
