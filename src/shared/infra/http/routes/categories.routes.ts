import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCases/importCategories/ImportCategoriesController";
import { Router } from "express";
import multer from 'multer'
import { uploadFile } from "@config/upload";

const categoriesRoutes = Router()

const upload = multer(uploadFile("./tmp"))

const createCategoryController = new CreateCategoryController()
const importCategoriesController = new ImportCategoriesController()

categoriesRoutes.post("/", createCategoryController.handle)
categoriesRoutes.post("/import", upload.single("file"), importCategoriesController.handle)


export { categoriesRoutes }