const multer = require('multer');
const { clearFolder, checkDirectory } = require('../utils/directories');
const fileFilter = (req, file, cb) => {
  if (req.type == 'image') {
    console.log('in image multer');
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images.'), false);
    }
  }

  if (req.type == 'csv' || req.type == 'xls' || req.type == 'xlsx') {
    if (
      file.mimetype == 'application/vnd.ms-excel' ||
      file.mimetype ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype == 'text/csv'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Not a excel File! Please upload only excel file.'), false);
    }
  }

  if (req.type == 'pdf') {
    console.log('in pdf multer');

    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype.includes('.document')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Not a pdf File! Please upload only PDF file.'), false);
    }
  }
};

const fileUpload = (uploadPath) => {
  console.log('------------------In upload');
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        checkDirectory(uploadPath, (err) => {
          if (err) new Error(err.message);
          else {
            clearFolder(uploadPath);
            // store file
            cb(null, '');
          }
        });
      },
      filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${uploadPath}${req.user.id}-${Date.now()}.${ext}`);
      },
    }),
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 4 },
  });
};

module.exports = fileUpload;
