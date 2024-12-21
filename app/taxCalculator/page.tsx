"use client";
import { useState } from "react";
import taxGroups from "../lib/buildTaxGroups";

export default function Page() {
	const taxFreeLimit: number = 150_000;
	const [yourSalary, setYourSalary] = useState<number>(0);
	const [totalTax, setTotalTax] = useState<number | string>(0);
	let taxCategory: any;

	const findTaxCategory = (): void => {
		for (let group of taxGroups) {
			if (yourSalary > group.from && yourSalary <= group.upTo) {
				taxCategory = group;
			}
		}
	};

	const calculateTaxForLastBracket = (): number => {
		return (yourSalary - taxCategory.from) * taxCategory.percentage;
	};

	const taxUptoPreviousBracket = (): number => {
		return taxCategory.taxUptoNow - taxCategory.taxForThisGroupUpperLimit;
	};

	const updateFullTax = () => {
		setTotalTax(0);
		setTotalTax(taxUptoPreviousBracket() + calculateTaxForLastBracket());
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Ensure the value is a valid number
		const parsedValue = value ? parseInt(value) : 0;
		setYourSalary(parsedValue);
	};

	const calculateFinalTax = () => {
		setTotalTax(0);
		if (yourSalary > 10_000_000) {
			setTotalTax(
				"Don't consider your tax, if you get this much salary..."
			);
			return;
		}
		if (yourSalary > taxFreeLimit) {
			findTaxCategory();
			calculateTaxForLastBracket();
			updateFullTax();
		} else {
			setTotalTax(0);
		}
	};

	return (
		<div className="w-full max-w-xs">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="salary"
					>
						Your Salary
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="salary"
						type="text"
						placeholder="Enter Salary"
						onBlur={handleInputChange}
					/>
				</div>
				<p>Your Total Tax: {totalTax}</p>

				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="button"
					onClick={calculateFinalTax}
				>
					Calculate
				</button>
			</form>
		</div>
	);
}
