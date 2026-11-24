import { Metadata } from "next";
import TaxCalculator from "@/components/taxCalculator/TaxCalculator";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
	title: "SL PAYE Tax Calculator",
	description:
		"Calculate your Sri Lanka PAYE taxes effortlessly with SL PAYE Tax Calculator. Accurate, easy-to-use tool for employees and businesses in Sri Lanka.",
};

export default function Page() {
	return <main className={styles.page}><section className={styles.masthead}><span className={styles.kicker}>Sri Lanka · PAYE</span><h1>Salary tax, made clear.</h1><p>Estimate PAYE tax and see the salary brackets used for the calculation. Enter a gross annual salary to begin.</p></section><div className={styles.calculatorBody}><TaxCalculator /></div></main>;
}
