// @ts-ignore
import express from 'express';
const imageUploadRoutes = express.Router();
// @ts-ignore
import multer, { memoryStorage } from 'multer';
import { getAllS3Images, uploadImage } from '../controllers/imageUploadController';

const storage = memoryStorage();


const upload = multer({ storage });



imageUploadRoutes.route('/')
    .post(upload.single('image'), uploadImage)
    .get(getAllS3Images)

export default imageUploadRoutes;