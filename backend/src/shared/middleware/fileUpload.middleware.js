import multer from 'multer';

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../config/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: 'spanstay-hotels',

    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

let upload = multer({ storage });

export default upload;
