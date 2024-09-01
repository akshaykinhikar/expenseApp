"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllS3Images = exports.uploadImage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// import { getUserPreSignedUrls, uploadToS3 } from '../../../backend/s3.mjs';
// import { promises } from "dns";
const uploadImage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { console.log("TODO"); }));
exports.uploadImage = uploadImage;
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
const getAllS3Images = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { console.log("TODO"); }));
exports.getAllS3Images = getAllS3Images;
