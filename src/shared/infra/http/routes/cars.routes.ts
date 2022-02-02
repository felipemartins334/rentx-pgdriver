import { uploadFile } from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarController } from "@modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const uploadImage = multer(uploadFile("./tmp/images"));

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarController();
const uploadCarImageController = new UploadCarImageController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/", ensureAuthenticated, ensureAdmin, listCarController.handle);

carsRoutes.post(
  "/image/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadImage.single("image"),
  uploadCarImageController.handle
);

carsRoutes.post(
  "/specifications", 
  ensureAuthenticated, 
  ensureAdmin,
  createCarSpecificationController.handle
  )

export { carsRoutes };
