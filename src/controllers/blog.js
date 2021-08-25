const { Blog, User } = require('../models');
const apiResponse = require('../utils/apiResponse');
const apiFeatures = require('../utils/apiFeatures');

exports.add = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    const blog = await Blog.create(req.body);
    return apiResponse(res, 201, 'Blog published successfully', blog);
  } catch (error) {
    return apiResponse(res, 500, error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { id: req.params.id },
    });
    if (!blog) {
      return apiResponse(res, 404, 'No blog found');
    }
    if (req.user.role !== 'admin' && blog.userId !== req.userId) {
      return apiResponse(res, 400, 'You have no access to edit this blog');
    }
    const updatedBlog = await blog.update(req.body);
    return apiResponse(res, 200, 'Updated successfully', updatedBlog);
  } catch (error) {
    return apiResponse(res, 500, error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { id: req.params.id },
    });
    if (!blog) {
      return apiResponse(res, 404, 'No blog found with this id');
    }
    if (req.user.role !== 'admin' && req.user.id !== blog.userId) {
      return apiResponse(res, 400, 'You have not access to delete this blog');
    }
    await Blog.destroy({
      where: { id: req.params.id },
      force: true,
    });
    return apiResponse(res, 200, 'Deleted successfully');
  } catch (error) {
    return apiResponse(res, 500, error.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          as: 'creator',
        },
      ],
    });
    if (!blog) {
      return apiResponse(res, 404, 'No blog found with this id');
    }
    return apiResponse(res, 200, 'Data', blog);
  } catch (error) {
    return apiResponse(res, 500, error.message);
  }
};

exports.editorBlogs = async (req, res) => {
  try {
    if (!req.params.id) {
      return apiResponse(res, 400, 'creator id required');
    }
    const blogs = await Blog.findAll({
      where: { userId: req.params.id },
    });
    return apiResponse(res, 200, 'Data', blogs);
  } catch (error) {
    return apiResponse(res, 500, error.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const { query } = req;

    const features = new apiFeatures(Blog, query);

    features.sort().limitFields().paginate();

    let blogs = await features.query();

    let blogsCount = await Blog.count();

    //  return apiResponse(res, 200, true, `${admins.length} admins found`, {
    //    count: adminsCount,
    //    admins,
    //  });

    // const blogs = await Blog.findAll({
    //   include: [
    //     {
    //       model: User,
    //       as: 'creator',
    //     },
    //   ],
    // });
    return apiResponse(res, 200, `${blogs.length} blogs found`, {
      count: blogsCount,
      blogs,
    });
  } catch (error) {
    return apiResponse(res, 500, error.message);
  }
};
