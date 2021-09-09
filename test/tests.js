const { User, Blog } = require('../src/models');
require('dotenv').config();
let blogCreator = null;
describe('User', function () {
  before(async () => {
    await User.sync({ force: true });
  });
  describe('#signup', () => {
    it('signup running successfully', async () => {
      blogCreator = await User.create({
        email: 'testemail@gmail.com',
        username: 'test_username',
        password: '123',
        name: 'test',
      });
    });
  });
  describe('#login', () => {
    it('login running successfully', async () => {
      const user = await User.findOne({
        where: {
          email: 'testemail@gmail.com',
          password: '123',
        },
      });
    });
  });
  describe('#all users', () => {
    it('all users running successfully', async () => {
      const users = await User.findAll({});
    });
  });
});

describe('Blog', function () {
  before(async () => {
    await Blog.sync({ force: true });
  });
  describe('#addBlog', () => {
    it('add blog running successfully', async () => {
      const blog = await Blog.create({
        content: 'blog content',
        heading: 'blog heading',
        userId: blogCreator.id,
      });
    });
  });
  describe('#getUserBlog', () => {
    it('getUserBlogs running successfully', async () => {
      const blogs = await Blog.findAll({
        where: {
          userId: blogCreator.id,
        },
      });
    });
  });

  describe('#all Blogs', () => {
    it('all blogs running successfully', async () => {
      const blogs = await Blog.findAll({});
    });
  });
});
