interface GroupsTaxPercentages {
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

const TAX_FREE_LIMIT: number = 150_000;
const BRACKET_SIZE_FOR_FIRST_GROUP: number = 1_000_000 / 12; //1 Million
const BRACKET_SIZE_FOR_OTHER_GROUPS: number = 500_000 / 12; //1/2 Million
const TAX_PERCENTAGE_FOR_FIXED_TAX_GROUPS = 0.36; //36%;

let previousBracket: number = 0;
let currentGroupFromValue: number;
let totalTaxUpToPreviousGroup: number = 0;
let taxGroups: TaxGroup[] = [];
let lastTaxGroup: any;

const groupsTaxPercentages: GroupsTaxPercentages[] = [
	{
		percentage: 0.06,
		bracket: 1,
	},
	{
		percentage: 0.18,
		bracket: 2,
	},
	{
		percentage: 0.24,
		bracket: 3,
	},
	{
		percentage: 0.3,
		bracket: 4,
	},
	{
		percentage: 0.36,
		bracket: 5,
	},
];

const buildTaxGroup = (group: any) => {
	if (group.bracket == 1) {
		let from = TAX_FREE_LIMIT;
		let upTo = Math.round(TAX_FREE_LIMIT + BRACKET_SIZE_FOR_FIRST_GROUP);
		totalTaxUpToPreviousGroup = Math.round(
			(upTo - from) * group.percentage
		);
		return {
			previousBracket: 0,
			from: from,
			upTo: upTo,
			taxForThisGroupUpperLimit: getTaxForCurrentGroupUpperLimit(
				{ percentage: 0.06 },
				BRACKET_SIZE_FOR_FIRST_GROUP
			),
			taxUptoNow: Math.round((upTo - from) * group.percentage),
			bracket: group.bracket,
			percentage: group.percentage,
		};
	} else {
		let taxGroup = {
			previousBracket: group.bracket - 1,
			from: getCurrentGroupFromValue(previousBracket),
			upTo: getUptoValue(previousBracket),
			taxForThisGroupUpperLimit: getTaxForCurrentGroupUpperLimit(
				group,
				BRACKET_SIZE_FOR_OTHER_GROUPS
			),
			taxUptoNow: getTaxUptoNow(group, BRACKET_SIZE_FOR_OTHER_GROUPS),
			bracket: group.bracket,
			percentage: group.percentage,
		};
		previousBracket++;
		return taxGroup;
	}
};

const addStaticTaxGroups = () => {
	lastTaxGroup = taxGroups[4];
	previousBracket = lastTaxGroup.bracket;
	for (
		let i = lastTaxGroup.upTo;
		i <= 10_000_000;
		i += BRACKET_SIZE_FOR_OTHER_GROUPS
	) {
		let taxGroup = {
			previousBracket: previousBracket,
			from: lastTaxGroup.upTo,
			upTo: Math.round(lastTaxGroup.upTo + BRACKET_SIZE_FOR_OTHER_GROUPS),
			taxForThisGroupUpperLimit: Math.round(
				BRACKET_SIZE_FOR_OTHER_GROUPS *
					TAX_PERCENTAGE_FOR_FIXED_TAX_GROUPS
			),
			taxUptoNow:
				lastTaxGroup.taxUptoNow +
				BRACKET_SIZE_FOR_OTHER_GROUPS *
					TAX_PERCENTAGE_FOR_FIXED_TAX_GROUPS,
			bracket: previousBracket + 1,
			percentage: TAX_PERCENTAGE_FOR_FIXED_TAX_GROUPS,
		};
		lastTaxGroup = taxGroup;
		previousBracket = lastTaxGroup.bracket;
		taxGroups.push(taxGroup);
	}
};

const getTaxForCurrentGroupUpperLimit = (
	group: any,
	bracketSize: number
) => {
	let taxForCurrentGroup = bracketSize * group.percentage;
	return Math.round(taxForCurrentGroup);
};

const getCurrentGroupFromValue = (previousBracket: number) => {
	return Math.round(taxGroups[previousBracket].upTo);
};

const getUptoValue = (previousBracket: number) => {
	currentGroupFromValue = taxGroups[previousBracket].upTo;
	return Math.round(currentGroupFromValue + BRACKET_SIZE_FOR_OTHER_GROUPS);
};

const getTaxUptoNow = (group: any, bracketSize: number) => {
	let taxForCurrentGroup = bracketSize * group.percentage;
	totalTaxUpToPreviousGroup = Math.round(
		totalTaxUpToPreviousGroup + taxForCurrentGroup
	);
	return totalTaxUpToPreviousGroup;
};

const updateTaxGroups = () => {
	for (let group of groupsTaxPercentages) {
		let taxGroup = buildTaxGroup(group);
		taxGroups.push(taxGroup);
		lastTaxGroup = taxGroup;
	}
	addStaticTaxGroups();
	return taxGroups;
};

updateTaxGroups();

export default taxGroups;
