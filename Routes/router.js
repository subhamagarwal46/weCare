const express = require("express");
const controller = require("../Controller/weCare");
const router = express.Router();

router.post("/users", controller.addNewUserController);
router.post("/users/login", controller.userLoginController);
router.post("/coaches", controller.addNewCoachController);
router.post("/coaches/login", controller.coachLoginController);
router.get("/coaches/all", controller.getAllCoachesController);
router.get("/coaches/:coachId", controller.getCoachByIdController);
router.get("/users/:userId", controller.getUserByIdController);
router.post(
  "/users/booking/:userId/:coachId",
  controller.addNewBookingController
);
router.put("/booking/:bookingId", controller.updateBookingController);
router.delete("/booking/:bookingId", controller.deleteBookingController);
router.get("/coaches/booking/:coachId", controller.getBookingByCoachController);
router.get("/users/booking/:userId", controller.getBookingByUserController);
router.get("*", controller.defaultController);

module.exports = router;
