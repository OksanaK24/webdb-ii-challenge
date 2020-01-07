const express = require("express");
const db = require("../db");

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const cars = await db("cars").select()
    
    res.json(cars)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const ids = await db("cars").insert(req.body)
    const newCar = await db("cars").where({ id: ids[0] }).first()
    
    res.status(201).json(newCar)
  } catch (err) {
    next(err)
  }
})

module.exports = router