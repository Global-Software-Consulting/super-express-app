// var assert = require('assert');
const { User, Blog } = require('../src/models');
let newUser = null;
describe('User', function () {
  before(async function () {
    console.log('In drop Users');

    await User.sync({ force: true }); // drops table and re-creates it
  });
  describe('#signup', function () {
    it('signup test running successfully', async function () {
      newUser = await User.create({
        email: 'test1email@gmail.com',
        password: '123',
        username: 'testusername',
        name: 'test',
      });
      console.log({ newUser });
    });
  });

  describe('#login', function () {
    it('login test running successfully', async function () {
      const user = await User.findOne({
        where: { email: 'testemail@gmail.com', password: '123' },
      });
    });
  });

  describe('#allUsers', function () {
    it('all users running successfully', async function () {
      const user = await User.findAll({});
    });
  });
});

describe('Blog', function () {
  before(async function () {
    console.log('In drop Blogs');
    await Blog.sync({ force: true }); // drops table and re-creates it
  });
  describe('#addBlog', function () {
    it('add blog running successfully', async function () {
      const blog = await Blog.create({
        heading: 'Heading 1',
        content: 'blog data',
        userId: newUser.id,
      });
    });
  });
  describe('#findBlog', function () {
    it('find blog by Id running successfully', async function () {
      const blog = await Blog.findByPk(1);
    });
  });
});
