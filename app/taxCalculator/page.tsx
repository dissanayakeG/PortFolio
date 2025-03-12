import { Metadata } from "next";
import TaxCalculator from "./components/TaxCalculator";

export const metadata: Metadata = {
	title: "SL Payee Tax Calculator",
	description:
		"Calculate your Sri Lanka PAYEE taxes effortlessly with Madusanka's SL Payee Tax Calculator. Accurate, easy-to-use tool for employees and businesses in Sri Lanka.",
};

export default function Page() {
	return <TaxCalculator />;
}
