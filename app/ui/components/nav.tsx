export default function Nav() {
	return (
		<ul className="flex p-2 bg-theme-dark w-full rounded-sm mb-4 sticky top-2 border-2 border-theme">
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
			<li className="mr-6">
				<a
					className="text-white hover:text-secondary"
					href="/taxCalculator"
				>
					Payee Tax (SL 2025)
				</a>
			</li>
		</ul>
	);
}
