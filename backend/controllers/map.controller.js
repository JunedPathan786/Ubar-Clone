const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;
  console.log("Received address:", address); // 👈 Check this

  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    console.log("Coordinates found:", coordinates); // 👈 Check this
    res.status(200).json(coordinates);
  } catch (error) {
    console.error("Error in map service:", error.message);
    res.status(404).json({ message: "Coordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    const DistanceTime = await mapService.getDistanceTime(origin, destination);

    res.status(200).json(DistanceTime);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    const suggestions = await mapService.getAutoCompleteSuggestions(input);

    res.status(200).json(suggestions);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

