

export class Pay{

    constructor(String, payID, DailyIncome, AnnualIncome, MonthlyIncome, int, WeeklyIncome) {
        this._String = String;
        this._payID = payID;
        this._DailyIncome = DailyIncome;
        this._AnnualIncome = AnnualIncome;
        this._MonthlyIncome = MonthlyIncome;
        this._int = int;
        this._WeeklyIncome = WeeklyIncome;
    }

    get String() {
        return this._String;
    }

    set String(value) {
        this._String = value;
    }

    get payID() {
        return this._payID;
    }

    set payID(value) {
        this._payID = value;
    }

    get DailyIncome() {
        return this._DailyIncome;
    }

    set DailyIncome(value) {
        this._DailyIncome = value;
    }

    get AnnualIncome() {
        return this._AnnualIncome;
    }

    set AnnualIncome(value) {
        this._AnnualIncome = value;
    }

    get MonthlyIncome() {
        return this._MonthlyIncome;
    }

    set MonthlyIncome(value) {
        this._MonthlyIncome = value;
    }

    get int() {
        return this._int;
    }

    set int(value) {
        this._int = value;
    }

    get WeeklyIncome() {
        return this._WeeklyIncome;
    }

    set WeeklyIncome(value) {
        this._WeeklyIncome = value;
    }
}
new Pay();