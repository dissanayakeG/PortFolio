export default function Nav() {
	return (
		<ul className="flex p-2 bg-slate-500 w-full rounded-sm mb-4">
			<li className="mr-6">
				<a className="text-white hover:text-amber-300" href="/">
					Home
				</a>
			</li>
			<li className="mr-6">
				<a className="text-white hover:text-amber-300" href="/blog">
					Blog
				</a>
			</li>
		</ul>
	);
}
