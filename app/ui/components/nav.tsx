export default function Nav() {
	return (
		<ul className="flex p-2 bg-theme-dark w-full rounded-sm mb-4 sticky top-2">
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
