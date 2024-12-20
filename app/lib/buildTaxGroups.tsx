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
const maxEarningsForAYearForFirstBracket: number = 1_000_000 / 12; //1 Million
const bracketSizeForRestOfTheIncome: number = 500_000 / 12; //1/2 Million
let previousBracket: number = 0;
let fromValue: number;
let totalTaxUpToPreviousGroup: number = 0;
let newTaxGroups: NewTaxGroup[] = [];

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

const addStaticTaxGroups = () => {
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
			upTo: Math.round(lastGroup.upTo + bracketSizeForRestOfTheIncome),
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
			upTo: Math.round(taxFreeLimit + maxEarningsForAYearForFirstBracket),
			taxForThisGroupUpperLimit: getTaxForCurrentGroupUpperLimit(group),
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
			taxForThisGroupUpperLimit: getTaxForCurrentGroupUpperLimit(group),
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

const updateTaxGroups = () => {
	for (let group of taxGroups) {
		let newGroup = buildTaxGroup(group);
		newTaxGroups.push(newGroup);
	}
	addStaticTaxGroups();
	return newTaxGroups;
};

export default updateTaxGroups;
