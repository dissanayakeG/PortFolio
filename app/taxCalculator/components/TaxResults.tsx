export default function TaxResults({
	totalTax,
	salary,
}: {
	totalTax: number | string;
	salary: number;
}) {
	if (typeof totalTax === "string") {
		return <p className="mt-2 font-normal text-primary">{totalTax}</p>;
	}

	return (
		<>
			<div className="mt-2 font-bold flex">
				<p className="text-primary-light mr-2">
					Your Total Tax is (LKR):
				</p>
				<p className="text-red-500">{totalTax.toFixed(0)}</p>
			</div>
			<div className="mt-2 font-bold flex">
				<p className="text-primary-light mr-2">
					Remaining Salary (LKR):
				</p>
				<p className="text-green-500">{(salary - totalTax).toFixed(0)}</p>
			</div>
			{totalTax > 0 && (
				<div className="text-green-500 font-bold">
					Tax percentage for total salary:{" "}
					{((totalTax / salary) * 100).toFixed(2)}%
				</div>
			)}
		</>
	);
}
