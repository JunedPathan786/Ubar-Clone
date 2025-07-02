const { ExpressValidator } = require("express-validator");
const rideServices = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  console.log("📦 Ride request received");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideServices.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

    console.log(pickupCoordinates);

    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      500 // km
    );

    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user", "fullname");

    captainsInRadius.map((captain) => {

      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: error.messsage });
  }
};

module.exports.getFare = async (req, res) => {
  try {
    const { pickup, destination } = req.query;

    if (!pickup || !destination) {
      return res
        .status(400)
        .json({ message: "Pickup and destination are required" });
    }

    const fareDetails = await rideServices.getFare(pickup, destination);
    res.status(200).json(fareDetails);
  } catch (err) {
    console.error("🚨 Fare calculation failed:", err.message);
    res
      .status(500)
      .json({ message: "Something went wrong while calculating fare" });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideServices.confirmRide({
      rideId,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideServices.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}