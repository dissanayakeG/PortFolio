export interface Experience {
	company: string;
	duration: string;
	skills: string;
	breakdown: {
		designation: string;
		duration: string;
		notes: string;
	}[];
};

export interface PostMetadata {
	title: string,
	subtitle: string,
	date: string,
	slug: string,
	tags:string[],
}

export interface GroupsTaxPercentages {
	percentage: number;
	bracket: number;
}

export interface TaxGroup {
	previousBracket: number;
	from: number;
	upTo: number;
	taxForThisGroupUpperLimit: number;
	taxUptoNow: number;
	bracket: number;
	percentage: number;
}