import { uploadFile } from "@config/upload";
import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { UploadUserAvatarController } from "@modules/users/useCases/uploadUserAvatar/UploadUserAvatarController";
import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router()

const upload = multer(uploadFile("./tmp/avatar"))

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const uploadUserAvatarController = new UploadUserAvatarController()

usersRoutes.post("/", createUserController.handle)

usersRoutes.post("/login", authenticateUserController.handle)

usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), uploadUserAvatarController.handle)

export { usersRoutes}