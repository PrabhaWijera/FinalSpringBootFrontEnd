

export class Hotel{

    constructor(hotelID, hotelName, hotelCategory, location, locationCoordinate, hotelEmail, contactNumber01, ContactNumber02, boolean, petsStatus, FullBoarddoublehotelFee, HalfBoardDoublehotelFee, FullBoardTriplehotelFee, HalfBoardTriplehotelFee, CancellationCriteria, String, remark) {
        this._hotelID = hotelID;
        this._hotelName = hotelName;
        this._hotelCategory = hotelCategory;
        this._location = location;
        this._locationCoordinate = locationCoordinate;
        this._hotelEmail = hotelEmail;
        this._contactNumber01 = contactNumber01;
        this._ContactNumber02 = ContactNumber02;
        this._boolean = boolean;
        this._petsStatus = petsStatus;
        this._FullBoarddoublehotelFee = FullBoarddoublehotelFee;
        this._HalfBoardDoublehotelFee = HalfBoardDoublehotelFee;
        this._FullBoardTriplehotelFee = FullBoardTriplehotelFee;
        this._HalfBoardTriplehotelFee = HalfBoardTriplehotelFee;
        this._CancellationCriteria = CancellationCriteria;
        this._String = String;
        this._remark = remark;
    }

    get hotelID() {
        return this._hotelID;
    }

    set hotelID(value) {
        this._hotelID = value;
    }

    get hotelName() {
        return this._hotelName;
    }

    set hotelName(value) {
        this._hotelName = value;
    }

    get hotelCategory() {
        return this._hotelCategory;
    }

    set hotelCategory(value) {
        this._hotelCategory = value;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }

    get locationCoordinate() {
        return this._locationCoordinate;
    }

    set locationCoordinate(value) {
        this._locationCoordinate = value;
    }

    get hotelEmail() {
        return this._hotelEmail;
    }

    set hotelEmail(value) {
        this._hotelEmail = value;
    }

    get contactNumber01() {
        return this._contactNumber01;
    }

    set contactNumber01(value) {
        this._contactNumber01 = value;
    }

    get ContactNumber02() {
        return this._ContactNumber02;
    }

    set ContactNumber02(value) {
        this._ContactNumber02 = value;
    }

    get boolean() {
        return this._boolean;
    }

    set boolean(value) {
        this._boolean = value;
    }

    get petsStatus() {
        return this._petsStatus;
    }

    set petsStatus(value) {
        this._petsStatus = value;
    }

    get FullBoarddoublehotelFee() {
        return this._FullBoarddoublehotelFee;
    }

    set FullBoarddoublehotelFee(value) {
        this._FullBoarddoublehotelFee = value;
    }

    get HalfBoardDoublehotelFee() {
        return this._HalfBoardDoublehotelFee;
    }

    set HalfBoardDoublehotelFee(value) {
        this._HalfBoardDoublehotelFee = value;
    }

    get FullBoardTriplehotelFee() {
        return this._FullBoardTriplehotelFee;
    }

    set FullBoardTriplehotelFee(value) {
        this._FullBoardTriplehotelFee = value;
    }

    get HalfBoardTriplehotelFee() {
        return this._HalfBoardTriplehotelFee;
    }

    set HalfBoardTriplehotelFee(value) {
        this._HalfBoardTriplehotelFee = value;
    }

    get CancellationCriteria() {
        return this._CancellationCriteria;
    }

    set CancellationCriteria(value) {
        this._CancellationCriteria = value;
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
new Hotel();