import express from "express";
import {
  addVehicle,
  deleteVehicle,
  getVehicleDetails,
  updateVehicle,
  validateVehicleData,
} from "./vehicle.service.js";

const router = express.Router();

// add vehicle
router.post("/add", validateVehicleData, addVehicle);

// get vehicle
router.get("/details/:id", getVehicleDetails);

// delete vehicle
router.delete("/delete/:id", deleteVehicle);

// update  vehicle
// which vehicle is to be updated
// which values are to be updated
router.put("/update/:id", updateVehicle);

export default router;
