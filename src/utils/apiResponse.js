module.exports = (res, status, message, data = null) => {
  res.status(status).json({
    // status: 'success',
    message: message,
    data: data,
  });
};
