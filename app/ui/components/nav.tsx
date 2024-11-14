export default function Nav() {
	return (
		<ul className="flex p-2 bg-theme-light w-full rounded-sm mb-4 sticky top-0">
			<li className="mr-6">
				<a className="text-white hover:text-secondary" href="/">
					Home
				</a>
			</li>
			<li className="mr-6">
				<a className="text-white hover:text-secondary" href="/blog">
					Blog
				</a>
			</li>
		</ul>
	);
}
