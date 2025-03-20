class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {

        if (!this.isValidName(firstName)) throw new Error("Invalid First Name");
        if (!this.isValidName(lastName)) throw new Error("Invalid Last Name");
        if (!this.isValidAddress(address)) throw new Error("Invalid Address");
        if (!this.isValidAddress(city)) throw new Error("Invalid City");
        if (!this.isValidAddress(state)) throw new Error("Invalid State");
        if (!this.isValidZip(zip)) throw new Error("Invalid ZIP Code");
        if (!this.isValidPhoneNumber(phoneNumber)) throw new Error("Invalid Phone Number");
        if (!this.isValidEmail(email)) throw new Error("Invalid Email");

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    isValidName(name) {
        return /^[A-Z][a-zA-Z]{2,}$/.test(name);
    }

    isValidAddress(value) {
        return /^[A-Za-z0-9\s]{4,}$/.test(value);
    }

    isValidZip(zip) {
        return /^[0-9]{6}$/.test(zip);
    }

    isValidPhoneNumber(phoneNumber) {
        return /^[0-9]{10}$/.test(phoneNumber);
    }

    isValidEmail(email) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        if (!(contact instanceof Contact)) throw new Error("Invalid contact object");
        this.contacts.push(contact);
    }

    displayContacts() {
        this.contacts.forEach(contact => {
            console.log(
                contact.getFullName(), ',',contact.phoneNumber,',',contact.email,',', contact.city, ',', contact.state, ',', contact.zip
            );
        });
    }
}
class AddressBookManager {
    constructor() {
        this.addressBooks = {};
    }

    createAddressBook(bookName) {
        if (this.addressBooks[bookName]) {
            throw new Error(`Address Book '${bookName}' already exists.`);
        }
        this.addressBooks[bookName] = [];
    }

    addContactToBook(bookName, contact) {
        if (!this.addressBooks[bookName]) {
            throw new Error(`Address Book '${bookName}' does not exist.`);
        }
        if (!(contact instanceof Contact)) throw new Error("Invalid contact object");

        this.addressBooks[bookName].push(contact);
    }

    displayAllBooks() {
        for (const [bookName, contacts] of Object.entries(this.addressBooks)) {
            console.log(`\n📖 Address Book: ${bookName}`);
            contacts.forEach(contact => {
                console.log(
                    contact.getFullName(),',', contact.phoneNumber, ',', contact.email, ',', contact.city, ',', contact.state, ',', contact.zip
                );
            });
        }
    }
}