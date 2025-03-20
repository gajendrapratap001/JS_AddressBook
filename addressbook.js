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

    updateDetails(updatedDetails) {
        Object.assign(this, updatedDetails);
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

        const isDuplicate = this.addressBooks[bookName].some(
            existingContact => existingContact.getFullName() === contact.getFullName()
        );

        if (isDuplicate) {
            throw new Error(`Duplicate contact '${contact.getFullName()}' found in '${bookName}'`);
        }

        this.addressBooks[bookName].push(contact);
    }

    findContactByName(bookName, fullName) {
        if (!this.addressBooks[bookName]) {
            throw new Error(`Address Book '${bookName}' does not exist.`);
        }

        return this.addressBooks[bookName].find(contact => contact.getFullName() === fullName);
    }

    editContact(bookName, fullName, updatedDetails) {
        const contact = this.findContactByName(bookName, fullName);
        if (!contact) {
            throw new Error(`Contact '${fullName}' not found in '${bookName}'`);
        }

        contact.updateDetails(updatedDetails);
        console.log(`Contact '${fullName}' updated successfully.`);
    }
   
    deleteContact(bookName, fullName) {
        if (!this.addressBooks[bookName]) {
            throw new Error(`Address Book '${bookName}' does not exist.`);
        }

        const index = this.addressBooks[bookName].findIndex(contact => contact.getFullName() === fullName);

        if (index === -1) {
            throw new Error(`Contact '${fullName}' not found in '${bookName}'`);
        }

        this.addressBooks[bookName].splice(index, 1);
        console.log(`Contact '${fullName}' deleted successfully.`);
    }

    countContactsInBook(bookName) {
        if (!this.addressBooks[bookName]) {
            throw new Error(`Address Book '${bookName}' does not exist.`);
        }

        return this.addressBooks[bookName].length;
    }

    countTotalContacts() {
        return Object.values(this.addressBooks).reduce((total, contacts) => total + contacts.length, 0);
    }
    
    searchByCityOrState(bookName, location) {
        if (!this.addressBooks[bookName]) {
            throw new Error(`Address Book '${bookName}' does not exist.`);
        }
    
        const results = this.addressBooks[bookName].filter(
            contact => contact.city === location || contact.state === location
        );
    
        this.displayContacts(results);
    }

  
    displayContacts(contacts) {
        if (contacts.length === 0) {
            console.log(`No contacts found.`);
        } else {
            contacts.forEach(contact => {
                console.log(
                    contact.getFullName(),
                    ',', contact.phoneNumber,
                    ',', contact.email,
                    ',', contact.city,
                    ',', contact.state,
                    ',', contact.zip
                );
            });
        }
    }

    displayAllBooks() {
        for (const [bookName, contacts] of Object.entries(this.addressBooks)) {
            console.log(`\n📖 Address Book: ${bookName}`);
            this.displayContacts(contacts);
        }
    }
    }
    
    const manager = new AddressBookManager();

    manager.createAddressBook("Family");
    manager.addContactToBook("Family", new Contact("John", "Doe", "123 Main St", "Los Angeles", "California", "900001", "9876543210", "john.doe@example.com"));
    manager.addContactToBook("Family", new Contact("Alice", "Johnson", "456 Elm St", "Seattle", "Washington", "981041", "8765432109", "alice.j@example.com"));
    manager.addContactToBook("Family", new Contact("Bob", "Smith", "789 Oak St", "Los Angeles", "California", "900002", "7654321098", "bob.smith@example.com"));
    
    console.log("\n🔍 Searching for contacts in 'Los Angeles':");
    manager.countByCityOrState("Family");
    
    console.log("\n🔍 Searching for contacts in 'Washington':");
    manager.searchByCityOrState("Family", "Washington");
    console.log("\n📋 Sorting contacts by name in 'Family' Address Book:");
manager.sortContactsByName("Family");