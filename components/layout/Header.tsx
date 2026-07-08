export default function Header() {
	return (
		<header className="h-20 border-b-2 border-gray-200 bg-white flex items-center px-6 sm:px-8 shadow-md sticky top-0 z-10">
			<div className="flex items-center gap-3">
				<div className="md:hidden text-3xl">📚</div>
				<h2 className="font-bold text-2xl text-gray-900 md:hidden">Study Helper</h2>
			</div>
		</header>
	);
}
