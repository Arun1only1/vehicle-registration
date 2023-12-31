import express from "express";
import { connectDB } from "./db.connect.js";
import vehicleRoutes from "./vehicle/vehicle.routes.js";

const app = express();
// make app understand json
app.use(express.json());

// connect db
connectDB();

// register routes
app.use("/vehicle", vehicleRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
