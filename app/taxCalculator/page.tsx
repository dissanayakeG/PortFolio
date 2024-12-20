"use client";

import { useState } from "react";

export default function Page() {
	interface TaxGroup {
		percentage: number;
		bracket: number;
	}

	interface NewTaxGroup {
		previousBracket: number;
		from: number;
		upTo: number;
		taxForThisGroupUpperLimit: number;
		taxUptoNow: number;
		bracket: number;
		percentage: number;
	}

	const taxFreeLimit: number = 150_000;
	const [yourSalary, setYourSalary] = useState<number>(0);
	const [totalTax, setTotalTax] = useState<number | string>(0);
	let taxCategory: any;
	const maxEarningsForAYearForFirstBracket: number = 1_000_000 / 12; //1 Million
	const bracketSizeForRestOfTheIncome: number = 500_000 / 12; //1/2 Million
	let previousBracket: number = 0;
	let fromValue: number;
	let totalTaxUpToPreviousGroup: number = 0;

	const taxGroups: TaxGroup[] = [
		{
			percentage: 6,
			bracket: 1,
		},
		{
			percentage: 18,
			bracket: 2,
		},
		{
			percentage: 24,
			bracket: 3,
		},
		{
			percentage: 30,
			bracket: 4,
		},
		{
			percentage: 36,
			bracket: 5,
		},
	];

	let newTaxGroups: NewTaxGroup[] = [];

	const updateTaxGroups = () => {
		for (let group of taxGroups) {
			let newGroup = buildTaxGroup(group);
			newTaxGroups.push(newGroup);
		}

		let lastGroup: object = newTaxGroups[4];
		previousBracket = newTaxGroups[4].bracket;
		for (
			let i = lastGroup.upTo;
			i <= 10_000_000;
			i += bracketSizeForRestOfTheIncome
		) {
			let newGroup = {
				previousBracket: previousBracket,
				from: lastGroup.upTo,
				upTo: Math.round(
					lastGroup.upTo + bracketSizeForRestOfTheIncome
				),
				taxForThisGroupUpperLimit:
					(bracketSizeForRestOfTheIncome * 36) / 100,
				taxUptoNow:
					lastGroup.taxUptoNow +
					(bracketSizeForRestOfTheIncome * 36) / 100,
				bracket: previousBracket + 1,
				percentage: 36,
			};
			lastGroup = newGroup;
			previousBracket = lastGroup.bracket;
			newTaxGroups.push(newGroup);
		}
	};

	const buildTaxGroup = (group: any) => {
		if (group.bracket == 1) {
			return {
				previousBracket: group.bracket - 1,
				from: taxFreeLimit,
				upTo: Math.round(
					taxFreeLimit + maxEarningsForAYearForFirstBracket
				),
				taxForThisGroupUpperLimit:
					getTaxForCurrentGroupUpperLimit(group),
				taxUptoNow: Math.round(
					((group.upTo - group.from) * group.percentage) / 100
				),
				bracket: group.bracket,
				percentage: group.percentage,
			};
		} else {
			let newGroup = {
				previousBracket: group.bracket - 1,
				from: getFromValue(previousBracket),
				upTo: getUptoValue(previousBracket),
				taxForThisGroupUpperLimit:
					getTaxForCurrentGroupUpperLimit(group),
				taxUptoNow: getTaxUptoNow(),
				bracket: group.bracket,
				percentage: group.percentage,
			};
			previousBracket++;
			return newGroup;
		}
	};

	const getTaxForCurrentGroupUpperLimit = (group: object) => {
		let taxForCurrentGroup =
			((group.upTo - group.from) * group.percentage) / 100;
		//tax up to now + taxForCurrentGroup
		totalTaxUpToPreviousGroup = Math.round(
			totalTaxUpToPreviousGroup + taxForCurrentGroup
		);
		return Math.round(taxForCurrentGroup);
	};

	const getFromValue = (previousBracket: number) => {
		return Math.round(newTaxGroups[previousBracket].upTo);
	};

	const getUptoValue = (previousBracket: number) => {
		fromValue = newTaxGroups[previousBracket].upTo;
		return Math.round(fromValue + bracketSizeForRestOfTheIncome);
	};

	const getTaxUptoNow = () => {
		return totalTaxUpToPreviousGroup;
	};

	updateTaxGroups();
	// console.log("newTaxGroups", newTaxGroups);

	const findTaxCategory = (): void => {
		for (let group of newTaxGroups) {
			if (yourSalary > group.from && yourSalary <= group.upTo) {
				taxCategory = group;
			}
		}
	};

	const calculateTaxForLastBracket = (): number => {
		return ((yourSalary - taxCategory.from) * taxCategory.percentage) / 100;
	};

	const taxUptoPreviousBracket = (): number => {
		return taxCategory.taxUptoNow - taxCategory.taxForThisGroupUpperLimit;
	};

	const updateFullTax = () => {
		setTotalTax(taxUptoPreviousBracket() + calculateTaxForLastBracket());
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Ensure the value is a valid number
		const parsedValue = value ? parseInt(value) : 0;
		setYourSalary(parsedValue);
	};

	const calculateFinalTax = () => {
		if (yourSalary > 10_000_000) {
			setTotalTax(
				"Don't consider your tax, if you get this much salary..."
			);
			return;
		}
		if (yourSalary > taxFreeLimit) {
			console.log(yourSalary);
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
