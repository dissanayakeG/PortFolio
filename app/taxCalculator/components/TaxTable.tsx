import { TaxGroup } from "@/app/definitions/Types";

export default function TaxTable({ taxBrackets }: { taxBrackets: TaxGroup[] }) {
	return (
		<div className="bg-theme shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-80 overflow-x-auto">
			<table className="table-auto w-full text-left border-collapse">
				<thead>
					<tr>
						<th className="px-4 py-2 border-b font-normal text-primary">From</th>
						<th className="px-4 py-2 border-b font-normal text-primary">Up To</th>
						<th className="px-4 py-2 border-b font-normal text-primary">%</th>
						<th className="px-4 py-2 border-b font-normal text-primary">Tax (Group)</th>
						<th className="px-4 py-2 border-b font-normal text-primary">Tax (Total)</th>
					</tr>
				</thead>
				<tbody>
					{taxBrackets.length > 0 ? (
						taxBrackets.map((tax, index) => (
							<tr key={index}>
								<td className="px-4 py-2 border-b">
									{tax.from}
								</td>
								<td className="px-4 py-2 border-b">
									{tax.upTo}
								</td>
								<td className="px-4 py-2 border-b">
									{(tax.percentage * 100).toFixed(2)}%
								</td>
								<td className="px-4 py-2 border-b">
									{tax.taxForThisGroupUpperLimit}
								</td>
								<td className="px-4 py-2 border-b">
									{tax.taxUptoNow}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={5}
								className="px-4 py-2 border-b text-center"
							>
								No tax brackets available
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
