import React from "react";
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-php";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";

type MarkdownOptions = {
	overrides: {
		[key: string]: {
			component: React.ElementType;
			props?: Record<string, any>;
		};
	};
};
type CodeOptions = {
	children: string;
	className: string;
};

const markdownOptions: MarkdownOptions = {
	overrides: {
		h1: {
			component: "h1" as React.ElementType,
			props: { className: "text-2xl font-bold" },
		},
		h2: {
			component: "h2" as React.ElementType,
			props: { className: "text-xl font-semibold" },
		},
		ul: {
			component: "ul" as React.ElementType,
			props: { className: "list-disc list-inside" },
		},
		code: {
			component: ({ children, className }: CodeOptions) => {
				const language =
					className
						?.replace("lang-", "language-")
						.replace("language-", "") || "markup";

				const html = Prism.highlight(
					children,
					Prism.languages[language] || Prism.languages.markup,
					language
				);

				return (
					<pre className={`language-${language}`}>
						<code
							className={`language-${language}`}
							dangerouslySetInnerHTML={{ __html: html }}
						/>
					</pre>
				);
			},
		},
	},
};

export default markdownOptions;
