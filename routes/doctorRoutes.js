const express = require("express");

const doctorModel = require("../models/doctorModel");

const doctorRoute = express.Router();

doctorRoute.post("/", async (req, res) => {
  doctor = await doctorModel(req.body);

  await doctor.save();
  return res.status(200).send({
    message: "Appointments posted successfully.",
  });
});

doctorRoute.get("/", async (req, res) => {
  const { name, sortby, sortOrder, specialization } = req.query;
  const querry = {};
  if (name) {
    querry.name = { $regex: name, $options: "i" };
  }
  if (specialization) {
    querry.specialization = specialization;
  }
  try {
    // Determine the sorting order based on the "sortOrder" parameter
    const sortOption = {};
    if (sortOrder === "asc") {
      sortOption[sortby] = 1; // Ascending order
    } else if (sortOrder === "desc") {
      sortOption[sortby] = -1; // Descending order
    }

    // Perform the database query with sorting based on the selected order
    const doctors = await doctorModel.find(querry).sort(sortOption);

    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

doctorRoute.patch("/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    doctor = await doctorModel.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(200).send({
      message: "Doctor Updated Successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
});

doctorRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    doctor = await doctorModel.findByIdAndDelete({ _id: id });
    return res.status(200).send({
      message: "Doctor Deleted Successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
});

module.exports = doctorRoute;
