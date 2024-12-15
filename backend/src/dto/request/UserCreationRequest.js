
class UserCreationRequest {

    constructor({ username, email, password, phoneNumber, name, birthDate, gender, address }) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.address = address;
    }
}

module.exports = UserCreationRequest;