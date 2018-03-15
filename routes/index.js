const path = require("path");
const router = require("express").Router();
const venueRoutes = require("./venue");
const authRoutes = require("./auth-routes");

// API Routes
router.use("/venue", venueRoutes);
router.use("/auth", authRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
