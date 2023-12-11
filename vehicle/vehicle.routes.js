import express from "express";
import { addVehicle, getVehicleDetails } from "./vehicle.service.js";

const router = express.Router();

// add vehicle
router.post("/vehicle/add", addVehicle);

// get vehicle
router.get("/vehicle/details/:id", getVehicleDetails);

export default router;
