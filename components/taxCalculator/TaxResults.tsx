import styles from "@/components/content.module.css";

export default function TaxResults({ totalTax, salary }: { totalTax: number | string; salary: number }) {
	if (typeof totalTax === "string") return <p className={styles.notice}>{totalTax}</p>;

	return <div className={styles.result}>
		<p className={styles.resultLabel}>Estimated total tax · LKR</p>
		<p className={styles.resultValue}>{totalTax.toFixed(0)}</p>
		<div className={styles.resultMeta}>
			<span>Remaining salary: <strong>{(salary - totalTax).toFixed(0)} LKR</strong></span>
			{totalTax > 0 && <span>Effective tax rate: <strong>{((totalTax / salary) * 100).toFixed(2)}%</strong></span>}
		</div>
	</div>;
}
