

class UserResponse {
    constructor({ userId, username, email, phoneNumber, name, birthDate, gender, address, role }) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.birthDate = birthDate;
        this.address = address;
        this.gender = gender;
        this.role = role;
    }
}

module.exports = UserResponse;