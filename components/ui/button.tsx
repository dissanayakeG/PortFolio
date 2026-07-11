export default function Button({ text }: { text: string }) {
	return (
		<button className="p-2 bg-theme-dark rounded-sm hover:bg-theme">
			{text}
		</button>
	);
}
