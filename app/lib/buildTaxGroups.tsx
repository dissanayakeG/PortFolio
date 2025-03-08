import { TaxGroup, GroupsTaxPercentages } from "@/app/definitions/Types";

class TaxBracketConfig {
    private static readonly TAX_FREE_LIMIT = 150_000;
    private static readonly MONTHLY_FIRST_BRACKET = 1_000_000 / 12;
    private static readonly MONTHLY_OTHER_BRACKETS = 500_000 / 12;
    private static readonly MAX_AMOUNT = 10_000_000;
    private static readonly FIXED_TAX_PERCENTAGE = 0.36;

    static readonly DEFAULT_BRACKETS: readonly GroupsTaxPercentages[] = [
        { percentage: 0.06, bracket: 1 },
        { percentage: 0.18, bracket: 2 },
        { percentage: 0.24, bracket: 3 },
        { percentage: 0.30, bracket: 4 },
        { percentage: 0.36, bracket: 5 }
    ] as const;

    static get taxFreeLimit() { return this.TAX_FREE_LIMIT; }
    static get firstBracketSize() { return this.MONTHLY_FIRST_BRACKET; }
    static get otherBracketsSize() { return this.MONTHLY_OTHER_BRACKETS; }
    static get maxAmount() { return this.MAX_AMOUNT; }
    static get fixedTaxPercentage() { return this.FIXED_TAX_PERCENTAGE; }
}

class TaxGroupBuilder {
    private readonly taxGroups: TaxGroup[] = [];
    private accumulatedTax = 0;

    private calculateTaxAmount(amount: number, percentage: number): number {
        return Math.round(amount * percentage);
    }

    private addTaxGroup(
        from: number,
        upTo: number,
        taxAmount: number,
        bracket: number,
        percentage: number
    ): void {
        this.accumulatedTax += taxAmount;
        
        this.taxGroups.push({
            previousBracket: bracket - 1,
            from,
            upTo,
            taxForThisGroupUpperLimit: taxAmount,
            taxUptoNow: this.accumulatedTax,
            bracket,
            percentage
        });
    }

    private buildVariablePercentageBrackets(): void {
        TaxBracketConfig.DEFAULT_BRACKETS.forEach((group, index) => {
            const isFirstBracket = index === 0;
            const from = isFirstBracket 
                ? TaxBracketConfig.taxFreeLimit 
                : this.taxGroups[index - 1].upTo;
            
            const bracketSize = isFirstBracket 
                ? TaxBracketConfig.firstBracketSize 
                : TaxBracketConfig.otherBracketsSize;

            const upTo = Math.round(from + bracketSize);
            const taxAmount = this.calculateTaxAmount(bracketSize, group.percentage);

            this.addTaxGroup(from, upTo, taxAmount, group.bracket, group.percentage);
        });
    }

    private buildStaticPercentageBrackets(): void {
        let lastGroup = this.taxGroups[this.taxGroups.length - 1];

        while (lastGroup.upTo <= TaxBracketConfig.maxAmount) {
            const taxAmount = this.calculateTaxAmount(
                TaxBracketConfig.otherBracketsSize,
                TaxBracketConfig.fixedTaxPercentage
            );

            this.addTaxGroup(
                lastGroup.upTo,
                Math.round(lastGroup.upTo + TaxBracketConfig.otherBracketsSize),
                taxAmount,
                lastGroup.bracket + 1,
                TaxBracketConfig.fixedTaxPercentage
            );

            lastGroup = this.taxGroups[this.taxGroups.length - 1];
        }
    }

    public build(): readonly TaxGroup[] {
        this.buildVariablePercentageBrackets();
        this.buildStaticPercentageBrackets();
        return Object.freeze([...this.taxGroups]);
    }
}

export default new TaxGroupBuilder().build();