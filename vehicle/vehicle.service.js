import mongoose from "mongoose";
import { Vehicle } from "./vehicle.model.js";
import { vehicleValidationSchema } from "./vehicle.validation.schema.js";

// add vehicle
export const addVehicle = async (req, res) => {
  //  extract new vehicle data  from req.body
  const newVehicle = req.body;

  // validate newVehicle
  try {
    await vehicleValidationSchema.validate(newVehicle);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  //   create vehicle
  await Vehicle.create(newVehicle);

  return res.status(200).send({ message: "Vehicle added successfully." });
};

//  vehicle details by id
export const getVehicleDetails = async (req, res) => {
  // extract id from req.params
  const vehicleId = req.params.id;

  // validate for mongoId
  const isValidMongoId = mongoose.Types.ObjectId.isValid(vehicleId);

  // if not valid mongoId, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid vehicle id." });
  }

  // find vehicle with id
  const vehicle = await Vehicle.findOne({ _id: vehicleId });

  // if not vehicle, throw error
  if (!vehicle) {
    return res.status(404).send({ message: "Vehicle does not exist." });
  }

  // send vehicle details
  return res.status(200).send(vehicle);
};
