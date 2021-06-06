const faker = require('faker');

module.exports = {
    randomFirstName: () => faker.name.firstName(),
    randomLastName: () => faker.name.lastName(),
    randomEmail: () => faker.internet.email(),
    randomCity: () => faker.address.city(),
    randomState: () => faker.address.state(),
    randomZipCode: () => faker.address.zipCode(),
    randomCountry: () => faker.address.country(),
    randomWord: () => faker.random.word(),
};

