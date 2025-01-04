"use client";
import { useState } from "react";
import { TaxGroup } from "@/app/definitions/Types";
import taxGroups from "../lib/buildTaxGroups";

export default function Page() {
	const taxFreeLimit: number = 150_000;
	const [yourSalary, setYourSalary] = useState<any>("");
	const [totalTax, setTotalTax] = useState<number | string>(0);
	let taxCategory: TaxGroup;
	const [taxBuildings, setTaxBuildings] = useState<TaxGroup[]>([]);

	const findTaxCategory = (): void => {
		for (let group of taxGroups) {
			if (yourSalary > group.from && yourSalary <= group.upTo) {
				taxCategory = group;
				break;
			}
		}

		if (taxCategory) {
			const buildings = taxGroups.slice(0, taxCategory?.bracket);
			const taxFreeGroup = [
				{
					previousBracket: NaN,
					from: 0,
					upTo: taxFreeLimit,
					taxForThisGroupUpperLimit: 0,
					taxUptoNow: 0,
					bracket: 1,
					percentage: 0,
				},
			];

			setTaxBuildings(taxFreeGroup.concat(buildings));
		} else {
			setTaxBuildings([]);
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
		setTotalTax(0);
		let value = e.target.value;
		// const regex = /^[+-]?\d*\.?\d*$/;
		const regex = /^(\d+(\.\d*)?)?$/;

		if (regex.test(value)) {
			setYourSalary(value);
		}
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

	const clearTax = () => {
		setTotalTax(0);
		setYourSalary("");
		setTaxBuildings([]);
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
						value={yourSalary}
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
				{typeof totalTax === "number" ? (
					<>
						<div className="mt-2 font-bold flex">
							<p className="text-primary-light mr-2">
								Your Total Tax is (LKR):
							</p>
							<p className="text-red-500">{totalTax}</p>
						</div>
						<div className="mt-2 font-bold flex">
							<p className="text-primary-light mr-2">
								Remaining Salary (LKR):
							</p>
							<p className="text-green-500">
								{yourSalary - totalTax}
							</p>
						</div>
						{totalTax ? (
							<div className="text-green-500 font-bold">
								Tax percentage for total salary :{" "}
								{((totalTax / yourSalary) * 100).toFixed(2)} %
							</div>
						) : (
							<></>
						)}
					</>
				) : (
					<p className="mt-2 font-normal text-primary">{totalTax}</p>
				)}
			</form>

			<div className="bg-theme shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-80">
				<table className="table-auto w-full text-left border-collapse">
					<thead>
						<tr>
							<th className="px-4 py-2 border-b">From</th>
							<th className="px-4 py-2 border-b">Up To</th>
							<th className="px-4 py-2 border-b">Percentage</th>
							<th className="px-4 py-2 border-b">
								Tax For Group
							</th>
							<th className="px-4 py-2 border-b">Tax Upto Now</th>
						</tr>
					</thead>
					<tbody>
						{taxBuildings.length > 0 ? (
							taxBuildings.map((tax: any, index: number) => (
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
		</div>
	);
}
