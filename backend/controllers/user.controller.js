const user = require("../models/user.model");

const postUser = async (req, res, next) => {
  try {
    //Destructure the req.body object to get the required properties
    const {
      firstName,
      lastName,
      email,
      password,
      dobDate,
      dobMonth,
      dobYear,
      gender,
      phone,
    } = req.body;

    //Create the payload object
    const postUserPayload = {};
    postUserPayload.firstName = firstName;
    postUserPayload.lastName = lastName;
    postUserPayload.email = email;
    postUserPayload.password = password;
    postUserPayload.dobDate = dobDate;
    postUserPayload.dobMonth = dobMonth;
    postUserPayload.dobYear = dobYear;
    postUserPayload.gender = gender;
    postUserPayload.phone = phone;

    //Validate that no user with the req.body.email exists in the database
    const duplicateUser = await user.findOne({ email: postUserPayload.email });
    if (duplicateUser) {
      res.status(400).json({
        status: "failure",
        message:
          "A user already exists with the same email address. Please enter a different email address.",
      });
      return;
    }

    //Create new user(document) in the database
    const response = await user.create(postUserPayload);
    console.log(response);
    if (response) {
      res.status(201).json({
        status: "success",
        response: response,
        message: "User successfully created in the database.",
      });
    } else {
      throw new Error("Unable to create user in the database." + response);
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message:
        `Sorry! Could not create user due to the error: ` + error.message,
    });
  } finally {
    console.log("Exiting postUser function...");
  }
};

module.exports = { postUser };
