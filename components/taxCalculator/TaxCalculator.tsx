"use client";
import { useState } from "react";
import { TaxGroup } from "@/types/Types";
import taxGroups from "@/lib/buildTaxGroups";
import TaxTable from "@/components/taxCalculator/TaxTable";
import TaxResults from "@/components/taxCalculator/TaxResults";
import styles from "@/components/content.module.css";

const TAX_FREE_LIMIT = 150_000;
const MAX_SALARY_LIMIT = 10_000_000;

export default function TaxCalculator() {
	const [salary, setSalary] = useState<string>("");
	const [totalTax, setTotalTax] = useState<number | string>(0);
	const [taxBrackets, setTaxBrackets] = useState<TaxGroup[]>([]);

	const findTaxCategory = (salaryAmount: number): TaxGroup | undefined => {
		return taxGroups.find(
			(group) => salaryAmount > group.from && salaryAmount <= group.upTo
		);
	};

	const buildTaxBrackets = (taxCategory: TaxGroup) => {
		const brackets = taxGroups.slice(0, taxCategory.bracket);
		const taxFreeGroup: TaxGroup = {
			previousBracket: NaN,
			from: 0,
			upTo: TAX_FREE_LIMIT,
			taxForThisGroupUpperLimit: 0,
			taxUptoNow: 0,
			bracket: 1,
			percentage: 0,
		};

		setTaxBrackets([taxFreeGroup, ...brackets]);
	};

	const calculateTax = (salaryAmount: number, category: TaxGroup): number => {
		const taxForLastBracket =
			(salaryAmount - category.from) * category.percentage;
		const taxUptoPrevious =
			category.taxUptoNow - category.taxForThisGroupUpperLimit;
		return taxUptoPrevious + taxForLastBracket;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^(\d+(\.\d*)?)?$/.test(value)) {
			setSalary(value);
			setTotalTax(0);
		}
	};

	const calculateFinalTax = () => {
		const salaryAmount = Number(salary);
		setTotalTax(0);
		setTaxBrackets([]);

		if (salaryAmount > MAX_SALARY_LIMIT) {
			setTotalTax(
				"Don't Lie😂\nMaximum calculation limit is 10 million😎"
			);
			return;
		}

		if (salaryAmount <= TAX_FREE_LIMIT) {
			setTotalTax(0);
			return;
		}

		const taxCategory = findTaxCategory(salaryAmount);
		if (taxCategory) {
			buildTaxBrackets(taxCategory);
			setTotalTax(calculateTax(salaryAmount, taxCategory));
		}
	};

	const clearTax = () => {
		setSalary("");
		setTotalTax(0);
		setTaxBrackets([]);
	};

	return (
		<div className={styles.calculatorGrid}>
			<form className={styles.formCard}>
				<h2>Calculate your PAYE</h2>
				<p className={styles.helper}>Enter your gross annual salary in LKR. The estimate uses the brackets shown alongside.</p>
				<div>
					<label
						className={styles.formLabel}
						htmlFor="salary"
					>
						Enter your salary
					</label>
					<input
						className={styles.salaryInput}
						id="salary"
						type="text"
						placeholder="Enter your salary"
						onChange={handleInputChange}
						value={salary}
					/>
				</div>

				<div className={styles.buttonRow}>
					<button
					className={styles.calculate}
					type="button"
					onClick={calculateFinalTax}
				>
					Calculate
				</button>
					<button
					className={styles.clear}
					type="button"
					onClick={clearTax}
				>
					Clear
					</button>
				</div>

				<TaxResults totalTax={totalTax} salary={Number(salary)} />
			</form>

			<TaxTable taxBrackets={taxBrackets} />
		</div>
	);
}
