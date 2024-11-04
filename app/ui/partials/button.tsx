export default function Button({ text }: { text: string }) {
	return (
		<button className="p-2 bg-slate-200 rounded-sm hover:bg-slate-500">
			{text}
		</button>
	);
}
