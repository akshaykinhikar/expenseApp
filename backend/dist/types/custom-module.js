"use strict";
// import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { v4 as uuid } from "uuid";
// const s3 = new S3Client();
// export const uploadToS3 = async ({ file: any, userId: any }): any => {
//     try {
//         const key = `${userId}/${uuid()}`;
//         const command = {
//             Bucket: process.env.BUCKET,
//             Key: key,
//             Body: file.buffer,
//             ContentType: file.mimetype,
//         };
//         await s3.send(new PutObjectCommand(command));
//     } catch (error) {
//         console.log(error);
//         return { error }
//     }
// }
// const getImageKeysByUser = async (userId: any) => {
//     const command = new ListObjectsV2Command({
//         Bucket: process.env.BUCKET,
//         Prefix: userId,
//     });
//     const { Contents = [] } = await s3.send(command);
//     return Contents.map(image => image.Key);
// }
// export const getUserPreSignedUrls = async (userId: any) => {
//     try {
//         const imageKeys = await getImageKeysByUser(userId);
//         console.log(imageKeys);
//         const presignedUrls = await Promise.all(
//             imageKeys.map((key) => {
//                 let imgObj = { Bucket: process.env.BUCKET, Key: key };
//                 const command = new GetObjectCommand(imgObj);
//                 return getSignedUrl(s3, command, { expiresIn: 90 })
//             })
//         )
//         return { presignedUrls };
//     } catch (error) {
//         // console.log(error);
//         return { error }
//     }
// }
