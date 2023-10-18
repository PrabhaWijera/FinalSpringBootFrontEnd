

export class Vehicle{

    constructor(vehicleID, vehicleBrand, vehicleCategory, fuelType, hybrid, fuelUsage, vehicleImg, vehicleInteriorImg, seatCapacity, transmissionType, driverName, conNumber, driverlicenseImg, String, remarks) {
        this._vehicleID = vehicleID;
        this._vehicleBrand = vehicleBrand;
        this._vehicleCategory = vehicleCategory;
        this._fuelType = fuelType;
        this._hybrid = hybrid;
        this._fuelUsage = fuelUsage;
        this._vehicleImg = vehicleImg;
        this._vehicleInteriorImg = vehicleInteriorImg;
        this._seatCapacity = seatCapacity;
        this._transmissionType = transmissionType;
        this._driverName = driverName;
        this._conNumber = conNumber;
        this._driverlicenseImg = driverlicenseImg;
        this._String = String;
        this._remarks = remarks;
    }

    get vehicleID() {
        return this._vehicleID;
    }

    set vehicleID(value) {
        this._vehicleID = value;
    }

    get vehicleBrand() {
        return this._vehicleBrand;
    }

    set vehicleBrand(value) {
        this._vehicleBrand = value;
    }

    get vehicleCategory() {
        return this._vehicleCategory;
    }

    set vehicleCategory(value) {
        this._vehicleCategory = value;
    }

    get fuelType() {
        return this._fuelType;
    }

    set fuelType(value) {
        this._fuelType = value;
    }

    get hybrid() {
        return this._hybrid;
    }

    set hybrid(value) {
        this._hybrid = value;
    }

    get fuelUsage() {
        return this._fuelUsage;
    }

    set fuelUsage(value) {
        this._fuelUsage = value;
    }

    get vehicleImg() {
        return this._vehicleImg;
    }

    set vehicleImg(value) {
        this._vehicleImg = value;
    }

    get vehicleInteriorImg() {
        return this._vehicleInteriorImg;
    }

    set vehicleInteriorImg(value) {
        this._vehicleInteriorImg = value;
    }

    get seatCapacity() {
        return this._seatCapacity;
    }

    set seatCapacity(value) {
        this._seatCapacity = value;
    }

    get transmissionType() {
        return this._transmissionType;
    }

    set transmissionType(value) {
        this._transmissionType = value;
    }

    get driverName() {
        return this._driverName;
    }

    set driverName(value) {
        this._driverName = value;
    }

    get conNumber() {
        return this._conNumber;
    }

    set conNumber(value) {
        this._conNumber = value;
    }

    get driverlicenseImg() {
        return this._driverlicenseImg;
    }

    set driverlicenseImg(value) {
        this._driverlicenseImg = value;
    }

    get String() {
        return this._String;
    }

    set String(value) {
        this._String = value;
    }

    get remarks() {
        return this._remarks;
    }

    set remarks(value) {
        this._remarks = value;
    }
}
new Vehicle();