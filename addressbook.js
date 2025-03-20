class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
       

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
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

        this.contacts.push(contact);
    }

    

    displayContacts() {
        this.contacts.forEach(contact => {
            console.log(contact.getFullName(), ',', contact.city, ',', contact.state,",",contact.zip);
        });
    }
}


