'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [
      {
        content: 'content',
        heading: 'heading',
        abstract: 'abstract',
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'content',
        heading: 'heading',
        abstract: 'abstract',
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'content',
        heading: 'heading',
        abstract: 'abstract',
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'content',
        heading: 'heading',
        abstract: 'abstract',
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        content: 'content',
        heading: 'heading',
        abstract: 'abstract',
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('Blogs', users);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Blogs', null, {});
  },
};
