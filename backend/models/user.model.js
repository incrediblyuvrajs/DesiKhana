const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

function validateFirstName(firstName) {
  return /^[a-zA-Z][a-zA-Z]+/.test(firstName);
}

function validateLastName(lastName) {
  return /^[a-zA-Z][a-zA-Z]+/.test(lastName);
}

function validateEmail(email) {
  return /^\w+([.-]?\w+)*@([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,
    required: [true, "Please enter your first name."],
    trim: true,
    minLength: [
      2,
      "First name is too short. It must aleast contain 2 characters.",
    ],
    maxLength: [
      20,
      "First name is too long. It must be less than 20 characters.",
    ],
    validate: [validateFirstName, "Please enter a valid first name."],
  },
  lastName: {
    type: String,
    lowercase: true,
    required: [true, "Please enter your last name."],
    trim: true,
    minLength: [
      2,
      "First name is too short. It must aleast contain 2 characters.",
    ],
    maxLength: [
      20,
      "First name is too long. It must be less than 20 characters.",
    ],
    validate: [validateLastName, "Please enter a valid last name."],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Please enter your last name."],
    trim: true,
    validate: [validateEmail, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Please enter your last name."],
    trim: true,
  },
  dobDate: {
    type: Number,
    required: [true, "Please enter the day of your birth."],
    min: [1, "Please enter a valid day of birth"],
    max: [31, "Please enter a valid day of birth"],
  },
  dobMonth: {
    type: Number,
    required: [true, "Please enter the month of your birth."],
    min: [1, "Please enter a valid month of birth"],
    max: [12, "Please enter a valid month of birth"],
  },
  dobYear: {
    type: Number,
    required: [true, "Please enter the year of your birth."],
    min: [1900, "Please enter a valid year of birth"],
    max: [
      new Date(Date.now()).getFullYear() - 12,
      "Please enter a valid year of birth",
    ],
  },
  gender: {
    type: String,
    required: [true, "Please enter your gender."],
    enum: ["male", "female", "others"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your phone number."],
    validate: [validatePhone, "Please enter a valid phone number."],
  },
});

//Encrypting the password before storing
userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const userDocument = this;
    bcryptjs.genSalt(10, function (saltError, salt) {
      if (saltError) {
        next(saltError);
      } else {
        bcryptjs.hash(
          userDocument.password,
          salt,
          function (hashError, hashPassword) {
            if (hashError) {
              next(hashError);
            } else {
              userDocument.password = hashPassword;
              next();
            }
          }
        );
      }
    });
  }
});
module.exports = mongoose.model("user", userSchema);
