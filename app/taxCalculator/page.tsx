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
		const value = e.target.value.replace(/\D/g, "");
		const parsedValue = value ? parseInt(value) : 0;
		setYourSalary(parsedValue);
	};

	const calculateFinalTax = () => {
		setTotalTax(0);
		if (yourSalary > 10_000_000) {
			setTotalTax(
				`Don't Lie😂
				Maximum calculation limit is 10 million😎`
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
		<div className="w-full min-w-md max-w-md">
			<form className="bg-primary-dark shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-80">
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="salary"
					>
						Enter Your Salary
					</label>
					<input
						className="min-w-md max-w-md shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="salary"
						type="text"
						placeholder="Enter Salary"
						onChange={handleInputChange}
						value={yourSalary}
					/>
				</div>

				<button
					className="shadow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full max-w-md"
					type="button"
					onClick={calculateFinalTax}
				>
					Calculate
				</button>
				{typeof totalTax === "number" ? (
					<>
						<div className="mt-2 font-bold flex">
							<p className="text-secondary-light mr-2">
								Your Total Tax is (LKR):
							</p>
							<p className="text-red-500">{totalTax}</p>
						</div>
						<div className="mt-2 font-bold flex">
							<p className="text-secondary-light mr-2">
								Remaining Salary (LKR):
							</p>
							<p className="text-green-500">
								{yourSalary - totalTax}
							</p>
						</div>
						{totalTax ? (
							<div className="text-green-500">
								Tax percentage for total salary :{" "}
								{((totalTax / yourSalary) * 100).toFixed(2)} %
							</div>
						) : (
							<></>
						)}
					</>
				) : (
					<p className="mt-2 font-normal text-secondary">
						{totalTax}
					</p>
				)}
			</form>
		</div>
	);
}
