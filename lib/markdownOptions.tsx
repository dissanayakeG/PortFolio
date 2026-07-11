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
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

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
		img: {
			component: "img" as React.ElementType,
			props: { style: { width: "500px", height: "300px" } },
		},
		h1: {
			component: "h1" as React.ElementType,
			props: { className: "text-3xl font-bold text-secondary-dark" },
		},
		h2: {
			component: "h2" as React.ElementType,
			props: { className: "text-2xl font-bold text-secondary" },
		},
		h3: {
			component: "h3" as React.ElementType,
			props: { className: "text-xl font-semibold text-secondary" },
		},
		h4: {
			component: "h4" as React.ElementType,
			props: { className: "text-lg font-semibold text-secondary" },
		},
		ul: {
			component: "ul" as React.ElementType,
			props: { className: "list-disc list-inside" },
		},
		table: {
			component: "table" as React.ElementType,
			props: {
				className:
					"min-w-full my-4 border-collapse bg-theme-light rounded-lg overflow-hidden",
			},
		},
		thead: {
			component: "thead" as React.ElementType,
			props: {
				className: "bg-theme text-primary border-b border-gray-700",
			},
		},
		th: {
			component: "th" as React.ElementType,
			props: {
				className: "px-6 py-2 text-left text-sm font-semibold",
			},
		},
		tbody: {
			component: "tbody" as React.ElementType,
			props: {
				className: "divide-y divide-gray-700",
			},
		},
		tr: {
			component: "tr" as React.ElementType,
			props: {
				className: "",
			},
		},
		td: {
			component: "td" as React.ElementType,
			props: {
				className:
					"px-6 py-2 text-sm text-secondary-light whitespace-normal",
			},
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
