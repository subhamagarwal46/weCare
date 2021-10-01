const e = require("express");
const validator = require("../Utils/validators");
const { userModel, coachModel, bookingModel } = require("../Models/db_connect");

exports.addNewUserController = async (req, res) => {
  try {
    const trackUser = await userModel.findOne({ email: req.body.email });
    if (trackUser == null) {
      const maxIndexUser = await userModel.find().sort({ createdAt: -1 });
      currentMaxIndex =
        maxIndexUser.length == 0
          ? 1
          : Number(maxIndexUser[0].userId.split("-")[1]) + 1;
      newIndex =
        "U-" +
        "000".substring(0, 3 - ("" + currentMaxIndex).length) +
        currentMaxIndex;
      req.body["userId"] = newIndex;
      const newUser = await userModel.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          msg: `Successfully registered with user Id ${newUser.userId}`,
        },
      });
    } else {
      res.status(400).json({
        status: "fail",
        data: {
          msg: "User exists with this email Id",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.userLoginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ userId: req.body.userId });
    if (user != null) {
      if (user.password == req.body.password) {
        res.status(200).json({
          status: "success",
          data: {
            msg: true,
          },
        });
      } else {
        res.status(401).json({
          status: "unauthorized",
          data: {
            msg: false,
          },
        });
      }
    } else {
      res.status(500).json({
        status: "fail",
        data: {
          msg: `No user for the given user Id`,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.addNewCoachController = async (req, res) => {
  try {
    const coaches = await coachModel.findOne({ name: req.body.name });
    if (coaches == null) {
      const maxIndexCoaches = await coachModel.find().sort({ createdAt: -1 });
      const currentIndex =
        maxIndexCoaches.length == 0
          ? 1
          : Number(maxIndexCoaches[0].coachId.split("-")[1]) + 1;
      const newIndex =
        "C-" +
        "000".substring(0, 3 - ("" + currentIndex).length) +
        currentIndex;
      req.body["coachId"] = newIndex;
      const newCoach = await coachModel.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          msg: `Coach with Id : ${newCoach.coachId} has been added successfully`,
        },
      });
    } else {
      res.status(400).json({
        status: "fail",
        data: {
          msg: "Coach exists with this name",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.coachLoginController = async (req, res) => {
  try {
    const user = await coachModel.findOne({ coachId: req.body.coachId });
    if (user != null) {
      if (user.password == req.body.password) {
        res.status(200).json({
          status: "authorized",
          data: {
            msg: true,
          },
        });
      } else {
        res.status(401).json({
          status: "unauthorized",
          data: {
            msg: false,
          },
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        data: {
          msg: `Coach with coachId ${req.body.coachId} doesnot found`,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.getAllCoachesController = async (req, res) => {
  try {
    const coaches = await coachModel.find();
    res.status(200).json({
      status: "success",
      data: {
        result: coaches,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.getCoachByIdController = async (req, res) => {
  try {
    debugger;
    const coach = await coachModel.findOne({ coachId: req.params.coachId });
    if (coach != null) {
      res.status(200).json({
        status: "success",
        data: {
          result: coach,
        },
      });
    } else {
      res.status(400).json({
        status: "fail",
        data: {
          msg: `coach doesnot exists with this id`,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.getUserByIdController = async (req, res) => {
  try {
    const user = await userModel.findOne({ userId: req.params.userId });
    if (user != null) {
      res.status(200).json({
        status: "success",
        data: {
          result: user,
        },
      });
    } else {
      res.status(400).json({
        status: "fail",
        data: {
          msg: "User Id does not exist",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.addNewBookingController = async (req, res) => {
  try {
    debugger;
    const user = await userModel.findOne({ userId: req.params.userId });
    if (user != null) {
      const coach = await coachModel.findOne({ coachId: req.params.coachId });
      if (coach != null) {
        let today = new Date();
        let lastSevenDate = new Date();
        lastSevenDate.setDate(lastSevenDate.getDate() + 8);
        // lastSevenDate.setHours(0, 0, 0, 0);
        let appointmentDate = new Date(req.body.dateOfAppointment);
        // appointmentDate.setHours(0, 0, 0, 0);
        if (appointmentDate > today && appointmentDate <= lastSevenDate) {
          if (validator.slotValidator(req.body.slot)) {
            const bookingsOfCoach = await bookingModel.find({
              coachId: req.params.coachId,
              slot: req.body.slot,
              appointmentDate: appointmentDate,
            });
            const bookingOfUser = await bookingModel.find({
              userId: req.params.userId,
              slot: req.body.slot,
              appointmentDate: appointmentDate,
            });
            if (bookingsOfCoach.length == 0 && bookingOfUser.length == 0) {
              const allBookings = await bookingModel
                .find()
                .sort({ createdAt: -1 });
              const maxIndex =
                allBookings.length == 0
                  ? 1
                  : Number(allBookings[0].bookingId.split("-")[1]) + 1;
              const newBookingId =
                "B-" +
                "000".substring(0, 3 - ("" + maxIndex).length) +
                maxIndex;
              let obj = {
                bookingId: newBookingId,
                coachId: req.params.coachId,
                userId: req.params.userId,
                appointmentDate: appointmentDate,
                slot: req.body.slot,
              };
              const newBooking = await bookingModel.create(obj);
              res.status(201).json({
                status: "success",
                data: {
                  msg: true,
                },
              });
            } else {
              res.status(400).json({
                status: "fail",
                data: {
                  msg: "There is an appointment in this slot already with same Coach",
                },
              });
            }
          } else {
            res.status(400).json({
              status: "fail",
              data: {
                msg: "Slot should be a valid one",
              },
            });
          }
        } else {
          res.status(400).json({
            status: "fail",
            data: {
              msg: "Date should be any upcoming 7 days",
            },
          });
        }
      } else {
        res.status(400).json({
          status: "fail",
          data: {
            msg: "Coach Id does not exist",
          },
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        data: {
          msg: "User Id does not exist",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.updateBookingController = async (req, res) => {
  try {
    const booking = await bookingModel.findOne({
      bookingId: req.params.bookingId,
    });
    if (booking != null) {
      let appointmentDate = new Date(req.body.dateOfAppointment);
      let updatedBooking = await bookingModel.findOneAndUpdate(
        { bookingId: req.params.bookingId },
        { slot: req.body.slot, appointmentDate: appointmentDate },
        {
          new: true, //to return new doc back
          runValidators: true, //to run the validators which specified in the model
        }
      );
      console.log(updatedBooking);
      res.status(200).json({
        status: "success",
        data: {
          msg: true,
        },
      });
    } else {
      res.status(400).json({
        status: "fail",
        data: {
          msg: "Booking Id does not exist",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.deleteBookingController = async (req, res) => {
  try {
    const booking = await bookingModel.findOne({
      bookingId: req.params.bookingId,
    });
    if (booking != null) {
      const deletedBooking = await bookingModel.deleteOne({
        bookingId: req.params.bookingId,
      });
      if (deletedBooking.deletedCount == 1) {
        res.status(200).json({
          status: "success",
          data: {
            msg: "Booking is successfully cancelled",
          },
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        data: {
          msg: "Booking id is invalid",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.getBookingByCoachController = async (req, res) => {
  try {
    const coach = await coachModel.findOne({ coachId: req.params.coachId });
    if (coach != null) {
      const bookings = await bookingModel.find({ coachId: req.params.coachId });
      if (bookings.length < 1) {
        res.status(400).json({
          status: "success",
          data: {
            msg: "Could not find any booking details",
          },
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            result: bookings,
          },
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        data: {
          msg: "Invalid coach Id.",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.getBookingByUserController = async (req, res) => {
  try {
    const coach = await userModel.findOne({ coachId: req.params.userId });
    if (coach != null) {
      const bookings = await bookingModel.find({ userId: req.params.userId });
      if (bookings.length < 1) {
        res.status(400).json({
          status: "success",
          data: {
            msg: "Could not find any booking details",
          },
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            result: bookings,
          },
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        data: {
          msg: "Invalid user Id.",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: {
        msg: error.message,
      },
    });
  }
};
exports.defaultController = async (req, res) => {
  res.json({ msg: "No such path is present" });
};
