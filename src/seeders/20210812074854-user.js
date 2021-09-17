'use strict';
const bcrypt = require('bcrypt');
const faker = require('faker');
let password = '123';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    password = await bcrypt.hash(password, 12);
    let users = [
      {
        name: faker.name.findName(),
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: password,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.name.findName(),
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: password,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.name.findName(),
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: password,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.name.findName(),
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: password,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.name.findName(),
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: password,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.name.findName(),
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        email: 'admin@gmail.com',
        password: password,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.name.findName(),
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        email: 'editor@gmail.com',
        password: password,
        role: 'editor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('Users', users);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
