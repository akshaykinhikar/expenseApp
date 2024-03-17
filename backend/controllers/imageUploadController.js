import asyncHandler from "express-async-handler";
import { getUserPreSignedUrls, uploadToS3 } from './../s3.mjs';

const uploadImage = asyncHandler(async (req, res) => {
    const { file } = req;
    const userId = req.headers["x-user-id"];

    console.log(file);
    console.log(userId);

    if (!file || !userId) return res.status(400).json({ message: "Bad request" });

    const { error, key } = uploadToS3({ file, userId });

    if (error) return res.status(500).json({ message: error.message })

    res.send({ message: 'Success' });
});

const getAllS3Images = asyncHandler(async (req, res) => {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(400).json({ message: "Bad request" });
    console.log(userId)
    const { error, presignedUrls } = await getUserPreSignedUrls(userId);
    if (error) return res.status(500).json({ message: error.message })

    res.json(presignedUrls);

});

export {
    uploadImage,
    getAllS3Images
}