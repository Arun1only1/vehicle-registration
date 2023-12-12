import { Vehicle } from "./vehicle.model.js";
import { vehicleValidationSchema } from "./vehicle.validation.schema.js";
import { checkMongoIdValidity } from "../utils/mongo.id.validity.js";

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
  const isValidMongoId = checkMongoIdValidity(vehicleId);

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

// delete vehicle
export const deleteVehicle = async (req, res) => {
  // extract id from req.params
  const vehicleId = req.params.id;

  // check if the id is valid mongo id
  const isValidMongoId = checkMongoIdValidity(vehicleId);

  // if not valid mongoId, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid vehicle id." });
  }

  // check if vehicle exists

  const vehicle = await Vehicle.findById(vehicleId);

  // if not vehicle, throw error
  if (!vehicle) {
    return res.status(404).send({ message: "Vehicle does not exist." });
  }

  // delete vehicle
  //   await Vehicle.deleteOne({ _id: vehicleId });
  await Vehicle.findByIdAndDelete(vehicleId);

  // send appropriate response
  return res.status(200).send({ message: "Vehicle is removed successfully." });
};

// update vehicle
export const updateVehicle = async (req, res) => {
  // extract id from req.params
  const vehicleId = req.params.id;

  // check for mongo id validity
  const isValidMongoId = checkMongoIdValidity(vehicleId);

  // if not valid id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid vehicle id." });
  }

  // extract new values from req.body
  const newValues = req.body;

  // validate new values
  try {
    await vehicleValidationSchema.validate(newValues);
  } catch (error) {
    // if validation fails, throw error
    return res.status(400).send({ message: error.message });
  }

  // check if the vehicle with id exists
  const vehicle = await Vehicle.findById(vehicleId);

  // if not vehicle, throw error
  if (!vehicle) {
    return res.status(404).send({ message: "Vehicle does not exist." });
  }

  // update the vehicle
  await Vehicle.updateOne(
    { _id: vehicleId },
    {
      ...newValues,
    }
  );

  // send appropriate response
  return res.status(200).send({ message: "Vehicle is updated successfully." });
};
