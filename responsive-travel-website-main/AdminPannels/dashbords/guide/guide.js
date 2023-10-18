

export class Guide{


    constructor(guideID, guideName, guideAddress, guideAge, guideGender, guidePICIMGLocation, guideNICIMGLocation, guideIDIMGLocation, guideExperience, int, manDayValue, String, remark) {
        this._guideID = guideID;
        this._guideName = guideName;
        this._guideAddress = guideAddress;
        this._guideAge = guideAge;
        this._guideGender = guideGender;
        this._guidePICIMGLocation = guidePICIMGLocation;
        this._guideNICIMGLocation = guideNICIMGLocation;
        this._guideIDIMGLocation = guideIDIMGLocation;
        this._guideExperience = guideExperience;
        this._int = int;
        this._manDayValue = manDayValue;
        this._String = String;
        this._remark = remark;
    }

    get guideID() {
        return this._guideID;
    }

    set guideID(value) {
        this._guideID = value;
    }

    get guideName() {
        return this._guideName;
    }

    set guideName(value) {
        this._guideName = value;
    }

    get guideAddress() {
        return this._guideAddress;
    }

    set guideAddress(value) {
        this._guideAddress = value;
    }

    get guideAge() {
        return this._guideAge;
    }

    set guideAge(value) {
        this._guideAge = value;
    }

    get guideGender() {
        return this._guideGender;
    }

    set guideGender(value) {
        this._guideGender = value;
    }

    get guidePICIMGLocation() {
        return this._guidePICIMGLocation;
    }

    set guidePICIMGLocation(value) {
        this._guidePICIMGLocation = value;
    }

    get guideNICIMGLocation() {
        return this._guideNICIMGLocation;
    }

    set guideNICIMGLocation(value) {
        this._guideNICIMGLocation = value;
    }

    get guideIDIMGLocation() {
        return this._guideIDIMGLocation;
    }

    set guideIDIMGLocation(value) {
        this._guideIDIMGLocation = value;
    }

    get guideExperience() {
        return this._guideExperience;
    }

    set guideExperience(value) {
        this._guideExperience = value;
    }

    get int() {
        return this._int;
    }

    set int(value) {
        this._int = value;
    }

    get manDayValue() {
        return this._manDayValue;
    }

    set manDayValue(value) {
        this._manDayValue = value;
    }

    get String() {
        return this._String;
    }

    set String(value) {
        this._String = value;
    }

    get remark() {
        return this._remark;
    }

    set remark(value) {
        this._remark = value;
    }
}
new Guide();