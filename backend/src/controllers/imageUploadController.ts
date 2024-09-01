import asyncHandler from "express-async-handler";
// import { getUserPreSignedUrls, uploadToS3 } from '../../../backend/s3.mjs';
// import { promises } from "dns";
const uploadImage = asyncHandler(async (req: any, res: any) => { console.log("TODO") })
// const uploadImage = asyncHandler(async (req: any, res: any) => {
//     const { file } = req;
//     const userId = req.headers["x-user-id"];

//     console.log(file);
//     console.log(userId);

//     if (!file || !userId) return res.status(400).json({ message: "Bad request" });

//     const result: Promise<{ file: any, userId: any } | { error: any, key: any } | Error> = uploadToS3({ file, userId });
//     // TODO:
//     // if ('error' in result) return res.status(500).json({ message: error['message'] })

//     res.send({ message: 'Success' });
// });
const getAllS3Images = asyncHandler(async (req: any, res: any) => { console.log("TODO") })
// const getAllS3Images = asyncHandler(async (req: any, res: any) => {
//     const userId = req.headers["x-user-id"];
//     if (!userId) return res.status(400).json({ message: "Bad request" });
//     console.log(userId)
//     const { error, presignedUrls } = await getUserPreSignedUrls(userId);
//     // TODO:
//     // if (error) return res.status(500).json({ message: error.message })

//     res.json(presignedUrls);

// });

export {
    uploadImage,
    getAllS3Images
}