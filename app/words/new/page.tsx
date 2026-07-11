import { prisma } from "@/lib/prisma";
import WordForm from "@/components/words/WordForm";
import Link from "next/link";
import { Heading1 } from "@/components/ui/h1";
import { CustomLink } from "@/components/ui/customLink";
import { Paragraph } from "@/components/ui/p";

export default async function AddWordPage() {
	const languages = await prisma.language.findMany({
		orderBy: { name: "asc" },
	});

	const categories = await prisma.category.findMany({
		orderBy: { name: "asc" },
	});

	return (
		<div className="max-w-5xl mx-auto">
			<CustomLink href="/words">← Back to Words</CustomLink>

			<div className="mb-8 sm:mb-10 lg:mb-14">
				<Heading1>Add New Word</Heading1>
				<Paragraph>
					Expand your vocabulary by adding a new word
				</Paragraph>
			</div>

			<div className="bg-white rounded-2xl border-2 border-theme shadow-lg p-6 sm:p-8 lg:p-12">
				<WordForm languages={languages} categories={categories} />
			</div>
		</div>
	);
}
