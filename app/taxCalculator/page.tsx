import { Metadata } from "next";
import TaxCalculator from "./components/TaxCalculator";

export const metadata: Metadata = {
	title: "SL PAYE Tax Calculator",
	description:
		"Calculate your Sri Lanka PAYE taxes effortlessly with SL PAYE Tax Calculator. Accurate, easy-to-use tool for employees and businesses in Sri Lanka.",
};

export default function Page() {
	return (
		<div className="flex flex-col items-center">
			<TaxCalculator />
		</div>
	);
}
