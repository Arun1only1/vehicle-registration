import express from "express";
import {
  addVehicle,
  checkIfVehicleExists,
  deleteVehicle,
  getVehicleDetails,
  updateVehicle,
  validateVehicleData,
  validateVehicleId,
} from "./vehicle.service.js";

const router = express.Router();

// add vehicle
router.post("/add", validateVehicleData, addVehicle);

// get vehicle
router.get("/details/:id", validateVehicleId, getVehicleDetails);

// delete vehicle
router.delete(
  "/delete/:id",
  validateVehicleId,
  checkIfVehicleExists,
  deleteVehicle
);

// update  vehicle
// which vehicle is to be updated
// which values are to be updated

// middlewares
// 1.validate new values extracted from req.body
//2. validate vehicle id for mongo id validation
// 3.to check if vehicle with id exists or not
// 4. update vehicle data

router.put(
  "/update/:id",
  validateVehicleData,
  validateVehicleId,
  checkIfVehicleExists,
  updateVehicle
);

export default router;
