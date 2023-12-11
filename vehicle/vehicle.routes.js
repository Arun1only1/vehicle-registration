import express from "express";

const router = express.Router();

// add vehicle
router.post("/vehicle/add", async (req, res) => {
  return res.status(200).send({ message: "Vehicle added successfully." });
});

export default router;
