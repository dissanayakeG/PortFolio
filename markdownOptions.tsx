import React from "react";
import Prism from "prismjs";

type MarkdownOptions = {
	overrides: {
		[key: string]: {
			component: React.ElementType;
			props?: Record<string, any>;
		};
	};
};

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";

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
			component: ({
				children,
				className,
			}: {
				children: string;
				className: string;
			}) => {
				const language = className
					? className.replace("language-", "")
					: "";
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
