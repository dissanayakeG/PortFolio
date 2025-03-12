"use client";
import { useState } from "react";
import { TaxGroup } from "@/app/definitions/Types";
import taxGroups from "../../lib/buildTaxGroups";
import TaxTable from "./TaxTable";
import TaxResults from "./TaxResults";

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
		<div className="w-full min-w-md max-w-xl">
			<form className="bg-theme shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-80">
				<div className="mb-4">
					<label
						className="block text-primary text-sm font-bold mb-2"
						htmlFor="salary"
					>
						Enter Your Salary
					</label>
					<input
						className="min-w-md max-w-md shadow appearance-none border rounded border-primary-light w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
						id="salary"
						type="text"
						placeholder="Enter Salary"
						onChange={handleInputChange}
						value={salary}
					/>
				</div>

				<button
					className="shadow bg-primary-light hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full max-w-md"
					type="button"
					onClick={calculateFinalTax}
				>
					Calculate
				</button>
				<button
					className="mt-2 shadow bg-theme-light hover:bg-theme-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full max-w-md"
					type="button"
					onClick={clearTax}
				>
					Clear
				</button>

				<TaxResults totalTax={totalTax} salary={Number(salary)} />
			</form>

			<TaxTable taxBrackets={taxBrackets} />
		</div>
	);
}
