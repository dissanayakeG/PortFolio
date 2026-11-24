import { TaxGroup } from "@/types/Types";
import styles from "@/components/content.module.css";

export default function TaxTable({ taxBrackets }: { taxBrackets: TaxGroup[] }) {
	return (
		<div className={styles.tableCard}>
			<div className={styles.tableTitle}><h2>Tax brackets used</h2></div>
			<div className={styles.tableWrap}><table className={styles.taxTable}>
				<thead>
					<tr>
						<th>From</th><th>Up To</th><th>Rate</th><th>Tax (group)</th><th>Tax (total)</th>
					</tr>
				</thead>
				<tbody>
					{taxBrackets.length > 0 ? (
						taxBrackets.map((tax, index) => (
							<tr key={index}>
								<td>
									{tax.from}
								</td>
								<td>
									{tax.upTo}
								</td>
								<td>
									{(tax.percentage * 100).toFixed(2)}%
								</td>
								<td>
									{tax.taxForThisGroupUpperLimit}
								</td>
								<td>
									{tax.taxUptoNow}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={5}
								className={styles.emptyCell}
							>
								No tax brackets available
							</td>
						</tr>
					)}
				</tbody>
			</table></div>
		</div>
	);
}
