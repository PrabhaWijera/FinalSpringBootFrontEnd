
export class Customer{




    constructor(user_id, userName, user_nic, user_password, gender, age, email, contactNumber, remark, userNic_Photo) {
        this._user_id = user_id;
        this._userName = userName;
        this._user_nic = user_nic;
        this._user_password = user_password;
        this._gender = gender;
        this._age = age;
        this._email = email;
        this._contactNumber = contactNumber;
        this._remark = remark;
        this._userNic_Photo = userNic_Photo;
    }

    get user_id() {
        return this._user_id;
    }

    set user_id(value) {
        this._user_id = value;
    }

    get userName() {
        return this._userName;
    }

    set userName(value) {
        this._userName = value;
    }

    get user_nic() {
        return this._user_nic;
    }

    set user_nic(value) {
        this._user_nic = value;
    }

    get user_password() {
        return this._user_password;
    }

    set user_password(value) {
        this._user_password = value;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._gender = value;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get contactNumber() {
        return this._contactNumber;
    }

    set contactNumber(value) {
        this._contactNumber = value;
    }

    get remark() {
        return this._remark;
    }

    set remark(value) {
        this._remark = value;
    }

    get userNic_Photo() {
        return this._userNic_Photo;
    }

    set userNic_Photo(value) {
        this._userNic_Photo = value;
    }
}
new Customer();